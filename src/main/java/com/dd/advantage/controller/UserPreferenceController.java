package com.dd.advantage.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.dd.advantage.model.entity.Users;
import com.dd.advantage.service.UserInfoService;

@RestController
@RequestMapping(value = "/preference", produces = MediaType.APPLICATION_JSON_VALUE)
public class UserPreferenceController {
	
	@Autowired
	UserInfoService userInfoService;
	
	@RequestMapping(value = "/getlistUsers", method = RequestMethod.GET)
	@ResponseBody
	public List<Users>  getListOfUser() {
	
		return  userInfoService.getByList();
	}

}
