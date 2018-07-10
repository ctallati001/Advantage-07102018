package com.dd.advantage.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.dd.advantage.config.common.BhThreadLocal;
import com.dd.advantage.model.entity.Users;
import com.dd.advantage.request.DDLoginRequest;
import com.dd.advantage.response.Response;

@RestController
public class LoginController {

	@RequestMapping(value = "/profile", method = RequestMethod.GET)
	Users getProfile() {
		return BhThreadLocal.getProfile();
	}

	@RequestMapping(value = "/signout", method = RequestMethod.GET)
	void logout(HttpServletRequest request, HttpServletResponse response) throws IOException {
		HttpSession session = request.getSession(false);
		SecurityContextHolder.clearContext();
		if (session != null) {
			session.invalidate();
		}
		response.sendRedirect("/#/login");
	}
	
	@RequestMapping(value = "/internal", method = RequestMethod.GET)
	void internal(HttpServletRequest request, HttpServletResponse response) throws IOException {
		Response respo = new Response();
		String pathValue = request.getRequestURI();
		System.out.println("1 "+pathValue);
		
		String redirectURL = "/#" + pathValue;
		System.out.println("2 >>>"+redirectURL);
		response.sendRedirect(redirectURL);
		//response.sendRedirect("/internal");
	}
	
	@RequestMapping(value = "/tokenCheck", method = RequestMethod.GET)
	@ResponseBody
	DDLoginRequest tokenCheck(HttpServletRequest request, HttpServletResponse response) throws IOException {
		
		HttpSession session = request.getSession();
		System.out.println("tokenCheck>>> "+session);
		DDLoginRequest ddrq=(DDLoginRequest)request.getSession().getAttribute("ddreq");
		
		if(ddrq!=null)
		{
			System.out.println("2xxxxx>>>"+ddrq.getFirstName());
		}
		
		return ddrq;
	}
	@RequestMapping(value = "/sessionValue", method = RequestMethod.GET)
	void sessionValue(HttpServletRequest request, HttpServletResponse response) throws IOException {
		
		String token =request.getParameter("token");
		String userType =request.getParameter("userType");
		String vRoot =request.getParameter("vRoot");
		String firstName =request.getParameter("firstName");
		String lastName =request.getParameter("lastName");
		String email =request.getParameter("email");
		String deptID =request.getParameter("deptID");
		String status =request.getParameter("status");
		String url =request.getParameter("url");
		
		
		DDLoginRequest reTest=new DDLoginRequest();
		HttpSession session=request.getSession();
		reTest.setToken(token);
		reTest.setUserType(userType);//
		//reTest.setUserType("Internal");//
		reTest.setEmail(email);
		reTest.setvRoot(vRoot);
		reTest.setFirstName(firstName);
		reTest.setLastName(lastName);
		//reTest.setExternalNumber(876);
		//reTest.setDeptID(In.valueOf(obj)deptID);
		//reTest.setDeptName("Webshop");
		//reTest.setLanguage("en-GB");
		//reTest.setOrgID(62528);
		//reTest.setOfficeID(46456);
		
		session.setAttribute("ddreq", reTest);
		DDLoginRequest ddrq=(DDLoginRequest)request.getSession().getAttribute("ddreq");
		
		if(ddrq!=null)
		{
			System.out.println("xxxxx>>>"+ddrq.getFirstName());
		}
		
		System.out.println("token >> "+ token);
		System.out.println("vRoot >> "+ vRoot);
		System.out.println("firstName >> "+ firstName);
		System.out.println("email >> "+ email);
		System.out.println("lastName >> "+ lastName);
		System.out.println("userType ++++++++++++++++>> "+ userType);
		
		System.out.println("status ++++++++++++++++>> "+ status);

		//HttpSession session = request.getSession();
		
		
		if(status.equals("200")) {
			//respon.sendRedirect("http://localhost:8585/#/tokenCheck");
			response.sendRedirect("/#/tokenCheck");

		}else {
			response.sendRedirect("/#/login");

		}
	}
	
	
	
}
