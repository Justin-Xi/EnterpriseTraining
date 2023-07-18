package com.bjsasc.plm.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.bjsasc.plm.domain.DocumentVersion;
import com.bjsasc.plm.domain.Result;
import com.bjsasc.plm.mapper.DocumentVersionMapper;
import com.bjsasc.plm.service.DocumentVersionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DocumentVersionServiceImpl extends ServiceImpl<DocumentVersionMapper, DocumentVersion> implements DocumentVersionService {
   @Autowired
   private DocumentVersionMapper documentVersionMapper;
    @Override
    public Result getAllById(Integer id) {
        LambdaQueryWrapper<DocumentVersion> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(DocumentVersion::getMasterId,id);
        List<DocumentVersion> versions = documentVersionMapper.selectList(wrapper);
        if (versions.isEmpty()){
            return Result.fail("未查找到历史版本!");
        }
        return Result.ok(versions);
    }
}
