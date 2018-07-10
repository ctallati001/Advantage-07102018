package com.dd.advantage.config.common;

import org.springframework.stereotype.Component;

import com.dd.advantage.model.entity.Users;
@Component
public class BhThreadLocal {

	private static ThreadLocal<String> txId = new ThreadLocal<String>();
    
    private static ThreadLocal<String> userName = new ThreadLocal<String>();
    
    private static ThreadLocal<String> roleName = new ThreadLocal<String>();
    
    private static ThreadLocal<Users> profile = new ThreadLocal<Users>();
    
    private static ThreadLocal<String> sessionId = new ThreadLocal<String>();
    
    public static String getTxId() {
        return txId.get();
    }

    public static void setTxId(String txIdStr) {
        txId.set(txIdStr);
    }

    public static void setUserName(String userNameVal) {
        userName.set(userNameVal);
    }
    
    public static String getUserName() {
        return userName.get();
    }

	public static Users getProfile() {
		return profile.get();
	}

	public static void setProfile(Users profileObj) {
		profile.set(profileObj);
	}

	public static void flushAll() {
		setTxId("");
		setUserName("");
		setProfile(null);
	}

	public static String getRoleName() {
		return roleName.get();
	}

	public static void setRoleName(String roleNameObj) {
		roleName.set(roleNameObj);
	}	
	
	public static void setSessionId(String sessionID) {
		sessionId.set(sessionID);
	}
	public static String getSessionId() {
		return sessionId.get();
	}
}
