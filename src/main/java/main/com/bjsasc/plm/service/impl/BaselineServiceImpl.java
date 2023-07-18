package main.com.bjsasc.plm.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import main.com.bjsasc.plm.domain.BaseLineLink;
import main.com.bjsasc.plm.domain.Baseline;
import main.com.bjsasc.plm.domain.DocumentVersion;
import main.com.bjsasc.plm.domain.Result;
import main.com.bjsasc.plm.mapper.BaseLineLinkMapper;
import main.com.bjsasc.plm.mapper.BaselineMapper;
import main.com.bjsasc.plm.service.BaselineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
* @author 张赵东
* @description 针对表【baseline】的数据库操作Service实现
* @createDate 2023-07-15 15:21:44
*/
@Service
public class BaselineServiceImpl extends ServiceImpl<BaselineMapper, Baseline>
    implements BaselineService {
    @Autowired
    private BaselineMapper baselineMapper;

    @Autowired
    BaseLineLinkMapper baseLineLinkMapper;

    @Override
    public boolean add(Baseline baseline) {
        int status = baselineMapper.insert(baseline);
        if (status==1)
            return true;
        else
            return false;
    }

    @Override
    public boolean update(Baseline baseline) {
        int status = baselineMapper.update(baseline,null);
        return status == 1;
    }

    @Override
    public void delete(String innerId) {
        baselineMapper.deleteById(innerId);
    }

    @Override
    public List<DocumentVersion> getById(String id) {
        return baselineMapper.getById(id);
    }

    @Override
    public Result addDocument(String docId, String docVersion, String baseLineId) {
        BaseLineLink baselineLink = new BaseLineLink();
        baselineLink.setBaselineid(baseLineId);
        baselineLink.setDocid(docId);
        baselineLink.setDocumentverno(docVersion);
        int insert = baseLineLinkMapper.insert(baselineLink);
        if(insert == 1){
            return Result.ok();
        }
        return Result.fail("添加失败!");
    }
}




