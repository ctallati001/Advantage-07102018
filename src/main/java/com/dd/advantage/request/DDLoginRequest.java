package com.dd.advantage.request;

public class DDLoginRequest {
	private String email;
	private String token;
	private String userType;
	private String vRoot;
	private String firstName;
	private String lastName;
	private String language;
	private long deptID;
	private long externalNumber;
	private String section;
	private long officeID;
	private String deptName;
	private long orgID;
	
	private int status;
	private String advantageURL;
	
	
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public String getAdvantageURL() {
		return advantageURL;
	}
	public void setAdvantageURL(String advantageURL) {
		this.advantageURL = advantageURL;
	}
	public long getExternalNumber() {
		return externalNumber;
	}
	public void setExternalNumber(long externalNumber) {
		this.externalNumber = externalNumber;
	}
	public String getSection() {
		return section;
	}
	public void setSection(String section) {
		this.section = section;
	}

	public void setOrgID(long orgID) {
		this.orgID = orgID;
	}
	public long getOrgID() {
		return orgID;
	}
	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}
	public String getDeptName() {
		return deptName;
	}
	
	public void setOfficeID(long officeID) {
		this.officeID = officeID;
	}
	public long getOfficeID() {
		return officeID;
	}
	
	public void setDeptID(long deptID) {
		this.deptID = deptID;
	}
	public long getDeptID() {
		return deptID;
	}
	
	
	public void setLanguage(String language) {
		this.language = language;
	}
	public String getLanguage() {
		return language;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getFirstName() {
		return firstName;
	}
	
	public void setvRoot(String vRoot) {
		this.vRoot = vRoot;
	}
	public String getvRoot() {
		return vRoot;
	}
	
	public void setUserType(String userType) {
		this.userType = userType;
	}
	public String getUserType() {
		return userType;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getEmail() {
		return email;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getToken() {
		return token;
	}

}
