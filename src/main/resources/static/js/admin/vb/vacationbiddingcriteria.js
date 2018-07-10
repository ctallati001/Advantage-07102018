(function() {

  'use strict';

  angular
    .module('myApp')
    .controller('vacationbiddingcriteriaCtrl', vacationbiddingcriteriaCtrl);


  vacationbiddingcriteriaCtrl.$inject = ['$scope', '$rootScope', 'store', '$http', 'NgTableParams','$window','bdServices','sbdServices','empInfoFactory'];

  function vacationbiddingcriteriaCtrl($scope, $rootScope, store, $http, NgTableParams,$window,bdServices,sbdServices,empInfoFactory) {
	  $scope.obj={};
	  $scope.commonObj=[];
	  $scope.MonthObj=["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
	  $scope.weekSaved=["Preferences"];
	  $scope.offdaysObj=["M","T","W","R","F","Sa","Su","MT","TW","WR","RF","FSa","SaSu","MTW","TWR","WRF","RFSa","FSaSu","SaSuM"];
	  $scope.week=[];
	  for(var i=1;i<=52;i++){
		  $scope.week.push(i);
	  }
	  $scope.optionweeks=[];
	  for(var i=1;i<=5;i++){
		  $scope.optionweeks.push(i);
	  }
	  
	  $scope.bidDetailSearch = {};
		var getBidDetails = bdServices.getBidDetail($scope.bidDetailSearch); 
		getBidDetails.then(function(data){
			$scope.bidDetailLst = data;
		});
	  $scope.removeItem=function(val){
		  $scope.eventLst.splice(val,1);
	  }
	  $scope.eventLst = [{
		  "vacationdetails":"",
		  "selectValue":"",
		  "selectOption":"",
		  "commonObj":[]
	  
	  }];
	  var count=1;
	  $scope.addRow=function(){
		  $scope.eventLst.push({
			  "vacationdetails":"",
			  "selectValue":"",
			  "selectOption":"",
			  "commonObj":[]
		  
		  });
		  count++;
	  }
	  $scope.removeItem=function(val){
		  $scope.eventLst.splice(val,1);
	  }
	  $scope.buddiesList =[];
	  $scope.changeYear=function(item,val){
		  $scope.commonObj=[];
		 if(val=='Month'){
			 item.commonObj=$scope.MonthObj;
		 }else if(val=='Week'){
			 item.commonObj=$scope.week;
		 }else if(val=='Consecutive weeks'){
			 item.commonObj=$scope.optionweeks;
		 }
		 else if(val=='Weeks saved in'){
			 item.commonObj=$scope.weekSaved;
		 }
	     else if(val=='OFF Days'){
			 item.commonObj=$scope.offdaysObj;
	     }
		 else if(val=='Weeks to match my Buddy'){
			 for(var i=0;i<$scope.weeksMatchBuddy.length;i++){
				 var name = $scope.weeksMatchBuddy[i].firstName +" "+$scope.weeksMatchBuddy[i].lastName;
				  $scope.buddiesList.push(name);
				  
			 }
			 item.commonObj=$scope.buddiesList;
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
	  
	  $scope.getBuddiesInfo = function(){
		    $scope.employeeId = $rootScope.profile.empId;
			var empinfo = empInfoFactory.getBuddyInfo($scope.employeeId);
			empinfo.then(function(response) {
				$scope.weeksMatchBuddy = response;
			});
		}
	  
	  $scope.getBuddiesInfo();
    
  }
})()