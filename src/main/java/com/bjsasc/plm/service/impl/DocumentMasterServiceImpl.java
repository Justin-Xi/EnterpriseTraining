package com.bjsasc.plm.service.impl;

import cn.hutool.core.date.DateTime;
import cn.hutool.core.lang.UUID;
import cn.hutool.core.util.RandomUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.bjsasc.plm.domain.DocFileLink;
import com.bjsasc.plm.domain.DocumentMaster;
import com.bjsasc.plm.domain.DocumentVersion;
import com.bjsasc.plm.domain.Result;
import com.bjsasc.plm.mapper.DocFileLinkMapper;
import com.bjsasc.plm.mapper.DocumentMasterMapper;
import com.bjsasc.plm.mapper.DocumentVersionMapper;
import com.bjsasc.plm.service.DocumentMasterService;
import io.swagger.models.auth.In;
import org.apache.commons.net.ntp.TimeStamp;
import org.checkerframework.checker.units.qual.A;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;


@Service
public class DocumentMasterServiceImpl extends ServiceImpl<DocumentMasterMapper, DocumentMaster>  implements DocumentMasterService {
    @Autowired
    private DocumentMasterMapper documentMasterMapper;
    @Autowired
    private DocumentVersionMapper documentVersionMapper;
    @Autowired
    private DocFileLinkMapper docFileLinkMapper;
    @Override
    public List<DocumentMaster> getAll() {
        return documentMasterMapper.selectList(null);
    }
    @Override
    public List<DocumentMaster> getByName(String name) {
        LambdaQueryWrapper<DocumentMaster> wrapper = new LambdaQueryWrapper<>();
        wrapper.like(DocumentMaster::getName,name);
        List<DocumentMaster> masterList = documentMasterMapper.selectList(wrapper);
        return masterList;
    }

    @Override
    public Result addDocument(DocumentMaster documentMaster) {
        //默认的初始状态为检入
        documentMaster.setCheckStatus("检入");
        //设置当前创建时间
        Date date = new Date();
        java.sql.Date sqlDate = new java.sql.Date(date.getTime());
        documentMaster.setCreateTime(sqlDate);

        //生成一个code
        String docForm = documentMaster.getDocForm();
        String s = RandomUtil.randomNumbers(5);
        documentMaster.setCode(docForm+s);
        //TODO 这里要获取用户名，再设置，根据前端传参
        if (documentMaster.getCreateUser() == null) {
            documentMaster.setCreateUser("郑师帅");
        }
        int insert = documentMasterMapper.insert(documentMaster);
        if(insert == 1){
            return Result.ok();
        }
        return Result.fail("添加失败!");
    }

    @Override
    @Transactional
    public Result updateDocumentById(DocumentMaster documentMaster) {
        //判断master版本的检入检出状态，只有检出状态才可以修改
        String checkStatus = documentMaster.getCheckStatus();
        if(checkStatus.equals("检入")){
            return Result.fail("请先检出!");
        }
        //设置主文档的修改时间
        Date date = new Date();
        java.sql.Date sqlDate = new java.sql.Date(date.getTime());
        documentMaster.setEditTime(sqlDate);
        //设置修改人
        //TODO 这里要获取用户名，再设置，根据前端传参
        if (documentMaster.getEditUser() == null) {
            documentMaster.setEditUser("郑师帅");
        }
        //将主文件的版本号加0.1
        String versionNo = documentMaster.getVersionNo();
        String[] split = versionNo.split("\\.");
        split[1] =String.valueOf(Integer.valueOf(split[1])+1);
        String newVerNo = split[0]+"."+split[1];
        documentMaster.setVersionNo(newVerNo);
        //同步更新与文件之间的关系
        changeFileLink(documentMaster.getId(),versionNo,newVerNo);
        //更新文档
        int i = documentMasterMapper.updateById(documentMaster);
        if (i == 1){
            return Result.ok();
        }
        return Result.fail("修改失败!");
    }

    @Override
    public Result setStatusById(Integer id, String status) {
        DocumentMaster master = documentMasterMapper.selectById(id);
        if (master == null){
            return Result.fail("此id的文档不存在!");
        }
        master.setLifeStyle(status);
        int i = documentMasterMapper.updateById(master);
        if(i == 1){
            return Result.ok();
        }
        return Result.fail("设置状态失败!");
    }

    @Override
    public Result checkIn(Integer id) {
        DocumentMaster documentMaster = documentMasterMapper.selectById(id);
        String checkStatus = documentMaster.getCheckStatus();
        if (checkStatus == "检入"){
            return Result.fail("已经处于检入状态!");
        }
        //修改数据库表为检入状态
        DocumentMaster master = documentMasterMapper.selectById(id);
        master.setCheckStatus("检入");
        documentMasterMapper.updateById(master);
        return Result.ok("检入成功");
    }

    //TODO  未完成
    @Override
    public Result checkOut(Integer id) {
        DocumentMaster master = documentMasterMapper.selectById(id);
        String checkStatus = master.getCheckStatus();
        if (checkStatus == "检出"){
            return Result.fail("已经检出!");
        }
        //创建一个副本，和原来一模一样
        DocumentVersion version = new DocumentVersion();
        version.setMasterId(master.getId());
        version.setVersionNo(master.getVersionNo());
        version.setName(master.getName());
        version.setLifeStyle(master.getLifeStyle());
        version.setSecurityLevel(master.getSecurityLevel());
        version.setCode(master.getCode());
        version.setDocForm(master.getDocForm());
        //设置副本的创建时间和创建人
        Date date = new Date();
        java.sql.Date sqlDate = new java.sql.Date(date.getTime());
        version.setEditTime(sqlDate);
        //TODO 修改用户人需要传参
        version.setEditUser("郑师帅");
        //添加副本到version
        int insert = documentVersionMapper.insert(version);
        //修改主文档为检入状态
        master.setCheckStatus("检出");
        int i = documentMasterMapper.updateById(master);
        if(insert + i == 2){
            return Result.ok();
        }
        return Result.fail("检出失败!");

    }



    @Transactional
    public boolean changeFileLink(Integer id,String oldVersion,String newVersion){
        LambdaQueryWrapper<DocFileLink> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(DocFileLink::getDocId,id);
        wrapper.eq(DocFileLink::getVersionNo,oldVersion);
        List<DocFileLink> links = docFileLinkMapper.selectList(wrapper);
        for (DocFileLink link :
                links) {
            docFileLinkMapper.insert(new DocFileLink(null, id,link.getFileId(),newVersion));
        }
        return true;
    }
}
