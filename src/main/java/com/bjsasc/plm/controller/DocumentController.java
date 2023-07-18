package com.bjsasc.plm.controller;

import com.bjsasc.asp.dev.framework.mvc.controller.BaseController;
import com.bjsasc.asp.dev.framework.mvc.domain.AjaxResult;
import com.bjsasc.plm.domain.Document;
import com.bjsasc.plm.domain.DocumentMaster;
import com.bjsasc.plm.service.DocumentService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.checkerframework.checker.units.qual.A;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * Package: com.bjsasc.plm.controller
 * Discription:
 *
 * @Author: JUSTIN
 * @Create:7/15/2023 - 3:00 PM
 * @Version:
 */
@RestController
@RequestMapping
@Api(tags={"文档信息服务接口"})
public class DocumentController extends BaseController {
    @Autowired
    private DocumentService documentService;
    @ApiOperation(value="文档信息列表")
    @GetMapping("/list")
    public AjaxResult list(@RequestBody Map<String,Object> info){
        List<DocumentMaster> list=documentService.getDocumentList(info);
        return AjaxResult.success(list);
    }
    @ApiOperation(value = "创建文档")
    @PostMapping("/create")
    public AjaxResult create(@RequestBody Map<String,Object> info) {
        documentService.createDocument(info);
        return AjaxResult.success();
    }
    @ApiOperation(value="新增文档信息")
    @PostMapping("/add")
    public AjaxResult add(@RequestBody Document document){
        documentService.add(document);
        return AjaxResult.success();
    }
    @ApiOperation(value="修改文档信息")
    @PostMapping("/modify")
    public AjaxResult modify(@RequestBody Document document){
        documentService.update(document);
        return AjaxResult.success();
    }
    @ApiOperation(value = "删除文档")
    @PostMapping("/delete")
    public AjaxResult delete(@RequestParam String documentId){
        documentService.delete(documentId);
        return AjaxResult.success();
    }
    @ApiOperation(value="查看文档历史版本信息")
    @GetMapping("/history")
    public AjaxResult history(@RequestBody Document document){
        return AjaxResult.success(documentService.history(document));
    }
    @ApiOperation(value="设置文档状态")
    @PostMapping("/setStatus/{id}")
    public AjaxResult setStatus(@PathVariable("id")String id,@RequestParam("status")String status){
        return AjaxResult.success(documentService.setStatusById(id,status));
    }
    @ApiOperation(value = "检出文档")
    @PostMapping("/checkout")
    public AjaxResult checkOut(@RequestParam String versionId) {
        DocumentMaster documentMaster=documentService.checkOut(versionId);
        return AjaxResult.success(documentMaster);
    }

    @ApiOperation(value = "检入文档")
    @PostMapping("/checkIn")
    public AjaxResult checkIn(@RequestParam String versionId) {
        DocumentMaster documentMaster=documentService.checkIn(versionId);
        return AjaxResult.success(documentMaster);
    }

}
