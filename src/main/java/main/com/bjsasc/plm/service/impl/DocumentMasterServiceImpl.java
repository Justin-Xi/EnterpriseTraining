package main.com.bjsasc.plm.service.impl;

import cn.hutool.core.util.RandomUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import main.com.bjsasc.plm.domain.DocumentMaster;
import main.com.bjsasc.plm.domain.DocumentVersion;
import main.com.bjsasc.plm.domain.FileLink;
import main.com.bjsasc.plm.domain.Result;
import main.com.bjsasc.plm.mapper.DocumentMasterMapper;
import main.com.bjsasc.plm.mapper.DocumentVersionMapper;
import main.com.bjsasc.plm.mapper.FileLinkMapper;
import main.com.bjsasc.plm.service.DocumentMasterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

/**
* @author 张赵东
* @description 针对表【documentmaster】的数据库操作Service实现
* @createDate 2023-07-17 17:16:42
*/
@Service
public class DocumentMasterServiceImpl extends ServiceImpl<DocumentMasterMapper, DocumentMaster>
    implements DocumentMasterService{
    @Autowired
    private DocumentMasterMapper documentMasterMapper;
    @Autowired
    private DocumentVersionMapper documentVersionMapper;

    @Autowired
    private FileLinkMapper fileLinkMapper;
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
        documentMaster.setCheckstatus("检入");
        //设置当前创建时间
        Date date = new Date();
        java.sql.Date sqlDate = new java.sql.Date(date.getTime());
        documentMaster.setCreatetime(sqlDate);

        //生成一个code
        String docForm = documentMaster.getDocform();
        String s = RandomUtil.randomNumbers(5);
        documentMaster.setCode(Integer.valueOf(docForm+s));
        //TODO 这里要获取用户名，再设置，根据前端传参
        if (documentMaster.getCreateuser() == null) {
            documentMaster.setCreateuser("张赵东");
        }
        int insert = documentMasterMapper.insert(documentMaster);
        if(insert == 1){
            return Result.ok();
        }
        else
            return Result.fail("添加失败!");
    }

    @Override
    @Transactional
    public Result updateDocumentById(DocumentMaster documentMaster) {
        //判断master版本的检入检出状态，只有检出状态才可以修改
        String checkStatus = documentMaster.getCheckstatus();
        if(checkStatus.equals("检入")){
            return Result.fail("请先检出!");
        }
        //设置主文档的修改时间
        Date date = new Date();
        java.sql.Date sqlDate = new java.sql.Date(date.getTime());
        documentMaster.setModifytime(sqlDate);
        //设置修改人
        //TODO 这里要获取用户名，再设置，根据前端传参
        if (documentMaster.getModifyuser() == null) {
            documentMaster.setModifyuser("张赵东");
        }
        //将主文件的版本号加0.1
        String versionNo = documentMaster.getVersionno();
        String[] split = versionNo.split("\\.");
        split[1] =String.valueOf(Integer.parseInt(split[1])+1);
        String newVerNo = split[0]+"."+split[1];
        documentMaster.setVersionno(newVerNo);
        //同步更新与文件之间的关系
        changeFileLink(documentMaster.getId(), versionNo,newVerNo);
        //更新文档
        int i = documentMasterMapper.updateById(documentMaster);
        if (i == 1){
            return Result.ok();
        }
        return Result.fail("修改失败!");
    }

    @Override
    public Result setStatusById(String id, String status) {
        DocumentMaster master = documentMasterMapper.selectById(id);
        if (master == null){
            return Result.fail("此id的文档不存在!");
        }
        master.setLifestyle(status);
        int i = documentMasterMapper.updateById(master);
        if(i == 1){
            return Result.ok();
        }
        return Result.fail("设置状态失败!");
    }

    @Override
    public Result checkIn(String id) {
        DocumentMaster documentMaster = documentMasterMapper.selectById(id);
        if (documentMaster.getCheckstatus().equals("检入"))
            return Result.fail("文档已检入");
        documentMaster.setCheckstatus("检入");
        int i = documentMasterMapper.updateById(documentMaster);
        if (i == 1)
            return Result.ok();
        return Result.fail("检入失败");
    }

    @Override
    public Result checkOut(String id) {
        DocumentMaster master = documentMasterMapper.selectById(id);
        String checkStatus = master.getCheckstatus();
        if (checkStatus == "检出"){
            return Result.fail("已经检出!");
        }
        //创建一个副本，和原来一模一样
        DocumentVersion version = new DocumentVersion();
        version.setMasterid(master.getId());
        version.setVersionno(master.getVersionno());
        version.setName(master.getName());
        version.setLifestyle(master.getLifestyle());
        version.setSecuritylevel(master.getSecuritylevel());
        version.setCode(master.getCode());
        version.setDocform(master.getDocform());
        //设置副本的创建时间和创建人
        Date date = new Date();
        java.sql.Date sqlDate = new java.sql.Date(date.getTime());
        version.setModifytime(sqlDate);
        //TODO 修改用户人需要传参
        version.setModifyuser("张赵东");
        //添加副本到version
        int insert = documentVersionMapper.insert(version);
        //修改主文档为检入状态
        master.setCheckstatus("检出");
        int i = documentMasterMapper.updateById(master);
        if(insert + i == 2){
            return Result.ok();
        }
        return Result.fail("检出失败!");
    }

    @Override
    @Transactional
    public Result mainVersionRise(String docId) {
        //先获取主版本
        DocumentMaster master = documentMasterMapper.selectById(docId);
        //修改主版本的版本号
        String versionNo = master.getVersionno();
        String[] split = versionNo.split("\\.");
        split[0] =String.valueOf(Integer.valueOf(split[0])+1);
        String newVerNo = split[0]+"."+split[1];
        master.setVersionno(newVerNo);
        //修改主版本的修改人和修改时间
        Date date = new Date();
        java.sql.Date sqlDate = new java.sql.Date(date.getTime());
        master.setModifytime(sqlDate);
        //生成一个子文件，版本号为修改之前的版本号
        DocumentVersion version = new DocumentVersion();
        //TODO 这里要获取用户名，再设置，根据前端传参
        if (master.getModifyuser() == null) {
            master.setModifyuser("张赵东");
            version.setModifyuser("张赵东");
        }
        version.setMasterid(master.getId());
        version.setVersionno(versionNo);
        version.setModifytime(sqlDate);
        //将主版本和字版本添加到数据库
        documentMasterMapper.updateById(master);
        documentVersionMapper.insert(version);
        return Result.ok();
    }

    @Override
    @Transactional
    public boolean changeFileLink(String id, String oldVersion, String newVersion){
        LambdaQueryWrapper<FileLink> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(FileLink::getDocid,id);
        wrapper.eq(FileLink::getVersionno,oldVersion);
        List<FileLink> links = fileLinkMapper.selectList(wrapper);
        for (FileLink link :
                links) {
            fileLinkMapper.insert(new FileLink(null, id, link.getFileid(),newVersion));
        }
        return true;
    }
}




