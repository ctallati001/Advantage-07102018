package com.dd.advantage.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.dd.advantage.model.entity.Session;

@RepositoryRestResource
public interface SessionRepository extends JpaRepository<Session, Long>, JpaSpecificationExecutor<Session> {
  
     Session findByUserId(long id);
}
