package com.bjsasc.plm.controller;

import com.bjsasc.plm.domain.Result;
import com.bjsasc.plm.service.DocumentVersionService;
import io.swagger.models.auth.In;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/documentVersion")
public class DocumentVersionController {
    @Autowired
    private DocumentVersionService documentVersionService;

    /**
     * 根据id获取文档的所有历史版本
     * @param id 文档的id
     * @return 返回获取的结果
     */
    @GetMapping("/list/{id}")
    public Result getAllById(@PathVariable("id")Integer id){
        return documentVersionService.getAllById(id);
    }

}
