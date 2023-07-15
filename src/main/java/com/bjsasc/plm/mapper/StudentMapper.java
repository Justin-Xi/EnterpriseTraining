package com.bjsasc.plm.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.bjsasc.plm.domain.Student;

@Mapper
public interface StudentMapper extends BaseMapper<Student> {

    /**
     * 查询学生信息
     * 
     * @param innerId 学生信息内部标识
     * @return 学生信息
     */
    public Student selectById(String innerId);

    /**
     * 查询学生信息列表
     * 
     * @param student 学生信息
     * @return 学生信息集合
     */
    public List<Student> selectList(Student student);

	
    /**
     * 新增学生信息
     * 
     * @param student 学生信息
     * @return 结果
     */
    public int insert(Student student);

    /**
     * 修改学生信息
     * 
     * @param student 学生信息
     * @return 结果
     */
    public int update(Student student);

    /**
     * 删除学生信息
     * 
     * @param innerId 学生内部标识
     * @return 结果
     */
    public int deleteById(String innerId);
	
}
