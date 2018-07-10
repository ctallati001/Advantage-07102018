package com.dd.advantage.config.security;

import java.util.Date;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.jboss.logging.MDC;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.dd.advantage.config.common.BhThreadLocal;
import com.dd.advantage.dao.SessionRepository;
import com.dd.advantage.dao.UserInfoRepository;
import com.dd.advantage.model.entity.Session;
import com.dd.advantage.model.entity.Users;
import com.dd.advantage.service.UserInfoService;

@Component
public class AuthInterceptor implements HandlerInterceptor {

	Logger log = LogManager.getLogger(this.getClass());

	public static final int MAX_IDLE_TIME = 3000;
	@Autowired
	UserInfoService userService;
	
	@Autowired 
    SessionRepository sessionRepository;
	
	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object object, Exception arg3)
			throws Exception {
		MDC.put("txid", "");
		MDC.put("username", "");
		BhThreadLocal.flushAll();
	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object object, ModelAndView model)
			throws Exception {}

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object object) throws Exception {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if(auth != null && auth.getPrincipal().toString() != null && !auth.getPrincipal().toString().equalsIgnoreCase("anonymousUser")){
			org.springframework.security.core.userdetails.User user = (org.springframework.security.core.userdetails.User)auth.getPrincipal();
			String username = user.getUsername();
			Users profile = userService.getEmpInfoByUsername(username);
			
			Session loggedUser = sessionRepository.findByUserId(profile.getUserId());
			Session session =  new Session();
			if(loggedUser == null){
			profile.setUserName( profile.getFirstName()+" " +profile.getLastName());
			session.setCreationTime(new Date());
			session.setMaxInactiveInterval(MAX_IDLE_TIME);
			session.setSessionId(request.getSession(true).getId());
			session.setPrincipalName(profile.getUserName());
			session.setUser_id(profile.getUserId());
			Date expiryTime = new Date(new Date().getTime() + 1*3600*3*1000);
			session.setExpiryTime(expiryTime);
			profile.setSession(session);
			sessionRepository.save(session);
			}else{
				if(loggedUser.getExpiryTime().after(new Date())){
					profile.setUserName( profile.getFirstName()+" " +profile.getLastName());
					profile.setSession(loggedUser);
				}else{
					loggedUser.setSessionId(request.getSession(true).getId());
					Date expiryTime = new Date(new Date().getTime() + 1*3600*3*1000);
					loggedUser.setExpiryTime(expiryTime);
					loggedUser.setCreationTime(new Date());
					sessionRepository.save(loggedUser);
					profile.setUserName( profile.getFirstName()+" " +profile.getLastName());
					profile.setSession(loggedUser);
				}
				
			}
			
			
			//Set transaction Id
			String txId = UUID.randomUUID().toString();
			String sessionId = request.getSession(true).getId();
			BhThreadLocal.setTxId(txId);
		   MDC.put("txid", txId);
			
		   BhThreadLocal.setSessionId(sessionId);
		   MDC.put("sessionId", sessionId);
				
			//Set user name
			BhThreadLocal.setUserName(username);
			MDC.put("username", username);
	
			//Set role
			BhThreadLocal.setRoleName(profile.getRole());
			
			//Set the profile object
			BhThreadLocal.setProfile(profile);
			log.info("Before process request" + username + " for url " + request.getRequestURL());	
		}
		return true;
	}

}