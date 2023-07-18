package main.com.bjsasc.plm.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import main.com.bjsasc.plm.domain.SubmissionForm;
import org.springframework.stereotype.Repository;

/**
* @author 张赵东
* @description 针对表【submissionform】的数据库操作Mapper
* @createDate 2023-07-15 15:21:44
* @Entity com.bjsasc.plm.domain.SubmissionForm
*/
@Repository
public interface SubmissionFormMapper extends BaseMapper<SubmissionForm> {
    int insertAndGetId(SubmissionForm submissionForm);
}




