package com.bjsasc.plm.domain;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@TableName("sub_doc_link")
@NoArgsConstructor
@AllArgsConstructor
public class SubDocLink implements Serializable {
    private static final long serialVersionUID = 1L;
    @TableId(type = IdType.AUTO)
    private Integer id;
    private Integer docId;
    private Integer submissionformId;

    public SubDocLink(Integer docId, Integer submissionFormId) {
        this.docId = docId;
        this.submissionformId = submissionFormId;
    }
}
