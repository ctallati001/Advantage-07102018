package com.dd.advantage.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.dd.advantage.model.entity.AssetManage;

@RepositoryRestResource
public interface AssetManageRepository extends JpaRepository<AssetManage, Long>, JpaSpecificationExecutor<AssetManage> {

	//@Modifying
 	//@Query("delete from AssetManage u where u.assetId in ?1")
	//int deleteGridValue(String[] deleteVal);


	
}
