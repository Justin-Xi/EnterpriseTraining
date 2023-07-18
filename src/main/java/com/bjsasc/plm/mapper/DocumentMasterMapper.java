package com.bjsasc.plm.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.bjsasc.plm.domain.DocumentMaster;
import com.bjsasc.plm.domain.Student;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface DocumentMasterMapper extends BaseMapper<DocumentMaster> {
}
