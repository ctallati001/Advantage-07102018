package com.dd.advantage.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.dd.advantage.model.entity.Users;
import com.dd.advantage.service.UserInfoService;

@RestController
@RequestMapping(value = "/profile", produces = MediaType.APPLICATION_JSON_VALUE)
public class EmpInfoController {
    @Autowired
    UserInfoService userInfoService;
    @RequestMapping(value="/save" )
	public Users saveEmpInfo() {
	Users c=new Users();
	
		return  userInfoService.saveEmpInfo(c);
	}
    
    @RequestMapping(value="/empInfoFilter/{username}",method = RequestMethod.GET)
   	public Users empInfoFilter(@PathVariable("username") String username) {
   	
   		return  userInfoService.getEmpInfoByUsername(username);
   	}
    
    @RequestMapping(method = RequestMethod.POST, value = "/updateEmpInfo")
	public Users updateEmpInfo(@RequestBody Users empInfo){
	return userInfoService.saveEmpInfo(empInfo);
		}
	
}
