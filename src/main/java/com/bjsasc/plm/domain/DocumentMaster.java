package com.bjsasc.plm.domain;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Package: com.bjsasc.plm.domain
 * Discription:
 *
 * @Author: JUSTIN
 * @Create:7/18/2023 - 8:50 AM
 * @Version:
 */
@Data
@TableName("document_master")
@EqualsAndHashCode(callSuper = true)
public class DocumentMaster extends SxBaseEntity{
    private String code;
    private String name;
    private String note;

    @TableField(exist = false)
    private DocumentVersion version;
}
