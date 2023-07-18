package main.com.bjsasc.plm.service;

import com.baomidou.mybatisplus.extension.service.IService;
import main.com.bjsasc.plm.domain.DocumentVersion;
import main.com.bjsasc.plm.domain.Result;

/**
* @author 张赵东
* @description 针对表【documentversion】的数据库操作Service
* @createDate 2023-07-17 16:11:21
*/
public interface DocumentVersionService extends IService<DocumentVersion> {

    Result getAllById(String id);
}
