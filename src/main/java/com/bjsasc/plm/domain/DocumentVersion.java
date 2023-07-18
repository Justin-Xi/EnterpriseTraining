package com.bjsasc.plm.domain;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@TableName("document_version")
@EqualsAndHashCode(callSuper = true)
public class DocumentVersion extends SxBaseEntity {


    private String versionId;
    private int pagesize;
    private String iterationNo;
    private String versionNo;
    private int latest;

}
