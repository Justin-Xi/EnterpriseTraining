package com.bjsasc.plm.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.bjsasc.plm.domain.DocumentVersion;
import com.bjsasc.plm.domain.File;
import com.bjsasc.plm.domain.Result;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface FileService extends IService<File> {
    Result uploadFile(MultipartFile file, Integer docId);

    Result deleteFile(Integer fileId, Integer docId);

    Result addFile(MultipartFile file, Integer docId);

    public List<File> selectByDocId(Integer docId,String version);
}
