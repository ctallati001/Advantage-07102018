package com.dd.advantage.service;

import java.util.List;

import com.dd.advantage.model.entity.Users;

public interface UserInfoService {
    
    List<Users> getByList();
    
    Users saveEmpInfo(Users contactInfo);
    
    Users filterByEmpInfo(String roleId);
    
    Users getEmpInfoByUsername(String username);

}
