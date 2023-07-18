package main.com.bjsasc.plm.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import main.com.bjsasc.plm.domain.DocumentVersion;
import main.com.bjsasc.plm.domain.Result;
import main.com.bjsasc.plm.mapper.DocumentVersionMapper;
import main.com.bjsasc.plm.service.DocumentVersionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
* @author 张赵东
* @description 针对表【documentversion】的数据库操作Service实现
* @createDate 2023-07-17 16:11:21
*/
@Service
public class DocumentVersionServiceImpl extends ServiceImpl<DocumentVersionMapper, DocumentVersion>
    implements DocumentVersionService{
    @Autowired
    private DocumentVersionMapper documentVersionMapper;
    @Override
    public Result getAllById(String id) {
        LambdaQueryWrapper<DocumentVersion> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(DocumentVersion::getMasterid,id);
        List<DocumentVersion> versions = documentVersionMapper.selectList(wrapper);
        if (versions.isEmpty()){
            return Result.fail("未查找到历史版本!");
        }
        return Result.ok(versions);
    }
}




