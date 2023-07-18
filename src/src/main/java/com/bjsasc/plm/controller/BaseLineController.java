package src.main.java.com.bjsasc.plm.controller;

import cn.hutool.core.util.ObjectUtil;
import cn.hutool.core.util.RandomUtil;
import com.bjsasc.plm.domain.*;
import com.bjsasc.plm.service.BaseLineService;
import com.bjsasc.plm.service.DocumentMasterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/baseline")
public class BaseLineController {
    @Autowired
    private BaseLineService baseLineService;

    /**
     * 获取所有的基线列表
     * @return 返回查询到的基线列表信息
     */
    @GetMapping("/list")
    public Result getAll(){
        return Result.ok(baseLineService.getAll());
    }
    /**
     * 通过基线id获取基线关联文档及文档版本
     * @return 返回查询到的文档列表信息
     */
    @GetMapping("/get/{id}")
    public Result getById(@PathVariable("id")Integer id) {
        List<DocumentVersion> doc = baseLineService.getById(id);
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
    @PostMapping("/add")
    public Result addDocument(@RequestParam("docId")Integer docId, @RequestParam("versionNo")String docVersion, @RequestParam("baselineId")Integer baseLineId){
        return baseLineService.addDocument(docId, docVersion, baseLineId);
    }
}
