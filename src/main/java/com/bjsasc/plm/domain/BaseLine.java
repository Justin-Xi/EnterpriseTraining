package com.bjsasc.plm.domain;

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
@TableName("baseline")
@NoArgsConstructor
@AllArgsConstructor
public class BaseLine implements Serializable {
    private static final long serialVersionUID = 1L;
    @TableId(type = IdType.AUTO)
    private Integer id;
    private String name;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:SS")
    private Date createTime;
    private String createUser;
}
