package src.main.java.com.bjsasc.plm.controller;

import cn.hutool.core.date.DateTime;
import cn.hutool.core.util.ObjectUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.bjsasc.plm.domain.DocFileLink;
import com.bjsasc.plm.domain.Result;
import com.bjsasc.plm.service.FileService;
import io.swagger.models.auth.In;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.bjsasc.plm.domain.File;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/file")
public class FileController {
    @Autowired
    private FileService fileService;

    /**
     * 获取所有的文件屬性
     * @return 返回查询到的文件屬性信息
     */
    @GetMapping("/get/{id}")
    public Result getById(@PathVariable("id")Integer id){
        File file = fileService.getById(id);
        if (ObjectUtil.isNotNull(file)) {
            return Result.ok(file);
        }
        return Result.fail("未查询到响应文文件");
    }
    /**
     * 获取一个文档的所有的文件
     * @return 返回查询到的所有文件
     */
    @GetMapping("/select/{docId}")
    public Result selectByDocId(@PathVariable("docId")Integer id,@RequestParam("version")String version){List<File> file = fileService.selectByDocId(id,version);
        if (ObjectUtil.isNotNull(file)) {
            return Result.ok(file);
        }
        return Result.fail("未查询到响应文文件");
    }
    /**
     * 创建文件时候上传文件,并添加到文档中去
     * @param file 要上传的文件
     * @param docId 文档的id
     * @return 返回上传的结果
     * @throws IOException 可能会抛出IO异常
     */
    @PostMapping("/upload")
    public Result uploadFileWhenCreate(@RequestParam("file") MultipartFile file,@RequestParam("docId")Integer docId)  throws IOException {
        return fileService.uploadFile(file,docId);
    }

    /**
     * 文件已经被创建了，再添加文件
     * @param file 要添加的文件
     * @param docId 主文档的id
     * @return 根据添加是否成功返回响应结果
     */
    @PostMapping("/addFile")
    public Result addFile(@RequestParam("file") MultipartFile file,@RequestParam("docId")Integer docId){
        return fileService.addFile(file,docId);
    }

    /**
     * 删除文档中的文件
     * @param fileId 文件的id
     * @param docId 主文档的id
     * @return 根据删除是否成功返回响应的结果
     */
    @PostMapping("/delete/{fileId}")
    public Result deteleFileFromDoc(@PathVariable("fileId")Integer fileId,@RequestParam("docId")Integer docId){
        return fileService.deleteFile(fileId,docId);
    }

}
