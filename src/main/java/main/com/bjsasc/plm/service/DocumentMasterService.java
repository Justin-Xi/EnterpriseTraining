package main.com.bjsasc.plm.service;

import com.baomidou.mybatisplus.extension.service.IService;
import main.com.bjsasc.plm.domain.DocumentMaster;
import main.com.bjsasc.plm.domain.Result;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
* @author 张赵东
* @description 针对表【documentmaster】的数据库操作Service
* @createDate 2023-07-17 17:16:42
*/
public interface DocumentMasterService extends IService<DocumentMaster> {

    List<DocumentMaster> getAll();

    List<DocumentMaster> getByName(String name);

    Result addDocument(DocumentMaster documentMaster);

    @Transactional
    Result updateDocumentById(DocumentMaster documentMaster);

    Result setStatusById(String id, String status);

    Result checkIn(String id);

    Result checkOut(String id);

    @Transactional
    Result mainVersionRise(String docId);

    @Transactional
    boolean changeFileLink(String id, String oldVersion, String newVersion);
}
