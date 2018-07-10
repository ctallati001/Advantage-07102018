package com.dd.advantage.response;

public class Response {
	private int status;
	private String token;
	private String advantageURL;
	private String message;
	
	
	public void setMessage(String message) {
		this.message = message;
	}
	public String getMessage() {
		return message;
	}
	public void setAdvantageURL(String advantageURL) {
		this.advantageURL = advantageURL;
	}
	public String getAdvantageURL() {
		return advantageURL;
	}
	public void setToken(String token) {
		this.token = token;
	}
	public String getToken() {
		return token;
	}

	public void setStatus(int status) {
		this.status = status;
	}
	public int getStatus() {
		return status;
	}
	

}
