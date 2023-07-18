package com.bjsasc.plm.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.bjsasc.plm.domain.File;
import com.bjsasc.plm.domain.Student;
import io.swagger.models.auth.In;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface FileMapper extends BaseMapper<File> {
    /**
     * 查询文档包含所有文件id
     *
     * @param docId 文档id
     * @return 该文档全部文件
     */
    public List<File> selectByDocId(@Param("docId")Integer docId,@Param("version")String version);
}
