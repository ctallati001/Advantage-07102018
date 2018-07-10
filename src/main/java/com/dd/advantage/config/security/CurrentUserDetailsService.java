package com.dd.advantage.config.security;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.dd.advantage.config.common.BhThreadLocal;
import com.dd.advantage.model.entity.Users;
import com.dd.advantage.service.UserInfoService;

@Service
public class CurrentUserDetailsService implements UserDetailsService {
	
    private final UserInfoService userService;
    
    
    @Autowired
    public CurrentUserDetailsService(UserInfoService userService) {
        this.userService = userService;
    }

    @Override
    public UserDetails loadUserByUsername(String username ) throws UsernameNotFoundException {
    	
    	
    	Users userObj = userService.getEmpInfoByUsername(username);
        
        if(userObj!=null && StringUtils.isNotBlank(userObj.getAaID())){
        	org.springframework.security.core.userdetails.User springUser = new org.springframework.security.core.userdetails.User(
        			userObj.getAaID(), userObj.getPassword(), true, true, true, 
                    true, AuthorityUtils.createAuthorityList(userObj.getRole()));
        	return springUser;
        }
        throw new UsernameNotFoundException("Not Authenticated");        
    }


public String getSessionIdDetails(HttpServletRequest request,HttpServletResponse response){
	String sessionID = request.getSession(true).getId();
	return sessionID;
}

}



