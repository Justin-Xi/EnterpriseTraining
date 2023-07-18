package com.bjsasc.plm.service.impl;

import cn.hutool.core.date.DateTime;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.bjsasc.plm.domain.DocFileLink;
import com.bjsasc.plm.domain.DocumentMaster;
import com.bjsasc.plm.domain.File;
import com.bjsasc.plm.domain.Result;
import com.bjsasc.plm.mapper.DocFileLinkMapper;
import com.bjsasc.plm.mapper.FileMapper;
import com.bjsasc.plm.service.DocumentMasterService;
import com.bjsasc.plm.service.FileService;
import org.apache.commons.net.ntp.TimeStamp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;
import java.util.List;

@Service
public class FileServiceImpl extends ServiceImpl<FileMapper, File> implements FileService {

    @Autowired
    private FileMapper fileMapper;
    @Autowired
    private DocFileLinkMapper docFileLinkMapper;
    @Autowired
    private DocumentMasterService documentMasterService;
    @Override
    public Result uploadFile(MultipartFile file, Integer docId) {
        if(file.isEmpty()){
            return Result.fail("文件为空!");
        }
        //存储文件夹路径
        String dirPath = "D:/File/"+docId+"/";
        //获取文件名称
        String fileName = file.getOriginalFilename();
        java.io.File dir = new java.io.File(dirPath,fileName);
        //如果存储文件夹不存在，那么创建新的文件夹
        if(!dir.exists()){
            dir.mkdirs();
        }
        try {
            // 上传的文件被保存了
            file.transferTo(dir);
        } catch (IOException e) {
            e.printStackTrace();
            return Result.fail("上传失败!");
        }
        //添加文件对象
        File file1 = new File();
        Date date = new Date();
        java.sql.Date sqlDate = new java.sql.Date(date.getTime());
        file1.setCreateTime(sqlDate);
        file1.setForm(file.getContentType());
        file1.setName(fileName);
        file1.setSize(String.valueOf(file.getSize()));
        file1.setUrl(dirPath+fileName);
        int insert = this.getBaseMapper().insert(file1);
        if(insert != 1){
            return Result.fail("添加文件失败!");
        }
        //添加文件和文档之间的关系
        DocFileLink link = new DocFileLink();
        //获取刚才添加文档的id
        LambdaQueryWrapper<File> wrapper = new LambdaQueryWrapper<>();
        //通过名称获取刚才添加的id，因为文件名称是不允许重复的
        wrapper.eq(File::getName,fileName);
        File selectOne = this.getBaseMapper().selectOne(wrapper);
        Integer id = selectOne.getId();
        //设置文档和文件之间的关系
        link.setFileId(id);
        link.setDocId(docId);
        link.setVersionNo(documentMasterService.getBaseMapper().selectById(docId).getVersionNo());
        return Result.ok();
    }

    @Override
    @Transactional
    public Result deleteFile(Integer fileId, Integer docId) {
        DocumentMaster master = documentMasterService.getBaseMapper().selectById(docId);
        String checkStatus = master.getCheckStatus();
        if(checkStatus.equals("检入")){
            return Result.fail("请先检出!");
        }
        //将此版本与file的关系关系删除，即此版本不再有此文件
        LambdaQueryWrapper<DocFileLink> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(DocFileLink::getDocId,docId);
        wrapper.eq(DocFileLink::getFileId,fileId);
        wrapper.eq(DocFileLink::getVersionNo,master.getVersionNo());
        docFileLinkMapper.delete(wrapper);
        //修改主版本的版本号
        String versionNo = master.getVersionNo();
        String[] split = versionNo.split("\\.");
        split[0] =String.valueOf(Integer.valueOf(split[0])+1);
        String newVerNo = split[0]+"."+split[1];
        master.setVersionNo(newVerNo);
        //修改主版本的修改人和修改时间
        Date date = new Date();
        java.sql.Date sqlDate = new java.sql.Date(date.getTime());
        master.setEditTime(sqlDate);
        //主版本
        documentMasterService.updateById(master);
        return Result.ok();
    }

    @Override
    @Transactional
    public Result addFile(MultipartFile file, Integer docId) {
        DocumentMaster master = documentMasterService.getBaseMapper().selectById(docId);
        String checkStatus = master.getCheckStatus();
        if(checkStatus.equals("检入")){
            return Result.fail("请先检出!");
        }
        this.uploadFile(file,docId);
        return Result.ok();
    }

    @Override
    public List<File> selectByDocId(Integer docId,String version) {
        return fileMapper.selectByDocId(docId,version);
    }
}
