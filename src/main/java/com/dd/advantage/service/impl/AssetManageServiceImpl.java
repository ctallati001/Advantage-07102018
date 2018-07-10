package com.dd.advantage.service.impl;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dd.advantage.dao.AssetFilterRepository;
import com.dd.advantage.dao.AssetManageRepository;
import com.dd.advantage.model.entity.AssetFilter;
import com.dd.advantage.model.entity.AssetManage;
import com.dd.advantage.service.AssetManageService;

@Service
public class AssetManageServiceImpl implements AssetManageService{

    @Autowired 
    AssetManageRepository assetManageRepository;
    
    @Autowired 
    AssetFilterRepository assetFilterRepository;
    
    
    @PersistenceContext	
	private EntityManager entityManager;	


	@Override
	public AssetManage saveAsset(AssetManage assetManage) {
		AssetManage as = new AssetManage();
		as.setAssetId(assetManage.getAssetId());
		as.setEolAnnoucement(assetManage.getEolAnnoucement());
		as.setInstall(assetManage.getInstall());
		as.setInstallDate(assetManage.getInstallDate());
		as.setPoNumber(assetManage.getPoNumber());
		as.setSerialNo(assetManage.getSerialNo());
		as.setEndofSale(assetManage.getEndofSale());
		as.setManufactureNo(assetManage.getManufactureNo());
		return assetManageRepository.save(as);
	}

	@Override
	public List<AssetManage> getListOfAsset() {
		return assetManageRepository.findAll();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<AssetManage> getListOfManageAssetsByDate(String[] dateVale) {
		
		List<AssetManage> lstAM=new ArrayList<AssetManage>();
		Date dt=new Date();
		String output=null;
		Date startDt=new Date();
		Date endDt=new Date();
		Calendar c = Calendar.getInstance();
		String hql = "";
		SimpleDateFormat sdf=new  SimpleDateFormat("dd/MM/yyyy");
		System.out.println(dateVale.length);
		if(("Expired".equals(dateVale[0].toString())))
		{
			if(!("r1".equals(dateVale[2].toString())) && !("r2".equals(dateVale[2].toString()))) {
				try {
					startDt=sdf.parse(dateVale[1].toString());
					endDt=sdf.parse(dateVale[2].toString());
				} catch (ParseException e) {
					e.printStackTrace();
				}
			}
			
			if(("r1".equals(dateVale[2].toString())) || ("r2".equals(dateVale[2].toString()))) {
				try 
				{
					dt=sdf.parse(dateVale[1].toString());
					c.setTime(dt); // Now use today date.
					if("r1".equals(dateVale[2].toString())) {
						c.add(Calendar.DATE, 30); // Adding 30 days
					}
					if("r2".equals(dateVale[2].toString())) {
						c.add(Calendar.DATE, 90); // Adding 90 days		
						}
					output = sdf.format(c.getTime());
					System.out.println("--"+output);
					startDt=dt;
					endDt=c.getTime();
					
				} catch (ParseException e) {
					e.printStackTrace();
				}					
			}
		
			if(("edate".equals(dateVale[3].toString())))
			{
				 hql = "FROM AssetManage as atcl WHERE atcl.endDate >= ? and atcl.endDate <= ?";
			}
			else
			{
				 hql = "FROM AssetManage as atcl WHERE atcl.endofLife >= ? and atcl.endofLife <= ?";
			}
			lstAM=(List<AssetManage>)entityManager.createQuery(hql).setParameter(1, startDt).setParameter(2, endDt).getResultList();
			System.out.println("size------------------"+lstAM.size());
		}
		else
		{
			hql = "FROM AssetManage";
			lstAM=(List<AssetManage>)entityManager.createQuery(hql).getResultList();
			System.out.println("size------------------"+lstAM.size());
		}		 
		return lstAM;
	}

	@Override
	public int saveAssetFilter(AssetFilter assetFilter) {
		AssetFilter as=new AssetFilter();
		as.setId(1);
		as.setIsActiveFlag(true);
		as.setFilterName(assetFilter.getFilterName());
		as.setFilterData(assetFilter.getFilterData());
		as.setUserName(assetFilter.getUserName());
		as.setCreatedDate(new Date());
		
		System.out.println("assetFilter>>"+assetFilter.getFilterName());
		assetFilterRepository.save(as);
		return 0;
	}

	@Override
	public List<AssetFilter> getAllAssetFilter() {
		
		String hql = "FROM AssetFilter";
		@SuppressWarnings("unchecked")
		List<AssetFilter> lstAM=(List<AssetFilter>)entityManager.createQuery(hql).getResultList();
		System.out.println("size------------------"+lstAM.size());
		return lstAM;//assetFilterRepository.findAll();
	}

	@Override
	@Transactional
	public int deleteGridValue(String[] deleteVal) {

		int deletionCount=0;
		System.out.println(deleteVal[0].toString());
		for(int i=0;i<deleteVal.length;i++)
		{
	Query query=	entityManager.createQuery("DELETE FROM AssetManage as atcl WHERE atcl.assetId in (?)").setParameter(1, deleteVal[i].toString());
				 deletionCount = query.executeUpdate();
				if (deletionCount > 0) {
				System.out.println("Done.."+deletionCount);
				}
		}

		 //assetManageRepository.delete(arg0);
		return deletionCount;
	}
    
   
}
