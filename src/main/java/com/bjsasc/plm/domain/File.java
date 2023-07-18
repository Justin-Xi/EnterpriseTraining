package com.bjsasc.plm.domain;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;

/**
 * Package: com.bjsasc.plm.domain
 * Discription:
 *
 * @Author: JUSTIN
 * @Create:7/15/2023 - 10:31 AM
 * @Version:
 */
@TableName(value="file")
@Data
public class File implements Serializable {
    private static final long serialVersionUID = 1L;
    private String fileId;
    private String fileName;
    private Integer size;
    private Document document;
    private String versionNum;
    private boolean fileStatus;
    private String fileCreateTime;
    private String compilationUnitId;
    private String fileSize;
    private String historyRecordId;
    private Integer fileType;
    private String downLoadPath;
    private boolean mainFile;
    private ClassifiedLevel classifiedLevel;
    private State state;
    private String major;
    private String fileLocation;

    public String getFileId() {
        return fileId;
    }

    public void setFileId(String fileId) {
        this.fileId = fileId;
    }
    public String getFileName() {
        return fileName;
    }
    public Document getDocument() {
        return document;
    }

    public void setDocument(Document document) {
        this.document = document;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public Integer getSize() {
        return size;
    }

    public void setSize(Integer size) {
        this.size = size;
    }

    public String getVersionNum() {
        return versionNum;
    }

    public void setVersionNum(String versionNum) {
        this.versionNum = versionNum;
    }

    public boolean isFileStatus() {
        return fileStatus;
    }

    public void setFileStatus(boolean fileStatus) {
        this.fileStatus = fileStatus;
    }

    public String getFileCreateTime() {
        return fileCreateTime;
    }

    public void setFileCreateTime(String fileCreateTime) {
        this.fileCreateTime = fileCreateTime;
    }

    public String getCompilationUnitId() {
        return compilationUnitId;
    }

    public void setCompilationUnitId(String compilationUnitId) {
        this.compilationUnitId = compilationUnitId;
    }

    public String getFileSize() {
        return fileSize;
    }

    public void setFileSize(String fileSize) {
        this.fileSize = fileSize;
    }

    public String getHistoryRecordId() {
        return historyRecordId;
    }

    public void setHistoryRecordId(String historyRecordId) {
        this.historyRecordId = historyRecordId;
    }

    public Integer getFileType() {
        return fileType;
    }

    public void setFileType(Integer fileType) {
        this.fileType = fileType;
    }

    public String getDownLoadPath() {
        return downLoadPath;
    }

    public void setDownLoadPath(String downLoadPath) {
        this.downLoadPath = downLoadPath;
    }

    public boolean isMainFile() {
        return mainFile;
    }

    public void setMainFile(boolean mainFile) {
        this.mainFile = mainFile;
    }

    public ClassifiedLevel getClassifiedLevel() {
        return classifiedLevel;
    }

    public void setClassifiedLevel(ClassifiedLevel classifiedLevel) {
        this.classifiedLevel = classifiedLevel;
    }

    public State getState() {
        return state;
    }

    public void setState(State state) {
        this.state = state;
    }

    public String getMajor() {
        return major;
    }

    public void setMajor(String major) {
        this.major = major;
    }

    public String getFileLocation() {
        return fileLocation;
    }

    public void setFileLocation(String fileLocation) {
        this.fileLocation = fileLocation;
    }

    public String getLifeCycleTemplateId() {
        return lifeCycleTemplateId;
    }

    public void setLifeCycleTemplateId(String lifeCycleTemplateId) {
        this.lifeCycleTemplateId = lifeCycleTemplateId;
    }

    private String lifeCycleTemplateId;
    enum ClassifiedLevel{

    }
    enum State{

    }
}
