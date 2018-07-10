package com.dd.advantage.service.impl;

import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dd.advantage.dao.FilterTableRepository;
import com.dd.advantage.model.entity.AssetFilter;
import com.dd.advantage.model.entity.FilterTable;
import com.dd.advantage.service.FilterTableService;

@Service
public class FilterTableServicesImpl implements FilterTableService {
	
	@Autowired
	FilterTableRepository filterTableRepository;
	
	@PersistenceContext	
	private EntityManager entityManager;	

	@Override
	public List<FilterTable> getAllAssetFilter() {
		// TODO Auto-generated method stub
		List<FilterTable> flst=(List<FilterTable>)filterTableRepository.findAll();
		System.out.println(flst.size());
		return flst;
	}

	@Override
	public int saveFilterTable(FilterTable filterTable) {
		
		/*String hql = "FROM FilterTable  ftt ORDER BY  ftt.idval DESC";
		@SuppressWarnings("unchecked")
		List<FilterTable> lstAM=(List<FilterTable>)entityManager.createQuery(hql).getResultList();
		FilterTable ftb=(FilterTable)lstAM.get(0);
		String fnameDtl=filterTable.getfName()+ftb.getIdval();
		System.out.println(ftb.getIdval()+"--------size------------------"+fnameDtl);
		*/
		
		FilterTable ft=new FilterTable();
		ft.setfName(filterTable.getfName());
		ft.setUserName(filterTable.getUserName());
		ft.setFilterData(filterTable.getFilterData());
		//ft.setActiveFlag(true);
	//	ft.setCrDate(new Date());
		
		filterTableRepository.save(ft);
		
		return 0;
	}

}
