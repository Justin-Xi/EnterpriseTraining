package com.bjsasc.plm.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.bjsasc.plm.domain.DocumentVersion;
import com.bjsasc.plm.domain.Result;

public interface DocumentVersionService extends IService<DocumentVersion> {
    Result getAllById(Integer id);

}
