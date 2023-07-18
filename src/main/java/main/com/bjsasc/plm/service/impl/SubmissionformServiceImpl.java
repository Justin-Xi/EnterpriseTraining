package main.com.bjsasc.plm.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import main.com.bjsasc.plm.domain.DocLink;
import main.com.bjsasc.plm.domain.Result;
import main.com.bjsasc.plm.domain.SubmissionForm;
import main.com.bjsasc.plm.mapper.DocLinkMapper;
import main.com.bjsasc.plm.mapper.SubmissionFormMapper;
import main.com.bjsasc.plm.service.SubmissionformService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

/**
* @author 张赵东
* @description 针对表【submissionform】的数据库操作Service实现
* @createDate 2023-07-15 10:43:23
*/
@Service
public class SubmissionformServiceImpl extends ServiceImpl<SubmissionFormMapper, SubmissionForm> implements SubmissionformService {
    @Autowired
    private SubmissionFormMapper submissionFormMapper;
    @Autowired
    private DocLinkMapper docLinkMapper;

    @Override
    public Result addSubmission(SubmissionForm submissionForm, String id) {
        //TODO 这里要获取用户名，再设置，根据前端传参
        if (submissionForm.getCreatuser() == null) {
            submissionForm.setCreatuser("张赵东");
        }
        //将送审单插入到表中
        Date date = new Date();
        java.sql.Date sqlDate = new java.sql.Date(date.getTime());
        submissionForm.setCreattime(sqlDate);
        submissionFormMapper.insertAndGetId(submissionForm);
        String subId = submissionForm.getId();
        //添加送审单和文档的关系
        docLinkMapper.insert(new DocLink(id,subId));
        return Result.ok();
    }

}




