package com.bjsasc.plm.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.bjsasc.plm.domain.Document;
import com.bjsasc.plm.domain.DocumentVersion;
import com.bjsasc.plm.domain.File;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * Package: com.bjsasc.plm.mapper
 * Discription:
 *
 * @Author: JUSTIN
 * @Create:7/15/2023 - 11:10 AM
 * @Version:
 */
@Mapper
public interface DocumentMapper extends BaseMapper<Document> {
    public Document selectById(String documentId);
    public List<Document> selectList(Document document);
    public int insert(Document document);
    public int update(Document document);
    public int deleteById(String documentId);
    public List<DocumentVersion> history(Document document);

}
