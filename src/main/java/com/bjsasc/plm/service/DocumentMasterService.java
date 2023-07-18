package com.bjsasc.plm.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.bjsasc.plm.domain.DocumentMaster;

import java.util.List;

/**
 * Package: com.bjsasc.plm.service
 * Discription:
 *
 * @Author: JUSTIN
 * @Create:7/18/2023 - 8:50 AM
 * @Version:
 */
public interface DocumentMasterService extends IService<DocumentMaster> {
    List<DocumentMaster> getDocumentListWithVersion();
}
