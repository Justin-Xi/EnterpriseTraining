package main.com.bjsasc.plm.domain;

import java.io.Serializable;

public class Student implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private String innerId;
	
	private String stuNo;
	
	private String name;
	
	private String gender;
	
	private boolean isStaySchool;

	public String getInnerId() {
		return innerId;
	}

	public void setInnerId(String innerId) {
		this.innerId = innerId;
	}

	public String getStuNo() {
		return stuNo;
	}

	public void setStuNo(String stuNo) {
		this.stuNo = stuNo;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public boolean isIsStaySchool() {
		return isStaySchool;
	}

	public void setIsStaySchool(boolean isStaySchool) {
		this.isStaySchool = isStaySchool;
	}
	
}
