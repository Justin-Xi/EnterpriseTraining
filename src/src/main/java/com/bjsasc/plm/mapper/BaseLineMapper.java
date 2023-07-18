package src.main.java.com.bjsasc.plm.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.bjsasc.plm.domain.BaseLine;
import com.bjsasc.plm.domain.DocumentVersion;
import com.bjsasc.plm.domain.File;
import com.bjsasc.plm.domain.Student;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BaseLineMapper extends BaseMapper<BaseLine> {
    /**
     * 查询基线包含所有文档及版本id
     *
     * @param id 基线id
     * @return 该基线中全部文档及版本
     */
    public List<DocumentVersion> getById(Integer id);
}
