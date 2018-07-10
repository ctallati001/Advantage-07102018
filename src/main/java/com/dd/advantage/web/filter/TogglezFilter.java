package com.dd.advantage.web.filter;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

import org.togglz.core.user.FeatureUser;
import org.togglz.core.user.SimpleFeatureUser;
import org.togglz.core.user.thread.ThreadLocalUserProvider;

//TODO Make this a spring web filter to set username and role
public class TogglezFilter {

	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {

		String username = "testUser";
		boolean isAdmin = true;

		FeatureUser user = new SimpleFeatureUser(username, isAdmin);

		ThreadLocalUserProvider.bind(user);
		try {
			chain.doFilter(request, response);
		} finally {
			ThreadLocalUserProvider.release();
		}

	}
}
