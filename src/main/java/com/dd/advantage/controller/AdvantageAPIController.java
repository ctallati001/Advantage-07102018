package com.dd.advantage.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.net.InetAddress;
import java.util.Scanner;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.dd.advantage.request.DDLoginRequest;
import com.dd.advantage.response.Response;
import com.dd.advantage.service.DDLoginService;


	@RestController
	@RequestMapping("/AdvantageAPI")
	@CrossOrigin("*")
	public class AdvantageAPIController {
	  
		@Autowired
		private DDLoginService dDLoginService;
		
		/*@RequestMapping(value="",method = RequestMethod.GET)
		@ResponseBody
	    void getDDPage(@RequestBody DDLoginRequest ddRequest ,HttpServletRequest request, HttpServletResponse response)throws Exception {
			Response respo = new Response();
			//respo = dDLoginService.getLoginInformation(ddRequest);
			response.sendRedirect("http://localhost:8585/dd");
			//return respo;
		}
		*/
		
		
//		@RequestMapping(value="/{vRoot}",method = RequestMethod.GET)
//		@ResponseBody
//	    void getDDPage(@PathVariable("vRoot") String vRoot,HttpServletRequest request, HttpServletResponse response)throws Exception {
//			Response respo = new Response();
//			String pathValue = request.getRequestURI();
//			String redirectURL = "/#" + pathValue;
//			response.sendRedirect(redirectURL);
			
			//respo = dDLoginService.getLoginInformation(ddRequest);
//			
//			if(userType.equals(Constants.USER_TYPE_I)){
//				response.sendRedirect("http://localhost:8585/#/dd");
//			}else if(userType.equals(Constants.USER_TYPE_C)){
//				response.sendRedirect("http://localhost:8585/#/oracle.rbc");
//			}
//			if(userType.equals(Constants.USER_TYPE_I)){
//			response.sendRedirect("http://localhost:8585/#/dd");
//		}else if(userType.equals(Constants.USER_TYPE_C)){
//			response.sendRedirect("http://localhost:8585/#/oracle-rbc");
//		}
//		}
		
		@RequestMapping(method = RequestMethod.POST)
		@ResponseBody
	    Response getDDPage(@RequestBody DDLoginRequest request, HttpServletRequest req,HttpServletResponse res ) {
			//System.out.println("------------------");
			Response response = new Response();
			//HttpSession session=req.getSession();
			response = dDLoginService.getLoginInformation(request);
			//session.setAttribute("ddreq", request);
			
			String strUrl="https://advantage.dimensiondata.com/sessionValue?token="+request.getToken()
			+"&userType="+request.getUserType()
			+"&vRoot="+request.getvRoot()
			+"&firstName="+request.getFirstName()
			+"&lastName="+request.getLastName()
			+"&email="+request.getEmail()
			+"&deptID="+request.getDeptID()
			+"&deptName="+request.getDeptName()
			+"&status="+response.getStatus()
			+"&url="+response.getAdvantageURL();
		
			
			response.setAdvantageURL(strUrl);
		   
			//response.setAdvantageURL("https://advantage.dimensiondata.com/sessionValue?jsessionID=40A3F56E-9C0E-49D0-843D-631AA03F9873&userType=internal");
			return response;
			
		}
	/*	@RequestMapping(method = RequestMethod.POST)
		@ResponseBody
	    Response  getDDPage(@RequestBody DDLoginRequest request, HttpServletRequest req, HttpServletResponse respon)throws Exception {
			
			System.out.println("GETADVANTAGEURL ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"+request.getAdvantageURL());
			System.out.println("GETTOKEN++++++++++++++++++++"+request.getToken());
			System.out.println("GETUSERTYPE+++++++++++++++++++++++++++++++++++++++++++++++++++"+request.getUserType());
			
			//@RequestBody DDLoginRequest request
			//DDLoginRequest reTest=new DDLoginRequest();
			HttpSession session=req.getSession();
//			reTest.setToken("D42D9C09-AFB3-4215-9C98-A6A8E46C8A44");
//			reTest.setUserType("Client");//
//			//reTest.setUserType("Internal");//
//			reTest.setEmail("Demouser@dimensiondata.com");
//			reTest.setvRoot("JPOracle");
//			reTest.setFirstName("demo");
//			reTest.setLastName("demo");
//			reTest.setExternalNumber(876);
//			reTest.setDeptID(153132);
//			reTest.setDeptName("Webshop");
//			reTest.setLanguage("en-GB");
//			reTest.setOrgID(62528);
//			reTest.setOfficeID(46456);
//			//session.setAttribute("ddreq", reTest);
			session.setAttribute("ddreq", request);
			DDLoginRequest ddrq=(DDLoginRequest)req.getSession().getAttribute("ddreq");
			
			if(ddrq!=null)
			{
				System.out.println("xxxxx>>>"+ddrq.getFirstName());
			}
			
			Response response = new Response();
			response = dDLoginService.getLoginInformation(request);//ORIGINAL LINK RESPONSE 
			//response = dDLoginService.getLoginInformation(reTest);//TESTING 
			System.out.println("RESPONSEGETADVANTAGE+++++++++++++++++++++++++++++++++++++++++++++++++++++++"+response.getAdvantageURL());
			if(response.getStatus()==200) {
				ddrq.setAdvantageURL(response.getAdvantageURL());
				ddrq.setStatus(response.getStatus());
				//respon.sendRedirect("/#/tokenCheck");
				respon.sendRedirect("https://google.com");
			}else {
				respon.sendRedirect("/#/login");
			}
			response.setAdvantageURL("https://google.com");
			return response;
				
		}*/
	 
}
