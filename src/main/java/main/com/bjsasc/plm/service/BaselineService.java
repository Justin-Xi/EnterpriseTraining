package main.com.bjsasc.plm.service;

import com.baomidou.mybatisplus.extension.service.IService;
import main.com.bjsasc.plm.domain.Baseline;
import main.com.bjsasc.plm.domain.DocumentVersion;
import main.com.bjsasc.plm.domain.Result;

import java.util.List;

/**
* @author 张赵东
* @description 针对表【baseline】的数据库操作Service
* @createDate 2023-07-15 15:21:44
*/
public interface BaselineService extends IService<Baseline> {
    boolean add(Baseline baseline);

    boolean update(Baseline baseline);

    void delete(String innerId);

    List<DocumentVersion> getById(String id);

    Result addDocument(String docId, String docVersion, String baseLineId);
}
