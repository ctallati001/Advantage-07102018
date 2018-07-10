(function() {

  'use strict';

  angular
    .module('myApp')
    .controller('schedulebidproxycriteriaCtrl', schedulebidproxycriteriaCtrl);


  schedulebidproxycriteriaCtrl.$inject = ['$scope', '$rootScope', 'store', '$http', 'NgTableParams','$window','sbdServices'];

  function schedulebidproxycriteriaCtrl($scope, $rootScope, store, $http, NgTableParams,$window,sbdServices) {
	  $scope.obj={};
	  $scope.activeFlag = false;
	  $scope.commonObj=[];
	  $scope.schedulelinesObj=["Saved in preferences"];
	  $scope.starttimeObj=["Before","After"];
	  $scope.endtimebeforeObj=["Before","After"];
	  $scope.shiftlengthObj=["Less Than","Greater Than"];
	  $scope.locationObj=["INTL-TC-AE-CSS","GT-SPEC-SVC","CAR-CSS-DISP","T4-CSS-TC"];
	  $scope.shifttypeObj=["Regular","Variable","Rotating","Flex","Premium"];
	  $scope.offdaysObj=["M","T","W","R","F","Sa","Su","MT","TW","WR","RF","FSa","SaSu","MTW","TWR","WRF","RFSa","FSaSu","SaSuM"];
	  $scope.times=["00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00",
	                "12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00",
	                "24:00"];
	  $scope.values = ["1 hour","2 hours","3 hours","4 hours","5 hours","6 hours","7 hours","8 hours","9 hours","10 hours",
	                   "11 hours","12 hours","13 hours","14 hours","15 hours"];
	  $scope.eventLst = [{
		  "scheduledetails":"",
		  "selectValue":"",
		  "selectOption":"",
		  "commonObj":[],
	  	  "commonObject":[]
	  
	  }];
	  var count=1;
	  $scope.addRow=function(){
		  $scope.eventLst.push({
			  "scheduledetails":"",
			  "selectValue":"",
			  "selectOption":"",
			  "commonObj":[],
			  "commonObject":[]
		  
		  });
		  count++;
	  }
		var id = sbdServices.getBidDtlId();
		if(id){
			$scope.sbBidDtlId=id;
		}
	  $scope.bidDetailSearch = {};
		var getBidDetails = sbdServices.getBidDetail($scope.bidDetailSearch); 
		getBidDetails.then(function(data){
			$scope.bidDetailLst = data;
		});
	  $scope.removeItem=function(val){
		  $scope.eventLst.splice(val,1);
	  }
	  $scope.changeYear=function(item,val){
		  $scope.commonObj=[];
		  $scope.commonObject=[];
		  $scope.activeFlag = false;
		  if(val=='Schedule Lines'){
			 item.commonObj=$scope.schedulelinesObj;
			 $scope.activeFlag = true;
	     }else if(val=='Start Time'){
			 item.commonObj=$scope.starttimeObj;
			 item.commonObject = $scope.times;
			 
		 }else if(val=='End Time'){
			 item.commonObj=$scope.starttimeObj;
			 item.commonObject = $scope.times;
			 	 
		 }else if(val=='Shift Length'){
			 item.commonObj=$scope.shiftlengthObj;
			 item.commonObject = $scope.values;
		 }else if(val=='Location'){
			 item.commonObj=$scope.locationObj;
			 $scope.activeFlag = true;
		 }else if(val=='OFF Days'){
			 item.commonObj=$scope.offdaysObj;
			 $scope.activeFlag = true;
		 }else if(val=='Shift Type'){
			 item.commonObj=$scope.shifttypeObj;
			 $scope.activeFlag = true;
		 }
	  }
	  
	  $scope.saveRecord=function(obj){
		  var saveBidRecord = sbdServices.saveRecord(obj); 
		  saveBidRecord.then(function(data){
			  $scope.showNotification('Schedule Bidding Criteria are submitted')
			});  
	      }
		   
		   $scope.showNotification = function(msg){
	 			$('.toast-message').text(msg);
	 			$('#toast-container').fadeIn(1000).fadeOut(10000);
	 		}
		   
		   $('.toast-close-button').click(function(){
				$('#toast-container').hide();
				
			});
		   
		  
	  
	  $(".cursor").sortable({
		  update: function(e, ui) {
		    $(".cursor li").each(function(i, elm) {
		      $elm = $(elm); // cache the jquery object
		      $elm.attr("id", $elm.index(".cursor li"));
		      // below is just for demo purpose
		      $elm.text($elm.text().split("id")[0] + "id: " + $elm.attr("id"));
		    });
		  }
		});
	 

  }
})()
