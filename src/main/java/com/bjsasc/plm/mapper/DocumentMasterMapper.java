package com.bjsasc.plm.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.bjsasc.plm.domain.DocumentMaster;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * Package: com.bjsasc.plm.mapper
 * Discription:
 *
 * @Author: JUSTIN
 * @Create:7/18/2023 - 8:51 AM
 * @Version:
 */
@Mapper
public interface DocumentMasterMapper extends BaseMapper<DocumentMaster> {
    List<DocumentMaster> selectDocumentAndVersion();
}
