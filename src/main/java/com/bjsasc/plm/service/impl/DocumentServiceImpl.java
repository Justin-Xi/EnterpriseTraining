package com.bjsasc.plm.service.impl;

import com.alibaba.nacos.api.utils.StringUtils;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.bjsasc.adp.event.common.util.UUIDUtil;
import com.bjsasc.asp.dev.common.utils.IdUtils;
import com.bjsasc.asp.dev.common.utils.UserInfoUtil;
import com.bjsasc.asp.dev.framework.mvc.domain.AjaxResult;
import com.bjsasc.asp.dev.system.admin.domain.AspContextUser;
import com.bjsasc.plm.domain.Document;
import com.bjsasc.plm.domain.DocumentMaster;
import com.bjsasc.plm.domain.DocumentVersion;
import com.bjsasc.plm.domain.Student;
import com.bjsasc.plm.mapper.DocumentMapper;
import com.bjsasc.plm.service.DocumentMasterService;
import com.bjsasc.plm.service.DocumentService;
import com.bjsasc.plm.service.DocumentVersionService;
import org.apache.commons.beanutils.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * Package: com.bjsasc.plm.service.impl
 * Discription:
 *
 * @Author: JUSTIN
 * @Create:7/15/2023 - 3:02 PM
 * @Version:
 */
@Service
public class DocumentServiceImpl extends ServiceImpl<DocumentMapper,Document> implements DocumentService {
    @Autowired
    private DocumentMapper documentMapper;
    private DocumentVersionService documentVersionService;
    private DocumentMasterService documentMasterService;
    @Override
    public List<Document> list(Document document) {
        return documentMapper.selectList(document);
    }
    @Override
    public Document selectById(String documentId){
        return documentMapper.selectById(documentId);
    }
    @Override
    public Document add(Document document) {
        if(StringUtils.isEmpty(document.getDocumentId())) {
            document.setDocumentId(IdUtils.simpleUUID());
            document.setDocumentId(UUIDUtil.getUUID());
        }
        documentMapper.insert(document);
        return document;
    }

    @Override
    public Document update(Document document) {
        documentMapper.update(document);
        return document;
    }

    @Override
    public void delete(String innerId) {
        documentMapper.deleteById(innerId);
    }
    @Override
    public List<DocumentVersion> history(Document document){
        return documentMapper.history(document);
    }

    @Override
    public AjaxResult setStatusById(String id, String status) {
        return null;
    }

    @Override
    public DocumentMaster checkOut(String versionId){
        try {
            AspContextUser user= UserInfoUtil.getUserInfo();

            DocumentVersion version=documentVersionService.getById(versionId);

            DocumentMaster master=documentMasterService.getById(version.getMasterId());
            if(master.getStatus()!=1){
                throw new Exception("文档【"+master.getName()+"】当前不是检入状态，不能执行检出操作！");
            }

            version.setLatest(0);
            documentVersionService.updateById(version);

            DocumentVersion newVersion= (DocumentVersion) BeanUtils.cloneBean(version);
            newVersion.setId(null);
            newVersion.setVersionNo(Integer.parseInt(version.getVersionNo())+1+"");
            newVersion.setLatest(1);
            newVersion.setCreateTime(new Date());
            newVersion.setCreateUser(user.getUserID());
            newVersion.setUpdateTime(new Date());
            newVersion.setUpdateUser(user.getUserID());
            newVersion.setStatus(2);  // 1=检入版本  2=工作副本
            documentVersionService.save(newVersion);


            master.setUpdateTime(new Date());
            master.setUpdateUser(user.getUserID());
            master.setStatus(2);  //1=检入状态  2=检出状态
            documentMasterService.updateById(master);

            master.setVersion(newVersion);
            return master;
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public DocumentMaster checkIn(String versionId){
        DocumentVersion version=documentVersionService.getById(versionId);

        DocumentMaster master=documentMasterService.getById(version.getMasterId());
        if(master.getStatus()!=2){
            throw new RuntimeException("文档【"+master.getName()+"】当前不是检出状态，不能执行检入操作！");
        }

        if(version.getStatus()!=2){
            throw new RuntimeException("文档【"+master.getName()+"】版本不是工作副本，不能执行检入操作！");
        }

        master.setStatus(1);  //1=检入状态  2=检出状态
        documentMasterService.updateById(master);

        version.setStatus(1);  // 1=检入版本  2=工作副本
        documentVersionService.updateById(version);

        master.setVersion(version);
        return master;
    }

    public void createDocument(Map<String,Object> info){

        AspContextUser user= UserInfoUtil.getUserInfo();

        DocumentMaster master=new DocumentMaster();
        master.setName(info.get("name")+"");
        master.setCode(info.get("code")+"");
        master.setNote(info.get("note")+"");
        master.setCreateTime(new Date());
        master.setCreateUser(user.getUserID());
        master.setUpdateTime(new Date());
        master.setUpdateUser(user.getUserID());
        master.setStatus(1);  //0=检入状态  2=检出状态

        DocumentVersion version =new DocumentVersion();
        version.setIterationNo("A");
        version.setVersionNo("1");
        version.setLatest(1);
        version.setCreateTime(new Date());
        version.setCreateUser(user.getUserID());
        version.setUpdateTime(new Date());
        version.setUpdateUser(user.getUserID());
        version.setStatus(1);  // 1=检入版本  2=工作副本

        documentMasterService.save(master);
        version.setMasterId(master.getId());
        documentVersionService.save(version);

    }

    @Override
    public List<DocumentMaster> getDocumentList(Map<String, Object> info) {

        return documentMasterService.getDocumentListWithVersion();
    }

}
