package com.bjsasc.plm.domain;

import com.baomidou.mybatisplus.annotation.EnumValue;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.commons.net.ntp.TimeStamp;

import java.io.Serializable;
import java.util.Date;

@Data
@TableName("document_master")
@NoArgsConstructor
@AllArgsConstructor
public class DocumentMaster implements Serializable {
    private static final long serialVersionUID = 1L;
    @TableId(type = IdType.AUTO)
    private Integer id;
    private String name;
    private String lifeStyle;
    private String securityLevel;
    private String versionNo;
    private String checkStatus;
    private String code;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:SS")
    private Date createTime;
    private String createUser;
    private String docForm;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:SS")
    private Date editTime;
    private String editUser;

    public DocumentMaster(Integer id, String name, String lifeStyle, String securityLevel, String versionNo, String checkStatus, String code, Date createTime, String createUser, String docForm) {
        this.id = id;
        this.name = name;
        this.lifeStyle = lifeStyle;
        this.securityLevel = securityLevel;
        this.versionNo = versionNo;
        this.checkStatus = checkStatus;
        this.code = code;
        this.createTime = createTime;
        this.createUser = createUser;
        this.docForm = docForm;
    }
}
