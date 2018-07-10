package com.dd.advantage.web.util;

import java.util.StringTokenizer;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

import com.dd.advantage.model.common.StringWrapper;

@Component
public class WebUtils {

	private static final String PRIVATE_IPADDRESS_REGEX = "(^127.0.0.1)|(^10..*)|(^172.1[6-9]..*)|(^172.2[0-9]..*)|(^172.3[0-1]..*)|(^192.168..*)";

	Pattern pattern = Pattern.compile(PRIVATE_IPADDRESS_REGEX);

	public StringWrapper getIpAddress(HttpServletRequest request) {
		String ip = null;
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("WL-Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("HTTP_CLIENT_IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("HTTP_X_FORWARDED_FOR");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("x-forward-for");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getRemoteAddr();
		}
		ip = cleanupIpAddress(ip);
		return new StringWrapper(ip);
	}

	public String cleanupIpAddress(String ip) {
		String retVal = null;
		if (StringUtils.isNotBlank(ip) && ip.contains(",")) {
			StringTokenizer stk = new StringTokenizer(ip, ",");
			String currIp = null;
			while (stk.hasMoreTokens()) {
				currIp = stk.nextToken().trim();
				Matcher matcher = pattern.matcher(currIp);
				if (!matcher.matches()) {
					retVal = currIp;
				}
			}
			// If all ip address are filtered out, use the last one
			if (StringUtils.isBlank(retVal)) {
				retVal = currIp;
			}
		} else {
			retVal = ip;
		}
		return retVal;
	}
}
