package com.dd.advantage.model.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "asset_manage")
public class AssetManage {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id")
	private long id;

	@Column(name = "asset_id")
	private String assetId;
	
	@Column(name = "manufacture_part_number")
	private String manufactureNo;
	
	@Column(name = "install")
	private String install;
	
	
	@Column(name = "eol_annoucement")
	private String eolAnnoucement;
	
	@Column(name = "serial_no")
	private String serialNo;
	
	@Column(name = "po_number")
	private String poNumber;
	
	@Column(name = "install_date")
	private Date installDate;
   
	@Column(name = "endofsale")
	private Date endofSale;
	
	@Column(name = "end_date")
	private Date endDate;
	
	@Column(name = "eol_date")
	private Date endofLife;
	

	
	
	public void setAssetId(String assetId) {
		this.assetId = assetId;
	}
	public String getAssetId() {
		return assetId;
	}
	public void setId(long id) {
		this.id = id;
	}
	public long getId() {
		return id;
	}
	
	public void setManufactureNo(String manufactureNo) {
		this.manufactureNo = manufactureNo;
	}
	public String getManufactureNo() {
		return manufactureNo;
	}
	
	public void setInstall(String install) {
		this.install = install;
	}
	public String getInstall() {
		return install;
	}
	
	public void setEndofSale(Date endofSale) {
		this.endofSale = endofSale;
	}
	
	public Date getEndofSale() {
		return endofSale;
	}
	
	public void setEolAnnoucement(String eolAnnoucement) {
		this.eolAnnoucement = eolAnnoucement;
	}
	public String getEolAnnoucement() {
		return eolAnnoucement;
	}
	public void setSerialNo(String serialNo) {
		this.serialNo = serialNo;
	}
	public String getSerialNo() {
		return serialNo;
	}
	public void setPoNumber(String poNumber) {
		this.poNumber = poNumber;
	}
	public String getPoNumber() {
		return poNumber;
	}
	public void setInstallDate(Date installDate) {
		this.installDate = installDate;
	}
	public Date getInstallDate() {
		return installDate;
	}
	public Date getEndDate() {
		return endDate;
	}
	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}
	public Date getEndofLife() {
		return endofLife;
	}
	public void setEndofLife(Date endofLife) {
		this.endofLife = endofLife;
	}
}
