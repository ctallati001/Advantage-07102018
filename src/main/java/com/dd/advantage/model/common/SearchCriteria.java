package com.dd.advantage.model.common;

public class SearchCriteria {
    private String key;
    private Object value;
    
    public String getKey(){
    	return this.key;
    }
    public void setKey(String key){
    	this.key = key;
    }
    public Object getValue(){
    	return this.value;
    }
    public void setValue(Object value){
    	this.value = value;
    }
    
    SearchCriteria(String key, Object value){
    	this.key = key;
    	this.value = value;
    }
}
