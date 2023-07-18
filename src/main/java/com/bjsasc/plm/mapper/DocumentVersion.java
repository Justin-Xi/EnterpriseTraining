package com.bjsasc.plm.mapper;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;

@Data
@TableName("document_version")
@NoArgsConstructor
@AllArgsConstructor
public class DocumentVersion implements Serializable {
    private static final long serialVersionUID = 1L;
    @TableId(type = IdType.AUTO)
    private Integer id;
    private Integer masterId;
    private String versionNo;
    private String notes;
    private String editUser;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:SS")
    private Date editTime;
    private String name;
    private String lifeStyle;
    private String securityLevel;
    private String code;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:SS")
    private String docForm;
    private String createUser;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:SS")
    private Date createTime;
}
