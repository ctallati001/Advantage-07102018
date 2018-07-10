package com.dd.advantage.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.dd.advantage.model.entity.Users;
import com.google.common.base.Optional;

@RepositoryRestResource
public interface UserInfoRepository extends JpaRepository<Users, Long>, JpaSpecificationExecutor<Users> {

	Users findByRole(String roleId);

	Optional<Users> findOneByAaID(String aaId);
	Users findByUserId(long userId);
	Users findByAaID(String aaid);

}
