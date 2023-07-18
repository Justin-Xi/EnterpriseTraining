package com.bjsasc.plm.controller;

import com.bjsasc.plm.domain.DocumentMaster;
import com.bjsasc.plm.domain.Result;
import com.bjsasc.plm.domain.SubmissionForm;
import com.bjsasc.plm.service.SubmissionFormService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/submission")
public class SubmissionFormController {
    @Autowired
    private SubmissionFormService submissionFormService;

    /**
     * 显示所有送审单
     * @return 返回所有送审单
     */
    @GetMapping("/list")
    public Result getAll(){
        return Result.ok(submissionFormService.getBaseMapper().selectList(null));
    }

    /**
     * 新建送审单
     * @param submissionForm 送审单
     * @return 根据添加是否成功，返回结果
     */
    @PostMapping("/add")
    public Result addDocument(@RequestBody SubmissionForm submissionForm,@RequestParam("id")Integer id){
        return submissionFormService.addSubmission(submissionForm,id);
    }
}
