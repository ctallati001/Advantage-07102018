(function() {

  'use strict';

  angular
    .module('myApp')
    .controller('ScheduleBidGroupCtrl', ScheduleBidGroupCtrl);
  ScheduleBidGroupCtrl.$inject = ['$scope', '$rootScope', 'store', '$http','$filter','scheduleBidGroupFactory','NgTableParams','$window','$timeout','$location'];
  function ScheduleBidGroupCtrl($scope, $rootScope, store, $http,$filter,scheduleBidGroupFactory, NgTableParams,$window, $timeout,$location) {
	  $scope.bidscreen='save';
	  $scope.emptobidgrp = {
				aaID : '',
				id:'',
				empId:'',
				startdate:null,
				endDate :null,
				scheduleBidGroupId:''
		};
	  $scope.bidgroup = {
			  id:null,
			  bidGroupName : '',
			  location:'',
			  description :'',
			  jobType:'',
			  shiftType:'',
			  calcGroup: ''
		};
	  
	  $scope.getDetails = function(){
		  $("#empDiv").hide();
		  if($rootScope.editpageValue!=undefined){
			  var idx = $rootScope.editpageValue;
			  $scope.bidscreen='update';
			  $scope.empgroup='save'; 
			
			  var getDetails = scheduleBidGroupFactory.getDetails();
			  getDetails.then(function(res) {
				  $("#empDiv").show();
					$scope.listResponse =  res;
					$scope.bidgroup = {
							  id:$scope.listResponse[idx].id,
							  bidGroupName : $scope.listResponse[idx].bidGroupName,
							  location:$scope.listResponse[idx].location,
							  description :$scope.listResponse[idx].description,
							  jobType:$scope.listResponse[idx].jobType,
							  shiftType:$scope.listResponse[idx].shiftType,
							  calcGroup:$scope.listResponse[idx].calcGroup
						}
					$scope.getListOfBidGroupEmployee($scope.bidgroup.id);
					$rootScope.scheduleBidGroupIdval = $scope.bidgroup.id;
					$scope.jobType = [{opt:"Full Time"},{opt:"Part Time"}];
					$scope.dateFormattingPattern();
			  });
		 }else{
			  $scope.jobType = [{opt:"Full Time"},{opt:"Part Time"}];
			  $scope.dateFormattingPattern();
			  $scope.empgroup='save'; 
		 }
	  };
	 
		 $scope.showParams = function(){		
			 $scope.addEmp = true;	
		 };		
	  
		 $scope.formatDate = function(date){
		    var dateOut = new Date(date);
		    return dateOut;
		 };
	  
		$scope.getListOfBidGroupEmployee = function(id){
			var scheduleBidGroupIdval = '';
		   $('.dataTable-example').DataTable().clear().destroy();
		   if(id!=undefined && id!=null){
			   scheduleBidGroupIdval = id;
		   }else{
			   scheduleBidGroupIdval = $rootScope.scheduleBidGroupIdval;
		   }
		
		   var getDetails = scheduleBidGroupFactory.getListOfBidGroupEmployee(scheduleBidGroupIdval);
			  getDetails.then(function(res) {
				$scope.employeeInfoResponse = res;
				if($scope.employeeInfoResponse.length >0 ){
					$timeout(function(){
						$('.dataTable-example').DataTable({
							pageLength: 10,
							responsive: true,
							destroy: true,
							dom: '<"html5buttons"B>lTfgitp',
							buttons: [
							          {extend: 'copy'},
							          {extend: 'csv'},
							          {extend: 'excel', title: 'ExampleFile'},
							          {extend: 'pdf', title: 'ExampleFile'},
							          {extend: 'print',
							        	  customize: function (win){
							        		  $(win.document.body).addClass('white-bg');
							        		  $(win.document.body).css('font-size', '10px');
							        		  $(win.document.body).find('table')
							        		  .addClass('compact')
							        		  .css('font-size', 'inherit');
							        	  }
							          }
							          ]
							});
					}, 50);
			        }
			    });
			 }; // close getListOfBidGroupEmployee
	
		
		 $scope.addEmpTOBidGroup = function(){
			 var details = $scope.aaID;
			 var id = $rootScope.scheduleBidGroupIdval;
			 var startDate = new Date($scope.emptobidgrp.startDate);
			 var endDate = new Date($scope.emptobidgrp.endDate);
			 angular.forEach(details, function(aaid){
				 var empRequest = {
						 scheduleBidGroupId : id,
						 startDate: startDate,
						 endDate: endDate,
						 aaID: aaid
				 };
				 var addEmpInfo = scheduleBidGroupFactory.addEmpTOBidGroup(empRequest);
				 addEmpInfo.then(function(res) {
					 $scope.getListOfBidGroupEmployee();
					}); 
			 });
			 $scope.emptobidgrp = {};
			 $scope.aaID = [];
		 };	
		$scope.clear = function(){
			$scope.bidgroup = {};
			$scope.bidscreen ='save';
			$scope.employeeInfoResponse = {};
			$("#empDiv").hide();
		};
	     
		$scope.edit = function(idx){
			$scope.empgroup='update'; 
			$scope.emptobidgrp = {
					aaID : $scope.employeeInfoResponse[idx].aaID,
					id: $scope.employeeInfoResponse[idx].id,
					empId: $scope.employeeInfoResponse[idx].empId,
					startDate: $filter('date')($scope.employeeInfoResponse[idx].startDate,'MM-dd-yyyy'),
					endDate: $filter('date')($scope.employeeInfoResponse[idx].endDate,'MM-dd-yyyy'),
					scheduleBidGroupId :$scope.employeeInfoResponse[idx].scheduleBidGroupId
			};
		};
		$scope.updateBidGroupDetails = function(){
			$scope.empgroup='save'; 
			$scope.addEmpTOBidGroup();
		};
			
	
		 $scope.showNotification = function(msg){
			 $('.toast-message').text(msg);
				$('#toast-container').fadeIn(1000).fadeOut(5000);
			}
		 
		 $('.toast-close-button').click(function(){
			 $('#toast-container').hide();
			});
	 
	 $scope.dateFormattingPattern = function(){
		 $('#date_3 .input-group.date').datepicker({
				defaultViewDate : $scope.bidgroup.startDate,
				todayBtn: "linked",
				keyboardNavigation: false,
				forceParse: false,
				autoclose: true,
				todayHighlight: true,
				calendarWeeks: true,
				format: 'mm-dd-yyyy'
			});
			if($scope.bidgroup.startDate != null && $scope.bidgroup.startDate != 'undefined' && $scope.bidgroup.startDate != ''){
				$('#date_3 .input-group.date').data("datepicker")._setDate($scope.bidgroup.startDate);
			}
			$('#date_4 .input-group.date').datepicker({
				defaultViewDate : $scope.bidgroup.endDate,
				todayBtn: "linked",
				keyboardNavigation: false,
				forceParse: false,
				autoclose: true,
				todayHighlight: true,
				calendarWeeks: true,
				format: 'mm-dd-yyyy'
			});
			if($scope.bidgroup.endDate != null && $scope.bidgroup.endDate != 'undefined' && $scope.bidgroup.endDate != ''){
				$('#date_4 .input-group.date').data("datepicker")._setDate($scope.bidgroup.endDate);
			}
	  }
	 
		 $scope.newScheduleGroupPage = function(){
			 $rootScope.editpageValue = undefined;
			 $location.path('schedulegrouplist');
		 }
		 
		 $scope.save = function(){
			 $rootScope.scheduleBidGroupIdval = {};
			 $scope.dateFormattingPattern();
			 $scope.showParams();
			 
			 var saveBidGrp = scheduleBidGroupFactory.save($scope.bidgroup);
			 saveBidGrp.then(function(res) {
				 $rootScope.scheduleBidGroupIdval = res.id;
				 $scope.getAllBidGroupDetails();
				 $scope.getListOfBidGroupEmployee($rootScope.scheduleBidGroupIdval);
				}); 
			 
			 //$scope.bidgroup = {};
			 $scope.bidscreen= 'update';
			  $("#empDiv").show();
		 }
	 
		 $scope.update = function(){
			 $scope.dateFormattingPattern();
			 $scope.bidgroup.id = $rootScope.scheduleBidGroupIdval; 
			 var updateBidGrp = scheduleBidGroupFactory.save($scope.bidgroup);
			 updateBidGrp.then(function(res) {
				 $scope.showNotification(res.userMsg);
				 $scope.listResponse ={};
				 $scope.getAllBidGroupDetails();
				}); 
			 
		 }
		 
	
	 
		 $scope.getAllBidGroupDetails = function(){
			 $('.dataTables-example').DataTable().clear().destroy();
			 var getDetails = scheduleBidGroupFactory.getAllBidGroupDetails();
			  getDetails.then(function(res) {
				$scope.listResponse = res;
				if($scope.listResponse.length >0 ){
					$timeout(function(){
						$('.dataTables-example').DataTable({
							pageLength: 10,
							responsive: true,
							destroy: true,
							select: true,
							dom: '<"html5buttons"B>lTfgitp',
							buttons: [
							          { extend: 'copy'},
							          {extend: 'csv'},
							          {extend: 'excel', title: 'ExampleFile'},
							          {extend: 'pdf', title: 'ExampleFile'},
							          {extend: 'print',
							        	  customize: function (win){
							        		  $(win.document.body).addClass('white-bg');
							        		  $(win.document.body).css('font-size', '10px');
							        		  $(win.document.body).find('table')
							        		  .addClass('compact')
							        		  .css('font-size', 'inherit');
							        	  }
							          }
							]
						});
					}, 50);
			        }
			    });
		 }
		 
		 $scope.getAutoFillAaid = function(){
			 var getDetails = scheduleBidGroupFactory.getAutoFillAaid();
			  getDetails.then(function(res) {
				  $scope.empList = res;
			  });
			 
		 };
	 /**
	  * This delete method is for deleting records from schedule_bid_group_emplist 
	  * after adding employee to bid group emp list 
	  */
	   $scope.deleteScheduleBidGroupDetails = function(id){
		 var deleteSBGrp = scheduleBidGroupFactory.deleteSBGroup(id);
		 deleteSBGrp.then(function(res) {
			 $scope.showNotification(res.userMsg);
			 $scope.emptobidgrp = {};
			 $scope.getListOfBidGroupEmployee();
		  });
		 
	   };
	   
	 $scope.editScheduleBidGroupDetails = function(idx){
		 $rootScope.editpageValue = idx;
		 $scope.bidgroup = {
				  id:$scope.listResponse[idx].id,
				  bidGroupName : $scope.listResponse[idx].bidGroupName,
				  location:$scope.listResponse[idx].location,
				  description :$scope.listResponse[idx].description,
				  jobType:$scope.listResponse[idx].jobType
			}
		 		$location.path("schedulegrouplist");
	    };
	    /**
	     * @Method deleteScheduleBidGroupDetails for deleting records from schedule_bid_group
	     */
	    
	    $scope.deleteScheduleBid = function(id){
	    	var delScheduleBid = scheduleBidGroupFactory.deleteScheduleBid(id);
	    	delScheduleBid.then(function(res) {
	    		 $scope.showNotification(res.userMsg);
	    		 $scope.emptobidgrp = {};
				 $scope.getAllBidGroupDetails();
			  });
				
	    	
		   };  
     
	 $scope.getAllBidGroupDetails();
	 $scope.getAutoFillAaid();
  }
})()

