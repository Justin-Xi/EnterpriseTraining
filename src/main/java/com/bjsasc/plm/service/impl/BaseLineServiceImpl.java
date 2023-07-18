package com.bjsasc.plm.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.bjsasc.plm.domain.*;
import com.bjsasc.plm.mapper.BaseLineLinkMapper;
import com.bjsasc.plm.mapper.BaseLineMapper;
import com.bjsasc.plm.service.BaseLineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class BaseLineServiceImpl  extends ServiceImpl<BaseLineMapper, BaseLine>  implements BaseLineService {
    @Autowired
    BaseLineMapper baseLineMapper;
    @Autowired
    BaseLineLinkMapper baseLineLinkMapper;

    @Override
    public List<BaseLine> getAll() {
        return baseLineMapper.selectList(null);
    }

    @Override
    public List<DocumentVersion> getById(Integer id) {
        return baseLineMapper.getById(id);
    }
    @Override
    public Result addDocument(Integer docId, String docVersion, Integer baseLineId) {
        BaseLineLink baselineLink = new BaseLineLink();
        baselineLink.setBaseLineId(baseLineId);
        baselineLink.setDocId(docId);
        baselineLink.setVersionNo(docVersion);
        int insert = baseLineLinkMapper.insert(baselineLink);
        if(insert == 1){
            return Result.ok();
        }
        return Result.fail("添加失败!");
    }
}
