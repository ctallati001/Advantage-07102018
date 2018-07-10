package com.dd.advantage.controller;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.dd.advantage.request.DDLoginRequest;
import com.dd.advantage.response.Response;


@Controller
@RequestMapping("/seller")
@CrossOrigin("*")	
	
public class SellerController {
	
	@RequestMapping(value="/dd", method=RequestMethod.GET)
	@ResponseBody
    public void seller(HttpServletRequest request, HttpServletResponse response) throws IOException {
		
		Cookie[] cookies = request.getCookies();
		System.out.println( "cookies.length++++++++++++++++++++++"+cookies.length);
		if (cookies != null) {
			
		      for (int i = 0; i < cookies.length; i++) {
		    	  System.out.println( "cookies1++++++++++++++++++++++"+cookies[i].getValue());
		    	  
		        if (cookies[i].getName().equals("sessionid")) {
		          System.out.println( "cookies2++++++++++++++++++++++"+cookies[i].getValue());
		          break;
		        }
		      }
		    }
		
		DDLoginRequest ddrq=(DDLoginRequest)request.getSession().getAttribute("ddreq");
		
		if(ddrq!=null)
		{
			System.out.println("+++++++++++++++++++++++++++++xxxxx1>>>"+ddrq.getFirstName());
		}
		
		Response respo = new Response();
		String pathValue = request.getRequestURI();
		System.out.println("1 "+pathValue);
		
		String redirectURL = "/#" + pathValue;
		System.out.println("2 >>>"+redirectURL);
		response.sendRedirect(redirectURL);
		//response.sendRedirect("dd");
		
    }
	
	
	@RequestMapping(value="/s", method=RequestMethod.GET)
	@ResponseBody
    public void sellerURL(HttpServletRequest request, HttpServletResponse response) throws IOException 
	{
		String pathValue = request.getRequestURI();
		String redirectURL = "/#" + pathValue;
		response.sendRedirect(redirectURL);
    }

}
