package com.bjsasc.plm.service;

import java.util.List;

import com.bjsasc.plm.domain.Student;

public interface StudentService {
	
	public List<Student> list(Student student);
	
	public Student selectById(String innerId);
	
	public Student add(Student student);

	public Student update(Student student);
	
	public void delete(String innerId);

}
