package main.com.bjsasc.plm.controller;

import main.com.bjsasc.plm.domain.Result;
import main.com.bjsasc.plm.domain.SubmissionForm;
import main.com.bjsasc.plm.service.SubmissionformService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/submission")
@Api(tags = { "送审单信息服务接口" })
public class SubmissionFormController {
    @Autowired
    private SubmissionformService submissionFormService;

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
    public Result addDocument(@RequestBody SubmissionForm submissionForm, @RequestParam("id")String id){
        return submissionFormService.addSubmission(submissionForm,id);
    }
}
