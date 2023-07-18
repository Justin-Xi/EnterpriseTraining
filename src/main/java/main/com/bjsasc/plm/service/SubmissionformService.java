package main.com.bjsasc.plm.service;

import com.baomidou.mybatisplus.extension.service.IService;
import main.com.bjsasc.plm.domain.Result;
import main.com.bjsasc.plm.domain.SubmissionForm;

/**
* @author 张赵东
* @description 针对表【submissionform】的数据库操作Service
* @createDate 2023-07-15 15:21:44
*/
public interface SubmissionformService extends IService<SubmissionForm> {
    Result addSubmission(SubmissionForm submissionForm, String id);
}
