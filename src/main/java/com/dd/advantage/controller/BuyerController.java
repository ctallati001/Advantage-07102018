package com.dd.advantage.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.dd.advantage.request.DDLoginRequest;
import com.dd.advantage.response.Response;
import com.dd.advantage.service.DDLoginService;

@RestController
@RequestMapping("/buyer")
@CrossOrigin("*")
public class BuyerController {
  
	
	
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
	
	
	@RequestMapping(value="/{vRoot}",method = RequestMethod.GET)
	@ResponseBody
    void getDDPage(@PathVariable("vRoot") String vRoot,HttpServletRequest request, HttpServletResponse response)throws Exception {
		Response respo = new Response();
		String pathValue = request.getRequestURI();
		String redirectURL = "/#" + pathValue;
		response.sendRedirect(redirectURL);
		
		//respo = dDLoginService.getLoginInformation(ddRequest);
//		
//		if(userType.equals(Constants.USER_TYPE_I)){
//			response.sendRedirect("http://localhost:8585/#/dd");
//		}else if(userType.equals(Constants.USER_TYPE_C)){
//			response.sendRedirect("http://localhost:8585/#/oracle.rbc");
//		}
//		if(userType.equals(Constants.USER_TYPE_I)){
//		response.sendRedirect("http://localhost:8585/#/dd");
//	}else if(userType.equals(Constants.USER_TYPE_C)){
//		response.sendRedirect("http://localhost:8585/#/oracle-rbc");
//	}
	}
	
//	@RequestMapping(method = RequestMethod.POST)
//	@ResponseBody
//    Response getDDPage(@RequestBody DDLoginRequest request ) {
//		Response response = new Response();
//		response = dDLoginService.getLoginInformation(request);
//		return response;
//		
//	}
}
