package com.dd.advantage.model.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="filtertable")
public class FilterTable {
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "Id")
	private long idval;
	
	@Column(name = "name")
	private String fName;
	
	@Column(name = "user")
	private String userName;
	/*
	@Column(name = "createdDate")
	private Date crDate;
	
	@Column(name = "isActive")
	private Boolean activeFlag;
	*/
	@Column(name = "filter")
	private String filterData;
	
	



	public String getFilterData() {
		return filterData;
	}

	public void setFilterData(String filterData) {
		this.filterData = filterData;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}
	/*

	public Date getCrDate() {
		return crDate;
	}

	public void setCrDate(Date crDate) {
		this.crDate = crDate;
	}

	public Boolean getActiveFlag() {
		return activeFlag;
	}

	public void setActiveFlag(Boolean activeFlag) {
		this.activeFlag = activeFlag;
	}
*/
	public FilterTable() {
		super();
	}

	public long getIdval() {
		return idval;
	}

	public void setIdval(long idval) {
		this.idval = idval;
	}

	public String getfName() {
		return fName;
	}

	public void setfName(String uName) {
		this.fName = uName;
	}
	

}
