package com.bjsasc.plm.domain;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.File;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * Package: com.bjsasc.plm.domain
 * Discription:
 *
 * @Author: JUSTIN
 * @Create:7/15/2023 - 10:30 AM
 * @Version:
 */
@TableName(value="document")
@Data
public class Document implements Serializable {
    private static final long serialVersionUID = 1L;
    private String documentId;
    private String documentName;
    private Integer size;
    private List<DocumentVersion> documentVersions;
    private boolean documentStatus;//true: check out, false: check in;
    private String documentCreateTime;
    private String compilationUnitId;
    private String documentSize;
    private String historyRecordId;
    private String downLoadPath;
    private String context;
    private DocumentTemplate documentTemplate;
    private String fileLocation;
    private String note;
    private List<File> files=new ArrayList<>();

    public List<File> getFiles() {
        return files;
    }

    public void setFiles(List<File> files) {
        this.files = files;
    }

    public String getDocumentId() {
        return documentId;
    }

    public void setDocumentId(String documentId) {
        this.documentId = documentId;
    }

    public String getDocumentName() {
        return documentName;
    }

    public void setDocumentName(String documentName) {
        this.documentName = documentName;
    }

    public Integer getSize() {
        return size;
    }

    public void setSize(Integer size) {
        this.size = size;
    }
    public List<DocumentVersion> getDocumentVersions() {
        return documentVersions;
    }
    public void setDocumentVersions(List<DocumentVersion> documentVersions) {
        this.documentVersions = documentVersions;
    }
    public boolean isDocumentStatus() {
        return documentStatus;
    }

    public void setDocumentStatus(boolean documentStatus) {
        this.documentStatus = documentStatus;
    }

    public String getDocumentCreateTime() {
        return documentCreateTime;
    }

    public void setDocumentCreateTime(String documentCreateTime) {
        this.documentCreateTime = documentCreateTime;
    }

    public String getCompilationUnitId() {
        return compilationUnitId;
    }

    public void setCompilationUnitId(String compilationUnitId) {
        this.compilationUnitId = compilationUnitId;
    }

    public String getDocumentSize() {
        return documentSize;
    }

    public void setDocumentSize(String documentSize) {
        this.documentSize = documentSize;
    }

    public String getHistoryRecordId() {
        return historyRecordId;
    }

    public void setHistoryRecordId(String historyRecordId) {
        this.historyRecordId = historyRecordId;
    }

    public String getDownLoadPath() {
        return downLoadPath;
    }

    public void setDownLoadPath(String downLoadPath) {
        this.downLoadPath = downLoadPath;
    }

    public String getContext() {
        return context;
    }

    public void setContext(String context) {
        this.context = context;
    }

    public DocumentTemplate getDocumentTemplate() {
        return documentTemplate;
    }

    public void setDocumentTemplate(DocumentTemplate documentTemplate) {
        this.documentTemplate = documentTemplate;
    }

    public String getFileLocation() {
        return fileLocation;
    }

    public void setFileLocation(String fileLocation) {
        this.fileLocation = fileLocation;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getMainFileId() {
        return mainFileId;
    }

    public void setMainFileId(String mainFileId) {
        this.mainFileId = mainFileId;
    }

    private String mainFileId;
    public static class DocumentTemplate{

    }
}
