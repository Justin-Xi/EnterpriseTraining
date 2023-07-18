package com.bjsasc.plm.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.bjsasc.asp.dev.framework.mvc.domain.AjaxResult;
import com.bjsasc.plm.domain.Document;
import com.bjsasc.plm.domain.DocumentMaster;
import com.bjsasc.plm.domain.DocumentVersion;
import com.bjsasc.plm.domain.File;

import java.util.List;
import java.util.Map;

/**
 * Package: com.bjsasc.plm.service
 * Discription:
 *
 * @Author: JUSTIN
 * @Create:7/15/2023 - 2:59 PM
 * @Version:
 */
public interface DocumentService extends IService<Document> {
        public List<Document> list(Document document);

        public Document selectById(String documentId);

        public Document add(Document document);

        public Document update(Document document);

        public void delete(String documentId);
        public List<DocumentVersion> history(Document document);
        public AjaxResult setStatusById(String id,String status);
        public DocumentMaster checkIn(String versionId);
        public void createDocument(Map<String,Object> info);
        public List<DocumentMaster> getDocumentList(Map<String,Object> info);

        public DocumentMaster checkOut(String versionId);
}
