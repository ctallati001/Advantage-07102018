package com.dd.advantage.config.togglez.repository;

import javax.annotation.Resource;
import javax.sql.DataSource;

import org.springframework.stereotype.Component;
import org.togglz.core.Feature;
import org.togglz.core.manager.TogglzConfig;
import org.togglz.core.repository.StateRepository;
import org.togglz.core.repository.jdbc.JDBCStateRepository;
import org.togglz.core.user.UserProvider;

//@Component Disabled for now
public class DatabaseTogglzConfiguration implements TogglzConfig {

    @Resource(mappedName = "jboss/datasources/ExampleDS")
    private DataSource dataSource;

    /* ..... */ 

    @Override
    public StateRepository getStateRepository() {
        return new JDBCStateRepository(dataSource);
    }

	@Override
	public Class<? extends Feature> getFeatureClass() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public UserProvider getUserProvider() {
		// TODO Auto-generated method stub
		return null;
	}

}
