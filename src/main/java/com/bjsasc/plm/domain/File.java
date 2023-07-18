package com.bjsasc.plm.domain;

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
@TableName("file")
@NoArgsConstructor
@AllArgsConstructor
public class File implements Serializable {
    private static final long serialVersionUID = 1L;
    @TableId(type = IdType.AUTO)
    private Integer id;
    private String name;
    private String size;
    private String versionNo;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:SS")
    private Date createTime;
    private String editUser;
    private String form;
    private String notes;
    private String url;

    public File(String url,Integer id, String name, String size, String versionNo, Date createTime, String form, String notes) {
        this.id = id;
        this.name = name;
        this.size = size;
        this.versionNo = versionNo;
        this.createTime = createTime;
        this.form = form;
        this.notes = notes;
        this.url = url;
    }
}
