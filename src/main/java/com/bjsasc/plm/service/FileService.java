package com.bjsasc.plm.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.bjsasc.asp.dev.framework.mvc.domain.AjaxResult;
import com.bjsasc.plm.domain.File;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface FileService extends IService<File> {
    AjaxResult uploadFile(MultipartFile file, Integer docId);

    AjaxResult deleteFile(Integer fileId, Integer docId);

    AjaxResult addFile(MultipartFile file, Integer docId);

    public List<File> selectByDocId(Integer docId,String version);
}
