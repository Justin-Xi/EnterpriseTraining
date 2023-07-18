package main.com.bjsasc.plm.controller;

import cn.hutool.core.util.ObjectUtil;
import com.bjsasc.asp.dev.framework.mvc.domain.AjaxResult;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import main.com.bjsasc.plm.domain.Baseline;
import main.com.bjsasc.plm.domain.DocumentVersion;
import main.com.bjsasc.plm.domain.Result;
import main.com.bjsasc.plm.service.BaselineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/baseline")
@Api(tags = { "基线信息服务接口" })
public class BaselineController {
    @Autowired
    private BaselineService baselineService;

    @ApiOperation(value = "获取基线信息列表")
    @GetMapping("/list")
    public AjaxResult list() {
        return AjaxResult.success(baselineService.list(null));
    }

    @ApiOperation(value = "新增基线信息")
    @PostMapping("/add")
    public AjaxResult add(@RequestBody Baseline baseline) {
        baselineService.add(baseline);
        return AjaxResult.success();
    }


    @ApiOperation(value = "修改基线信息")
    @PostMapping("/modify")
    public AjaxResult modify(@RequestBody Baseline baseline) {
        baselineService.update(baseline);
        return AjaxResult.success();
    }

    @ApiOperation(value = "删除基线信息")
    @PostMapping("/delete")
    public AjaxResult delete(@RequestParam String innerId) {
        baselineService.delete(innerId);
        return AjaxResult.success();
    }

    /**
     * 通过基线id获取基线关联文档及文档版本
     * @return 返回查询到的文档列表信息
     */
    @GetMapping("/get/{id}")
    public Result getById(@PathVariable("id")String id) {
        List<DocumentVersion> doc = baselineService.getById(id);
        if (ObjectUtil.isNotNull(doc)) {
            return Result.ok(doc);
        }
        return Result.fail("未查询到响应文文件");
    }


    /**
     * 添加文档到指定基线
     * @param docId 添加的文档id
     * @return 根据添加是否成功返回响应的结果
     */
    @PostMapping("/addDoc")
    public Result addDocument(@RequestParam("docId")String docId, @RequestParam("versionNo")String docVersion, @RequestParam("baselineId")String baseLineId){
        return baselineService.addDocument(docId, docVersion, baseLineId);
    }
}
