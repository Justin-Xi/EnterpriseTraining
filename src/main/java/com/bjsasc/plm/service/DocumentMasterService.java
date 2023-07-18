package com.bjsasc.plm.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.bjsasc.plm.domain.DocumentMaster;
import com.bjsasc.plm.domain.Result;

import java.util.List;

public interface DocumentMasterService extends IService<DocumentMaster> {
    List<DocumentMaster> getAll();

    List<DocumentMaster> getByName(String name);

    Result addDocument(DocumentMaster documentMaster);

    Result updateDocumentById(DocumentMaster documentMaster);

    Result setStatusById(Integer id, String status);

    Result checkIn(Integer id);

    Result checkOut(Integer id);

}


