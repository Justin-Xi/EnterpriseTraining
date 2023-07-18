package com.bjsasc.plm.domain;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@TableName("file_version")
@EqualsAndHashCode(callSuper = true)
public class FileVersion extends SxBaseEntity {


    private String versionId;
    private int pagesize;
}
