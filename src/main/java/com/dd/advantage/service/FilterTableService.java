package com.dd.advantage.service;

import java.util.List;

import com.dd.advantage.model.entity.FilterTable;

public interface FilterTableService {
	
 	List<FilterTable> getAllAssetFilter();
 	int saveFilterTable(FilterTable filterTable);


}
