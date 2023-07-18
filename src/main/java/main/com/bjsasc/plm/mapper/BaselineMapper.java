package main.com.bjsasc.plm.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import main.com.bjsasc.plm.domain.Baseline;
import main.com.bjsasc.plm.domain.DocumentVersion;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
* @author 张赵东
* @description 针对表【baseline】的数据库操作Mapper
* @createDate 2023-07-15 15:21:44
* @Entity com.bjsasc.plm.domain.Baseline
*/

@Repository
public interface BaselineMapper extends BaseMapper<Baseline> {
    /**
     * 查询基线包含所有文档及版本id
     *
     * @param id 基线id
     * @return 该基线中全部文档及版本
     */
    public List<DocumentVersion> getById(String id);
}




