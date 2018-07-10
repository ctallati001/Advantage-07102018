package com.dd.advantage.model.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "session")
public class Session {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id")
	private long id;

	@Column(name = "session_id")
	private String sessionId;

	@Column(name = "creation_time")
	@Temporal(TemporalType.TIMESTAMP)
	private Date creationTime;

	@Column(name = "last_access_time")
	@Temporal(TemporalType.TIMESTAMP)
	private Date lastAccessTime;

	@Column(name = "max_inactive_interval")
	private long maxInactiveInterval;

	@Column(name = "expiry_time")
	@Temporal(TemporalType.TIMESTAMP)
	private Date expiryTime;

	@Column(name = "principalName")
	private String principalName;
	
	@Column(name = "user_id")
	private long userId;

	
	public void setUser_id(long userId) {
		this.userId = userId;
	}
	
	public long getUserId() {
		return userId;
	}
	public void setId(long id) {
		this.id = id;
	}
	public long getId() {
		return id;
	}

	public void setSessionId(String sessionId) {
		this.sessionId = sessionId;
	}

	public String getSessionId() {
		return sessionId;
	}

	public void setCreationTime(Date creationTime) {
		this.creationTime = creationTime;
	}

	public Date getCreationTime() {
		return creationTime;
	}

	public void setLastAccessTime(Date lastAccessTime) {
		this.lastAccessTime = lastAccessTime;
	}

	public Date getLastAccessTime() {
		return lastAccessTime;
	}

	public void setMaxInactiveInterval(long maxInactiveInterval) {
		this.maxInactiveInterval = maxInactiveInterval;
	}

	public long getMaxInactiveInterval() {
		return maxInactiveInterval;
	}

	public void setExpiryTime(Date expiryTime) {
		this.expiryTime = expiryTime;
	}

	public Date getExpiryTime() {
		return expiryTime;
	}

	public void setPrincipalName(String principalName) {
		this.principalName = principalName;
	}

	public String getPrincipalName() {
		return principalName;
	}

}
