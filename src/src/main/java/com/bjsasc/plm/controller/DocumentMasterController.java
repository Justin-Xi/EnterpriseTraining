package src.main.java.com.bjsasc.plm.controller;

import cn.hutool.core.util.ObjectUtil;
import com.bjsasc.plm.domain.DocumentMaster;
import com.bjsasc.plm.domain.Result;
import com.bjsasc.plm.service.DocumentMasterService;
import io.swagger.models.auth.In;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/*
addDocument方法，id的参数有点问题
其余功能除了checkIn，checkOut都可以正常运行
 */
@RestController
@RequestMapping("/documentMaster")
public class DocumentMasterController {
    @Autowired
    private DocumentMasterService documentMasterService;

    /**
     * 获取所有的文档列表
     * @return 返回查询到的文档列表信息
     */
    @GetMapping("/list")
    public Result getAll(){
        return Result.ok(documentMasterService.getAll());
    }

    /**
     * 根据id获取文档信息
     * @param id 文档的id
     * @return 返回查询到的文档信息
     */
    @GetMapping("/get/{id}")
    public Result getById(@PathVariable("id")Integer id){
        DocumentMaster master = documentMasterService.getById(id);
        if (ObjectUtil.isNotNull(master)) {
            return Result.ok(master);
        }
        return Result.fail("未查询到响应文档");
    }

    /**
     * 根据文档的名称查询文档信息
     * @param name 要查询的文档的名称
     * @return 返回查询到的结果
     */
    @GetMapping("/getByName")
    public Result getByName(@RequestParam("name")String name){
        List<DocumentMaster> byName = documentMasterService.getByName(name);
        if(ObjectUtil.isNotNull(byName)){
            return Result.ok(byName);
        }
        return Result.fail("未查询到相关的信息");
    }

    /**
     * 添加文档
     * @param documentMaster 添加的文档的实体
     * @return 根据添加是否成功返回响应的结果
     */
    @PostMapping("/add")
    public Result addDocument(@RequestBody DocumentMaster documentMaster){
        return documentMasterService.addDocument(documentMaster);
    }

    /**
     * 根据id删除文档信息
     * @param id 要删除的文档的id
     * @return 根据是否删除成功返回响应的结果
     */
    @PostMapping("/delete/{id}")
    public Result deleteDocument(@PathVariable("id")Integer id){
        boolean b = documentMasterService.removeById(id);
        if (b){
            return Result.ok();
        }
        return Result.fail("删除失败!");
    }

    /**
     * 修改文档的信息
     * @param documentMaster 更新后的文档
     * @return 返回修改的信息
     */
    @PutMapping("/update")
    public Result updateDocument(@RequestBody DocumentMaster documentMaster){
        return documentMasterService.updateDocumentById(documentMaster);
    }


    /**
     * 根据id设置文档的状态
     * @param id 要设置的文档的id
     * @param status 要设置的状态
     * @return 根据设置是否成功返回响应的id
     */
    @PostMapping("/setStatus/{id}")
    public Result setStatus(@PathVariable("id")Integer id,@RequestParam("status")String status){
        return documentMasterService.setStatusById(id,status);
    }

    /**
     * 根据id进行检入操作
     * @param id 要检入的文档的id
     * @return 返回检入的结果
     */
    @PostMapping("/checkIn/{id}")
    public Result checkIn(@PathVariable("id")Integer id){
        //TODO
        return documentMasterService.checkIn(id);
    }


    /**
     * 根据id进行检出操作
     * @param id 要检出的文档的id
     * @return 返回检出的结果
     */
    @PostMapping("/checkOut/{id}")
    public Result checkOut(@PathVariable("id")Integer id){
        //TODO
        return documentMasterService.checkOut(id);
    }





}
