package com.dd.advantage.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.dd.advantage.model.entity.AssetFilter;

@RepositoryRestResource
public interface AssetFilterRepository extends JpaRepository<AssetFilter, Long>, JpaSpecificationExecutor<AssetFilter> {

}
