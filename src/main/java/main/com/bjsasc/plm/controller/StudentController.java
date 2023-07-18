package main.com.bjsasc.plm.controller;

import com.bjsasc.asp.dev.framework.mvc.controller.BaseController;
import com.bjsasc.asp.dev.framework.mvc.domain.AjaxResult;
import main.com.bjsasc.plm.domain.Student;
import main.com.bjsasc.plm.service.StudentService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * 学生信息服务
 *
 * @date 2023-07-10
 */
@RestController
@RequestMapping("/student")
@Api(tags = { "学生信息服务接口" })
public class StudentController  extends BaseController {
	
	@Autowired
	private StudentService studentService;
	
	@ApiOperation(value = "获取学生信息列表")
    @GetMapping("/list")
	public AjaxResult list() {
		Student student = new Student();
		return AjaxResult.success(studentService.list(student));
	}
	
	@ApiOperation(value = "新增学生信息")
    @PostMapping("/add")
	public AjaxResult add(@RequestBody Student student) {
		studentService.add(student);
		return AjaxResult.success();
	}

	
	@ApiOperation(value = "修改学生信息")
    @PostMapping("/modify")
	public AjaxResult modify(@RequestBody Student student) {
		studentService.update(student);
		return AjaxResult.success();
	}
	
	@ApiOperation(value = "删除学生信息")
    @PostMapping("/delete")
	public AjaxResult delete(@RequestParam String innerId) {
		studentService.delete(innerId);
		return AjaxResult.success();
	}

}