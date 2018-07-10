package com.dd.advantage.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dd.advantage.dao.UserInfoRepository;
import com.dd.advantage.model.entity.Users;
import com.dd.advantage.service.UserInfoService;

@Service
public class UserInfoServiceImpl implements UserInfoService{

    @Autowired 
    UserInfoRepository userInfoRepository;
    
    @Override
    public List<Users> getByList() {
	return (List<Users>) userInfoRepository.findAll();
    }

    @Override
    public Users saveEmpInfo(Users empInfo) {
	return userInfoRepository.save(empInfo);
    }

    @Override
    public Users filterByEmpInfo(String roleId) {
	return userInfoRepository.findByRole(roleId);
    }
    
    @Override
	public Users getEmpInfoByUsername(String username) {
		Users emp =  userInfoRepository.findOneByAaID(username).get();
		return emp;
	}

}
