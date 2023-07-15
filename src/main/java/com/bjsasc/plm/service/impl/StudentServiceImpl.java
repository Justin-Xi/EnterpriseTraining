package com.bjsasc.plm.service.impl;

import java.util.List;

import com.bjsasc.asp.dev.common.utils.IdUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.nacos.api.utils.StringUtils;
import com.bjsasc.adp.event.common.util.UUIDUtil;
import com.bjsasc.plm.domain.Student;
import com.bjsasc.plm.mapper.StudentMapper;
import com.bjsasc.plm.service.StudentService;

@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    private StudentMapper studentMapper;
	
    @Override
	public List<Student> list(Student student) {
    	return studentMapper.selectList(student);
	}
	
    @Override
	public Student selectById(String innerId) {
    	return studentMapper.selectById(innerId);
	}
	
    @Override
	public Student add(Student student) {
    	if(StringUtils.isEmpty(student.getInnerId())) {
			student.setInnerId(IdUtils.simpleUUID());
    		student.setInnerId(UUIDUtil.getUUID());
    	}
    	studentMapper.insert(student);
    	return student;
	}

    @Override
	public Student update(Student student) {
    	studentMapper.update(student);
    	return student;
	}
	
    @Override
	public void delete(String innerId) {
    	studentMapper.deleteById(innerId);
	}

}
