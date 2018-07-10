package com.dd.advantage.llelastic;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;

public class NetClientGet {
	
	private static final Logger logger = LoggerFactory.getLogger(NetClientGet.class);
  

	// http://localhost:8080/RESTfulExample/json/product/get
	public String main(String[] args) {
		String output = null;
		StringBuilder outputBuf = new StringBuilder();
	  try {
		URL url = new URL("http://192.168.0.8:9200/asset-dev/doc/_search");
		HttpURLConnection conn = (HttpURLConnection) url.openConnection();
		//conn.setDoOutput(true);
		conn.setRequestMethod("GET");
		conn.setRequestProperty("Accept", "application/json");

		String input = "{\"query\" : {\"constant_score\" : {\"filter\" : {\"term\" : {"+args[0]+" : "+args[1]+"}}}}}";

		/*OutputStream os = conn.getOutputStream();
		os.write(input.getBytes());
		os.flush();*/
		
		if (conn.getResponseCode() != 200) {
			throw new RuntimeException("Failed : HTTP error code : "
					+ conn.getResponseCode());
		}

		BufferedReader br = new BufferedReader(new InputStreamReader(
			(conn.getInputStream())));

		
		System.out.println("Output from Server .... \n");
		while ((output = br.readLine()) != null) {
			System.out.println(output);
			outputBuf.append(output);
		}

		conn.disconnect();

	  } catch (MalformedURLException e) {
		  output += ""+e.getMessage();
		  outputBuf.append(output);
		e.printStackTrace();

	  } catch (IOException e) {
		output += ""+e.getMessage();
		outputBuf.append(output);
		e.printStackTrace();

	  }
	  
	  return outputBuf.toString();

	}

}
