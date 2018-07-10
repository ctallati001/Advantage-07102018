package com.dd.advantage.config.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Autowired
	private CurrentUserDetailsService currentUserDetailsService;
	
	@Autowired
	private LoginFailedHandler loginFailedHandler;
	
	private static final String[] PUBLIC_ASSETS = {"/bower_components/", "/font-awesome/", "/css/", "/img/", "/js/", "/lib/", "/skin/",
			"/templates/", "/login", "/","/signout","/profile"};
	
	@Override
	public void configure(HttpSecurity httpSecurity) throws Exception {
		httpSecurity.headers().frameOptions().sameOrigin();

		httpSecurity.httpBasic().and()
				.authorizeRequests().antMatchers(PUBLIC_ASSETS).permitAll()
				.and()
				/*.authorizeRequests().antMatchers("/togglz","/togglz/","/togglz/*").hasAuthority("admin")
				.and()
				.authorizeRequests().antMatchers("/*").hasAnyRole("user", "admin")
				.and()
				.authorizeRequests().antMatchers("/admin/").hasAnyRole("admin")
				.and()
				.authorizeRequests().antMatchers("/report").hasAnyRole("user", "admin")
				.and()
		       	.authorizeRequests().antMatchers("/h2-console/**").permitAll()
				.and()
				.formLogin().loginPage("/doLogin").defaultSuccessUrl("/#/landing").failureHandler(loginFailedHandler).permitAll()*/
				//.and()
				.logout().permitAll();
		httpSecurity.csrf().disable();
	}

	@Override
	public void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(currentUserDetailsService);
	}
}
