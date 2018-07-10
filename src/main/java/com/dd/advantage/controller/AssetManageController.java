package com.dd.advantage.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.dd.advantage.model.entity.AssetFilter;
import com.dd.advantage.model.entity.AssetManage;
import com.dd.advantage.model.entity.FilterTable;
import com.dd.advantage.service.AssetManageService;
import com.dd.advantage.service.FilterTableService;

@RestController
@RequestMapping(value = "/asset", produces = MediaType.APPLICATION_JSON_VALUE)
public class AssetManageController {

	@Autowired
	AssetManageService assetManageService;
	
	@Autowired
	FilterTableService filterTableService;
	
	
		@RequestMapping(value = "/save", method = RequestMethod.POST)
		@ResponseBody
		public AssetManage  saveAssept(@RequestBody AssetManage  assetManage) {
		
			return  assetManageService.saveAsset(assetManage);
		}
		
		@RequestMapping(value = "/getlist", method = RequestMethod.GET)
		@ResponseBody
		public List<AssetManage>  getListOfManageAssets() {
		
			return  assetManageService.getListOfAsset();
		}
		
		@RequestMapping(value = "/getlistByDate", method = RequestMethod.POST)
		public @ResponseBody List<AssetManage> getListOfManageAssetsByDate(@RequestBody String []dateVale )
		{
			return assetManageService.getListOfManageAssetsByDate(dateVale);
		}
		
		@RequestMapping(value = "/saveFilterTable", method = RequestMethod.POST)
		public @ResponseBody int saveFilterTable(@RequestBody FilterTable filterTable )
		{
			System.out.println("AssetFilter>> "+filterTable.getfName());
			return filterTableService.saveFilterTable(filterTable);
		}
		
		@RequestMapping(value = "/getAllAssetFilter", method = RequestMethod.POST)
		public @ResponseBody List<AssetFilter> getAllAssetFilter(@RequestBody String user )
		{
			System.out.println("user>> "+user);
			return assetManageService.getAllAssetFilter();
		}
		
		@RequestMapping(value = "/getAllFilterTable", method = RequestMethod.POST)
		public @ResponseBody List<FilterTable> getAllFilterTable()
		{
			System.out.println("user>> ");
			return filterTableService.getAllAssetFilter();
		}
		@RequestMapping(value = "/deleteGridValue", method = RequestMethod.POST)
		public @ResponseBody int deleteGridValue(@RequestBody String []deleteVal )
		{
			System.out.println(deleteVal.length+" "+deleteVal[0]);
			return assetManageService.deleteGridValue(deleteVal);
		}
}
