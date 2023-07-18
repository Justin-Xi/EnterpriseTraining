package main.com.bjsasc.plm.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import main.com.bjsasc.plm.domain.File;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
* @author 张赵东
* @description 针对表【file】的数据库操作Mapper
* @createDate 2023-07-17 11:29:30
* @Entity com.bjsasc.plm.domain.File
*/

@Repository
public interface FileMapper extends BaseMapper<File> {
    /**
     * 查询文档包含的所有文件id
     *
     * @param docId 文档id
     * @return 该文档全部文件
     */
    public List<File> selectByDocId(@Param("docId")String docId, @Param("versionNo")String versionNo);
}




