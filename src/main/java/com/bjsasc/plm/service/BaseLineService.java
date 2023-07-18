package com.bjsasc.plm.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.bjsasc.asp.dev.framework.mvc.domain.AjaxResult;
import com.bjsasc.plm.domain.BaseLine;
import com.bjsasc.plm.domain.DocumentVersion;

import java.util.List;

/**
 * Package: com.bjsasc.plm.service
 * Discription:
 *
 * @Author: JUSTIN
 * @Create:7/17/2023 - 10:17 PM
 * @Version:
 */
public interface BaseLineService extends IService<BaseLine> {
    List<BaseLine> getAll();
    List<DocumentVersion> getById(Integer id);
    public AjaxResult addDocument(Integer docId, String docVersion, Integer baseLineId);
}
