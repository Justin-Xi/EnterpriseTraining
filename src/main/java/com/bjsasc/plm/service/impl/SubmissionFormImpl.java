package com.bjsasc.plm.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.bjsasc.plm.domain.Result;
import com.bjsasc.plm.domain.SubDocLink;
import com.bjsasc.plm.domain.SubmissionForm;
import com.bjsasc.plm.mapper.SubDocLinkMapper;
import com.bjsasc.plm.mapper.SubmissionFormMapper;
import com.bjsasc.plm.service.SubmissionFormService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class SubmissionFormImpl extends ServiceImpl<SubmissionFormMapper, SubmissionForm> implements SubmissionFormService {
   @Autowired
    private SubmissionFormMapper submissionFormMapper;
   @Autowired
   private SubDocLinkMapper subDocLinkMapper;

    @Override
    public Result addSubmission(SubmissionForm submissionForm,Integer id) {
        //TODO 这里要获取用户名，再设置，根据前端传参
        if (submissionForm.getCreateUser() == null) {
            submissionForm.setCreateUser("郑师帅");
        }
        //将送审单插入到表中
        Date date = new Date();
        java.sql.Date sqlDate = new java.sql.Date(date.getTime());
        submissionForm.setCreateTime(sqlDate);
        submissionFormMapper.insertAndGetId(submissionForm);
        Integer subId = submissionForm.getId();
        //添加送审单和文档的关系
            subDocLinkMapper.insert(new SubDocLink(id,subId));
        return Result.ok();
    }

}
