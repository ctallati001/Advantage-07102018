package com.dd.advantage.service.impl;

import org.springframework.stereotype.Service;

import com.dd.advantage.constant.Constants;
import com.dd.advantage.request.DDLoginRequest;
import com.dd.advantage.response.Response;
import com.dd.advantage.service.DDLoginService;

@Service
public class DDLoginServiceImpl implements DDLoginService{
	
	@Override
	public Response getLoginInformation(DDLoginRequest request) {
		Response result = new Response();
		result = validationQueryForRequest(request);
		if(result.getStatus() == Constants.BAD_REQUEST){
			return result;
		}
		result = responseBuilder(request);
		return result;
	}
	
	public Response validationQueryForRequest(DDLoginRequest request){
		Response response = new Response();
		if(request.getUserType().equals(Constants.USER_TYPE_C)){
		  if(request.getUserType()==null){
			  response.setMessage(Constants.userTypeNotNull);
			  response.setStatus(Constants.BAD_REQUEST);
			  return response;
		  }else if(request.getToken()==null){
			  response.setMessage(Constants.token);
			  response.setStatus(Constants.BAD_REQUEST);
			  return response;
		  }else if(request.getEmail()==null){
			  response.setMessage(Constants.email);
			  response.setStatus(Constants.BAD_REQUEST);
			  return response;
		  }else if(request.getFirstName()==null){
			  response.setMessage(Constants.firstName);
			  response.setStatus(Constants.BAD_REQUEST);
			  return response;
		  }else if(request.getLastName()==null){
			  response.setMessage(Constants.lastName);
			  response.setStatus(Constants.BAD_REQUEST);
			  return response;
		  }else if(request.getDeptName()==null){
			  response.setMessage(Constants.deptName);
			  response.setStatus(Constants.BAD_REQUEST);
			  return response;
		  }else if(request.getvRoot()==null){
			  response.setMessage(Constants.vRoot);
			  response.setStatus(Constants.BAD_REQUEST);
			  return response;
		  }
		  }else if(request.getUserType().equals(Constants.USER_TYPE_I)){
			  if(request.getUserType()==null){
				  response.setMessage(Constants.userTypeNotNull);
				  response.setStatus(Constants.BAD_REQUEST);
				  return response;
		      }else if(request.getToken()==null){
				  response.setMessage(Constants.token);
				  response.setStatus(Constants.BAD_REQUEST);
				  return response;
		      }else if(request.getEmail()==null){
				  response.setMessage(Constants.email);
				  response.setStatus(Constants.BAD_REQUEST);
				  return response;
			  }else if(request.getFirstName()==null){
				  response.setMessage(Constants.firstName);
				  response.setStatus(Constants.BAD_REQUEST);
				  return response;
			  }else if(request.getLastName()==null){
				  response.setMessage(Constants.lastName);
				  response.setStatus(Constants.BAD_REQUEST);
				  return response;
			  }
		  	}
			return response;
	}
	
	
	
	Response responseBuilder(DDLoginRequest request){
		Response response = new Response();
		if(request.getUserType().equals(Constants.USER_TYPE_C)){
			response.setAdvantageURL(Constants.ADV_URL_C+request.getvRoot());
		}else if(request.getUserType().equals(Constants.USER_TYPE_I)){
			response.setAdvantageURL(Constants.ADV_URL_I);
		}
		response.setStatus(200);
		response.setToken(request.getToken());
		response.setMessage("");
		return response;
		
	}

}
