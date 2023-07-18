package com.bjsasc.plm.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.bjsasc.plm.domain.Document;
import com.bjsasc.plm.domain.DocumentMaster;
import com.bjsasc.plm.mapper.DocumentMapper;
import com.bjsasc.plm.mapper.DocumentMasterMapper;
import com.bjsasc.plm.service.DocumentMasterService;
import com.bjsasc.plm.service.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Package: com.bjsasc.plm.service.impl
 * Discription:
 *
 * @Author: JUSTIN
 * @Create:7/18/2023 - 8:49 AM
 * @Version:
 */
@Service
public class DocumentMasterServiceImpl extends ServiceImpl<DocumentMasterMapper, DocumentMaster> implements DocumentMasterService {
    @Autowired
    private DocumentMasterMapper documentMasterMapper;

    @Override
    public List<DocumentMaster> getDocumentListWithVersion(){
        return documentMasterMapper.selectDocumentAndVersion();
    }

}
