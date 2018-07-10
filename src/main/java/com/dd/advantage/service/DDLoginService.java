package com.dd.advantage.service;

import com.dd.advantage.request.DDLoginRequest;
import com.dd.advantage.response.Response;

public interface DDLoginService {
 public Response getLoginInformation(DDLoginRequest request);
}
