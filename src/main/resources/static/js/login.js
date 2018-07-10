var app = angular.module('myApp');
app.controller("loginCtrl", loginCtrl);
loginCtrl.$inject = ["$scope", "$rootScope", "$location","$timeout", "$interval", "$filter",'$http'];

function loginCtrl($scope, $rootScope, $location, $timeout, $interval, $filter,$http) {
 
var URL = 'https://direct.dimensiondata.com/NGapi/api/login';

//alert($rootScope.vRoot);
//console.log('$rootScope.profile >>'+JSON.stringyfy($rootScope.profile));

$scope.loginAPICall = function(){

var vRootName =  $rootScope.vRoot;
	
//alert("Calling API: " +  vRootName.substring(7,vRootName.length));

var object = 
    {
"request": {
"header": {
"type": "login",
"vRoot":vRootName.substring(7,vRootName.length),
"username": $scope.userName,
"password": $scope.password,
"portal": 2147483647,
"portalType": 0
//"vRoot":localStorage.getItem("vRoot"),
//"vRoot":"destore",
},
"requestDetails": null
}
} ;
	
	$.ajax({
	      type : "POST",
	      contentType : "application/json",
	      url :URL,
	      data : JSON.stringify(object),
	      dataType : 'json',
	      beforeSend: function(x) {
	            if (x && x.overrideMimeType) {
	              x.overrideMimeType("application/json");
	            }
	          },
	      success : function(result) {
	    	 if(result.Response!==undefined){ 
	    	 if( result.Response.header.status == 403){
	    		alert("Incorrect Login");
	    		return;
	    	 }
	    	 }
	    	  
	    	  console.log('.......>>>>>'+JSON.stringify(result.response.responseDetails));
	    	  var obj = new Object();
	    	  obj.firstName = result.response.responseDetails.firstName;
	    	  obj.lastName = result.response.responseDetails.firstName;
	    	  obj.userName= result.response.responseDetails.firstName +" " +result.response.responseDetails.lastName;
	    	  obj.userType = 'Internal';
	    	  
	    	$rootScope.profile = obj;
	    	  $location.path("/home").search('jsessionID', result.response.header.token);
	    	  $scope.$apply();
	      },
	      error : function(e) {
	        alert("Incorrect Login!")
	        console.log("ERROR: ", e);
	        
	      }
	    });

};
}

   




