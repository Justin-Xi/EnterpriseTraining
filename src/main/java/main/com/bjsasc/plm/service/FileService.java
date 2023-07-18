package main.com.bjsasc.plm.service;

import com.baomidou.mybatisplus.extension.service.IService;
import main.com.bjsasc.plm.domain.File;
import main.com.bjsasc.plm.domain.Result;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
* @author 张赵东
* @description 针对表【file】的数据库操作Service
* @createDate 2023-07-17 11:29:30
*/
public interface FileService extends IService<File> {

    Result uploadFile(MultipartFile file, String docId);

    @Transactional
    Result deleteFile(String fileId, String docId);

    @Transactional
    Result addFile(MultipartFile file, String docId);

    List<File> selectByDocId(String docId, String version);
}
