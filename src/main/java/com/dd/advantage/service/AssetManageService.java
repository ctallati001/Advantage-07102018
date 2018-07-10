package com.dd.advantage.service;

import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.dd.advantage.model.entity.AssetFilter;
import com.dd.advantage.model.entity.AssetManage;

public interface AssetManageService {
    
	AssetManage saveAsset(AssetManage assetManage);
	List<AssetManage> getListOfAsset();
 	List<AssetManage> getListOfManageAssetsByDate(String[] dateArr);
 	int saveAssetFilter(AssetFilter assetFilter);
 	List<AssetFilter> getAllAssetFilter();
 	
 	
 	
 	int deleteGridValue(String []deleteVal);

   
}
