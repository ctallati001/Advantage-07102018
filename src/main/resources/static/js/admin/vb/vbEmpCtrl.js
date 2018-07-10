var myApp = angular.module('myApp');

myApp.controller('vbEmpCtrl', vbEmpCtrl);
vbEmpCtrl.$inject = ['$http', '$scope', '$rootScope', '$timeout', 'store', '$filter','bidGroupFactory', 'bdServices'];

function vbEmpCtrl($http, $scope, $rootScope, $timeout, store, $filter,bidGroupFactory,bdServices) {
	
	$scope.bidDetailSearch = {
			bidId : 0,
			bidType :'',
			shiftType : '',
			windowLength : 0,
			rounds : 0,
			startDate : null,
			endDate : null
	};
	var bd = bdServices.getBidDetail($scope.bidDetailSearch);
	bd.then(function(data){
		$scope.bidDetailLst = data;
	});
	
	$scope.addBidDetailModal = function(i){
		if(i>=0){
			$scope.bidDetails = {
					bidDtlId: $scope.bidDetail.bidDetail[i].bidDtlId,
					bidGroup: $scope.bidDetail.bidDetail[i].bidGrpId,
					bidGrpName : $scope.bidDetail.bidDetail[i].bidGrpName,
					bidName : $scope.bidDetail.bidDetail[i].bidName,
					bidDesc : $scope.bidDetail.bidDetail[i].bidDesc,
					windowLength: $scope.bidDetail.bidDetail[i].windowLength,
					bidType: $scope.bidDetail.bidDetail[i].bidType,
					rounds: $scope.bidDetail.bidDetail[i].rounds,
					shiftType: $scope.bidDetail.bidDetail[i].shiftType,
					startDate: $filter('date')($scope.bidDetail.bidDetail[i].startDate,'MM-dd-yyyy'),
					endDate: $filter('date')($scope.bidDetail.bidDetail[i].endDate,'MM-dd-yyyy'),
					bidStartDate: $filter('date')($scope.bidDetail.bidDetail[i].bidStartDate,'MM-dd-yyyy hh:mm a'),
					bidEndDate: $filter('date')($scope.bidDetail.bidDetail[i].bidEndDate,'MM-dd-yyyy hh:mm a')
			};
		}
		else{
			$scope.bidDetails = {};
		}
	};

	 
	 $scope.init = function(){
			$scope.biddingType = [{opt:"Proxy"},{opt:"Live"}];
			$scope.windowLength = [{opt:"2"},{opt:"5"},{opt:"10"}];
			$scope.numRounds = [1, 2, 3, 4, 5];
			$scope.shiftTypes = [{opt:"Morning"},{opt:"Afternoon"},{opt:"Evening"}];
			var bg = bidGroupFactory.getBidGroup();
			bg.then(function(data){
				$scope.bidGroupLst = data;
			}, function(msg){
				$scope.error = msg;
			});
			
			$scope.bidDetails = {
					bidDtlId: '',
					bidGroup: '',
					bidGrpName : '',
					bidName : '',
					bidDesc : '',
					windowLength: '',
					bidType: '',
					rounds: '',
					shiftType: '',
					startDate: '',
					endDate: '',
					bidStartDate: '',
					bidEndDate: ''
			};
			$scope.dateFormatting();
		}
	 
	 $scope.dateFormatting = function(){
			$('#date_1 .input-group.date').datepicker({
				todayBtn: "linked",
				keyboardNavigation: false,
				forceParse: false,
				autoclose: true,
				todayHighlight: true,
				calendarWeeks: true,
				format: 'mm-dd-yyyy'
			});
			
			if($scope.bidDetails.startDate != null && $scope.bidDetails.startDate != 'undefined' && $scope.bidDetails.startDate != ''){
				$('#date_1 .input-group.date').data("datepicker")._setDate($scope.bidDetails.startDate);
			}
			
			$('#date_2 .input-group.date').datepicker({
				defaultViewDate : $scope.bidDetails.endDate,
				todayBtn: "linked",
				keyboardNavigation: false,
				forceParse: false,
				autoclose: true,
				todayHighlight: true,
				calendarWeeks: true,
				format: 'mm-dd-yyyy'
			});
			
			if($scope.bidDetails.endDate != null && $scope.bidDetails.endDate != 'undefined' && $scope.bidDetails.endDate != ''){
				$('#date_2 .input-group.date').data("datepicker")._setDate($scope.bidDetails.endDate);
			}
			$('#datetimepicker1').datetimepicker({
				defaultDate : $scope.bidDetails.bidStartDate,
				calendarWeeks: true,
				format: 'MM-DD-YYYY hh:mm A'
			});
			$("#datetimepicker1").on("dp.change", function() {
				$scope.bidDetails.bidStartDate = $("#datetimepicker1 .form-control").val();
		    });

			$('#datetimepicker2').datetimepicker({
				defaultDate : $scope.bidDetails.bidEndDate,
				calendarWeeks: true,
				format: 'MM-DD-YYYY hh:mm A'
			});
			$("#datetimepicker2").on("dp.change", function() {
				$scope.bidDetails.bidEndDate = $("#datetimepicker2 .form-control").val();
		    });	
		 
		 
		};	 
	 
	$scope.autoFillEmployeeBid = function(id){
		angular.forEach($scope.bidDetailLst, function(dtl){
			 if(dtl.bidDtlId == id){
				 $scope.bidDetails = {
							bidDtlId: dtl.bidDtlId,
							bidGroup: dtl.bidGrpId,
							bidGrpName : dtl.bidGrpName,
							bidName : dtl.bidName,
							bidDesc : dtl.bidDesc,
							windowLength: dtl.windowLength,
							bidType: dtl.bidType,
							rounds: dtl.rounds,
							shiftType: dtl.shiftType,
							startDate: $filter('date')(dtl.startDate,'MM-dd-yyyy'),
							endDate: $filter('date')(dtl.endDate,'MM-dd-yyyy'),
							bidStartDate: $filter('date')(dtl.bidStartDate,'MM-dd-yyyy hh:mm a'),
							bidEndDate: $filter('date')(dtl.bidEndDate,'MM-dd-yyyy hh:mm a')
					};
			 }
		 });
	}; 

	
	$rootScope.getEmpDetails= function(id){
	  $scope.autoFillEmployeeBid(id);
	  $('.dataTable-example').DataTable().clear().destroy();
	   $http.post("/schedule/getall",id).then(function(listResponse){
	   $scope.empList = listResponse.data;
				$timeout(function(){
					$('.dataTable-example').DataTable({
						pageLength: 10,
						order: [[ 3, "asc" ]],
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
		    });
		 };
		 
		 $scope.populateBidTime = function(){
			 var stdt = '';
			 angular.forEach($scope.bidDetailLst, function(dtl){
				 if(dtl.bidDtlId == $scope.bidDtlId){
					 stdt = dtl.bidStartDate;
				 }
			 });
			 var start = moment(new Date());
			 if($rootScope.empStartTime && $rootScope.empStartTime != ''){
				 start = moment($rootScope.empStartTime);
			 }
			 else{
				 start =  moment(stdt);				 
			 }
			 angular.forEach($scope.empList, function(emp){	
				 var emptobidgrp = {
						 aaID : emp.empInfo.aaID,
						 id: emp.empInfo.id,
						 empId: emp.empInfo.empId,
						 startDate: $filter('date')(emp.startDate,'yyyy-MM-dd'),
						 endDate: $filter('date')(emp.endDate,'yyyy-MM-dd'),
						 scheduleBidGroupId :emp.scheduleBidGroupId
				 };
				 emptobidgrp.bidStartTime = start;
				 emp.bidStartTime = start.format('MM-DD-YYYY hh:mm');
				 start = moment(start).add(5, 'm');
				 emptobidgrp.bidEndTime = start;
				 emp.bidEndTime = start.format('MM-DD-YYYY hh:mm');
				 $http.post("/schedule/addemp",emptobidgrp).then(function(response){
					 $scope.message = "Done";
				 });
			 });
		 }
}










/*var myApp = angular.module('myApp');

myApp.controller('vbEmpCtrl', vbEmpCtrl);
vbEmpCtrl.$inject = ['$http', '$scope', '$rootScope', '$timeout', 'store', '$filter', 'bdServices'];

function vbEmpCtrl($http, $scope, $rootScope, $timeout, store, $filter, bdServices) {
	
	$scope.bidDetailSearch = {
			bidId : 0,
			bidType :'',
			shiftType : '',
			windowLength : 0,
			rounds : 0,
			startDate : null,
			endDate : null
	};
	$scope.biddingType = [{opt:"Proxy"},{opt:"Live"}];
	$scope.windowLength = [{opt:"2"},{opt:"5"},{opt:"10"}];
	$scope.numRounds = [1, 2, 3, 4, 5];
	$scope.shiftTypes = [{opt:"Morning"},{opt:"Afternoon"},{opt:"Evening"}];
	
	var bd = bdServices.getBidDetail($scope.bidDetailSearch);
	bd.then(function(data){
		$scope.bidDetailLst = data;
	});
	
	$scope.addBidDetailModal = function(i){
		if(i>=0){
			$scope.bidDetails = {
					bidDtlId: $scope.bidDetail.bidDetail[i].bidDtlId,
					bidGroup: [$scope.bidDetail.bidDetail[i].bidGrpId],
					bidGrpName : $scope.bidDetail.bidDetail[i].bidGrpName,
					bidName : $scope.bidDetail.bidDetail[i].bidName,
					bidDesc : $scope.bidDetail.bidDetail[i].bidDesc,
					windowLength: $scope.bidDetail.bidDetail[i].windowLength,
					bidType: $scope.bidDetail.bidDetail[i].bidType,
					rounds: $scope.bidDetail.bidDetail[i].rounds,
					shiftType: $scope.bidDetail.bidDetail[i].shiftType,
					startDate: $filter('date')($scope.bidDetail.bidDetail[i].startDate,'MM-dd-yyyy'),
					endDate: $filter('date')($scope.bidDetail.bidDetail[i].endDate,'MM-dd-yyyy'),
					bidStartDate: $filter('date')($scope.bidDetail.bidDetail[i].bidStartDate,'MM-dd-yyyy hh:mm a'),
					bidEndDate: $filter('date')($scope.bidDetail.bidDetail[i].bidEndDate,'MM-dd-yyyy hh:mm a')
			};
		}
		else{
			$scope.bidDetails = {};
		}
	};

	
	$rootScope.getEmpDetails= function(id){
	   $('.dataTable-example').DataTable().clear().destroy();

	   $http.post("/schedule/getall",id).then(function(listResponse){
	   $scope.empList = listResponse.data;
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
		    });
		 };
		 
		 $scope.populateBidTime = function(){
			 var stdt = '';
			 angular.forEach($scope.bidDetailLst, function(dtl){
				 if(dtl.bidDtlId == $scope.bidDtlId){
					 stdt = dtl.bidStartDate;
				 }
			 });
			 var start = moment(new Date());
			 if($rootScope.empStartTime && $rootScope.empStartTime != ''){
				 start = moment($rootScope.empStartTime);
			 }
			 else{
				 start =  moment(stdt);				 
			 }
			 angular.forEach($scope.empList, function(emp){	
				 var emptobidgrp = {
						 aaID : emp.empInfo.aaID,
						 id: emp.empInfo.id,
						 empId: emp.empInfo.empId,
						 startDate: $filter('date')(emp.startDate,'yyyy-MM-dd'),
						 endDate: $filter('date')(emp.endDate,'yyyy-MM-dd'),
						 scheduleBidGroupId :emp.scheduleBidGroupId
				 };
				 emptobidgrp.bidStartTime = start;
				 emp.bidStartTime = start.format('MM-DD-YYYY hh:mm');
				 start = moment(start).add(5, 'm');
				 emptobidgrp.bidEndTime = start;
				 emp.bidEndTime = start.format('MM-DD-YYYY hh:mm');
				 $http.post("/schedule/addemp",emptobidgrp).then(function(response){
					 $scope.message = "Done";
				 });
			 });
		 }
}*/