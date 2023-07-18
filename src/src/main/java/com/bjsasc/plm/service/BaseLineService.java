package src.main.java.com.bjsasc.plm.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.bjsasc.plm.domain.BaseLine;
import com.bjsasc.plm.domain.DocumentMaster;
import com.bjsasc.plm.domain.DocumentVersion;
import com.bjsasc.plm.domain.Result;
import zipkin2.Call;

import java.util.List;

public interface BaseLineService extends IService<BaseLine> {
    List<BaseLine> getAll();
    List<DocumentVersion> getById(Integer id);
    public Result addDocument(Integer docId, String docVersion, Integer baseLineId);
}
