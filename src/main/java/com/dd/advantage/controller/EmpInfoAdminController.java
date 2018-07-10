package com.dd.advantage.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dd.advantage.model.entity.Users;
import com.dd.advantage.service.UserInfoService;

public class EmpInfoAdminController {

	@RestController
	@RequestMapping(value = "/admin", produces = MediaType.APPLICATION_JSON_VALUE)
	public class EmpInfoController {
	    @Autowired
	    UserInfoService userInfoService;
	    
	    @RequestMapping("/getempinfo")
		public List<Users> getAllEmpInfo() {
			return userInfoService.getByList();
		}
}
}
