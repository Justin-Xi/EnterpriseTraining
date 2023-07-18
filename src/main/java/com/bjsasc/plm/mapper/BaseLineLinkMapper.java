package com.bjsasc.plm.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.bjsasc.plm.domain.BaseLineLink;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BaseLineLinkMapper extends BaseMapper<BaseLineLink> {
    /**
     * 查询基线包含所有文档及版本id
     *
     * @param baseLineLink 要插入的基线关系
     * @return 若成功，返回1；否则返回0
     */
    public int insert(BaseLineLink baseLineLink);
}
