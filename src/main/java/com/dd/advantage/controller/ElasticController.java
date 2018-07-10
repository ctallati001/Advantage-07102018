package com.dd.advantage.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.dd.advantage.llelastic.NetClientGet;

@RestController
@RequestMapping("/elastic")
@CrossOrigin("*")
public class ElasticController {

	
	@RequestMapping(value="/get/{id}",method = RequestMethod.GET)
	@ResponseBody
	public String create(@PathVariable("id") String id)throws Exception {
		NetClientGet ncG = new NetClientGet();
		String arr[] = new String[2];
		arr[0] = "Manufacturer";
		arr[1] = "Juniper";
		String responseObj = ncG.main(arr);
		return  responseObj;
	}
}
