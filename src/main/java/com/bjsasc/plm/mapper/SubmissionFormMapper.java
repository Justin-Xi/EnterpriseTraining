package com.bjsasc.plm.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.bjsasc.plm.domain.Student;
import com.bjsasc.plm.domain.SubmissionForm;
import io.swagger.models.auth.In;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface SubmissionFormMapper extends BaseMapper<SubmissionForm> {
    int insertAndGetId(SubmissionForm submissionForm);
}
