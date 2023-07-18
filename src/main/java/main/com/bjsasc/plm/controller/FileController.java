package main.com.bjsasc.plm.controller;

import cn.hutool.core.util.ObjectUtil;
//import com.bjsasc.asp.dev.framework.mvc.domain.AjaxResult;
import main.com.bjsasc.plm.domain.File;
import main.com.bjsasc.plm.domain.Result;
import main.com.bjsasc.plm.service.FileService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/file")
@Api(tags = { "文件信息服务接口" })
public class FileController {
    @Autowired
    private FileService fileService;

    @ApiOperation(value = "获取文件信息列表")
    @GetMapping("/list")
    public Result list() {
        return Result.ok(fileService.list(null));
    }

    /**
     * 获取所查询的文件信息
     * @return 返回查询到的文件屬性信息
     */
    @GetMapping("/get/{id}")
    public Result getById(@PathVariable("id") String id){
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
    public Result selectByDocId(@PathVariable("docId")String id,@RequestParam("version")String version){
        List<File> files = fileService.selectByDocId(id,version);
        if (ObjectUtil.isNotNull(files)) {
            return Result.ok(files);
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
    public Result uploadFileWhenCreate(@RequestParam("file") MultipartFile file, @RequestParam("docId")String docId)  throws IOException {
        return fileService.uploadFile(file,docId);
    }

    /**
     * 文件已经被创建了，再添加文件
     * @param file 要添加的文件
     * @param docId 主文档的id
     * @return 根据添加是否成功返回响应结果
     */
    @PostMapping("/addFile")
    public Result addFile(@RequestParam("file") MultipartFile file,@RequestParam("docId")String docId){
        return fileService.addFile(file,docId);
    }

    /**
     * 删除文档中的文件
     * @param fileId 文件的id
     * @param docId 主文档的id
     * @return 根据删除是否成功返回响应的结果
     */
    @PostMapping("/delete/{id}")
    public Result deteleFileFromDoc(@PathVariable("id")String fileId,@RequestParam("docId")String docId){
        return fileService.deleteFile(fileId,docId);
    }
}
