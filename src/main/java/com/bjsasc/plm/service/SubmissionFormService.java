package com.bjsasc.plm.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.bjsasc.plm.domain.Result;
import com.bjsasc.plm.domain.SubmissionForm;

public interface SubmissionFormService extends IService<SubmissionForm> {
    Result addSubmission(SubmissionForm submissionForm, Integer id);

}
