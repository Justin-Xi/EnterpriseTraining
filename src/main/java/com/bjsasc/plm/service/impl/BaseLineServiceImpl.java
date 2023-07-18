package com.bjsasc.plm.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.bjsasc.asp.dev.framework.mvc.domain.AjaxResult;
import com.bjsasc.plm.domain.BaseLine;
import com.bjsasc.plm.domain.BaseLineLink;
import com.bjsasc.plm.domain.DocumentVersion;
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
    public AjaxResult addDocument(Integer docId, String docVersion, Integer baseLineId) {
        BaseLineLink baselineLink = new BaseLineLink();
        baselineLink.setBaseLineId(baseLineId);
        baselineLink.setDocId(docId);
        baselineLink.setVersionNo(docVersion);
        int insert = baseLineLinkMapper.insert(baselineLink);
        if(insert == 1){
            return AjaxResult.success();
        }
        return AjaxResult.error("添加失败!");
    }
}
