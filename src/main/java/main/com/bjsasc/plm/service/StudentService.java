package main.com.bjsasc.plm.service;

import main.com.bjsasc.plm.domain.Student;

import java.util.List;

public interface StudentService {
	public List<Student> list(Student student);
	
	public Student selectById(String innerId);
	
	public Student add(Student student);

	public Student update(Student student);
	
	public void delete(String innerId);

}
