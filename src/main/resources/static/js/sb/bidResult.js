var myApp = angular.module('myApp');

myApp.controller('bidResultCtrl', bidResultCtrl);
bidResultCtrl.$inject = ['$scope', '$rootScope', '$location', 'sbDataFactory','$timeout', '$interval', '$filter', 'store', 'sbdServices'];

function bidResultCtrl($scope, $rootScope, $location, sbDataFactory, $timeout, $interval, $filter, store, sbdServices) {
	$scope.loading = true;
	var biddingMins = 5;
	$scope.myDate = new Date();
	$scope.CurrentDate = currentDate = new Date();
	$scope.nextDate = new Date();
	$scope.nextDate.setDate($scope.nextDate.getDate() + 1); 
	$scope.bidTargetTime = new Date(currentDate.getTime() + (biddingMins * 60 * 1000))
	$scope.demoObj = {};
	$rootScope.addPreference = [];
	
	$scope.bidDetailSearch = {};
	var getBidDetails = sbdServices.getBidDetail($scope.bidDetailSearch); 
	getBidDetails.then(function(data){
		$scope.bidDetailLst = data;
	});
	
	$scope.oldrecords = {
			scheduleLines: []
	}
	angular.forEach($rootScope.ctFilterObj, function(opt){
		opt.selected = false;
	});

	$scope.showSuccessAlert = false;
	$scope.filtPanel = false;
	$rootScope.userSelectedRow = null;
	$rootScope.disableRowSelection = false;
	
	$scope.oldrecords = {
			scheduleLines: []
	}

	$scope.intervalFunction = function() {
		$scope.refresh();
		$timeout(function(){
			$('#collapse').click(function(){
			 		    $(this).text(function(i,old){
			 		        return old=='Show Filters' ?  'Hide Filters' : 'Show Filters';
			 		    });
			 		});
		}, 200);
	};

	$scope.$on('$viewContentLoaded', function() {
		$('#side-menu').metisMenu();
	});

	$scope.$on('$destroy', function() {
		$interval.cancel($scope.intervalObj);
	});

	$scope.refresh = function() {
		$scope.records = null;
		sbDataFactory.getData().then(function(response) {
			angular.forEach(response.data, function(data){
				if(data.bidDtlId == $scope.sbBidDtlId){
					$scope.records = data;
				}
			});
			angular.forEach($scope.records.scheduleLines, function(lines){
				if(!lines.assignment){
					lines.winner = [];
				}
			});
			if($scope.records){
				$scope.recScheduleLine = $.extend(true, [], $scope.records.scheduleLines);
			}
			$scope.loading = false;
			
			/*if (!(angular.equals($scope.records, $scope.oldrecords))) {
				$scope.oldrecords = $scope.records;
				if($rootScope.sbUserPreference && $rootScope.sbUserPreference.length>0){
					var arrayLength2 = $scope.records.scheduleLines.length;
					for (var ij = 0; ij < arrayLength2; ij++) {
						var obj2 = $scope.records.scheduleLines[ij];
						if($rootScope.sbUserPreference[obj2.lineId] && $rootScope.sbUserPreference[obj2.lineId] != null && $rootScope.sbUserPreference[obj2.lineId] != ''){
							$scope.records.scheduleLines[ij].preference=$rootScope.sbUserPreference[obj2.lineId];
						}
						else{
							$scope.records.scheduleLines[ij].preference = '~';
						}
					}
				}
			}*/
			$('.loaderDiv_pref, .loaderDiv_bid').hide();
			$('#dataTableResult').DataTable().clear().destroy();
		}, function(error) {
			$scope.status = 'Unable to load customer data: ' + error.message;
		});
	};
	
	$scope.$on('sbdata', function() {
		$scope.destroyDatatable();
	});

	$scope.init = function() {
		var id = sbdServices.getBidDtlId();
		if(id){
			$scope.sbBidDtlId=id;
			$scope.intervalFunction();
		}
	};
	
	$scope.init();

	$scope.initDatatable = function(){
//		$('#dataTableResult').DataTable(
//				{
//					"dom" : '<"html5buttons"B>lTfgitp',
//					"columns" : [ {
//						"width" : "10%",
//						targets : 0
//					}, {
//						"width" : "5%",
//						targets : 1
//					}, {
//						"width" : "5%",
//						targets : 2
//					}, {
//						"width" : "10%",
//						targets : 3
//					}, {
//						"width" : "10%",
//						targets : 4
//					}, {
//						"width" : "10%",
//						targets : 5
//					}, {
//						"width" : "10%",
//						targets : 6
//					}, {
//						"width" : "10%",
//						targets : 7
//					}, {
//						"width" : "10%",
//						targets : 8
//					}, {
//						"width" : "10%",
//						targets : 9
//					}, {
//						"width" : "10%",
//						targets : 10
//					} ],
//					buttons : [
//					           {
//					        	   extend : 'copy'
//					           },
//					           {
//					        	   extend : 'csv',
//					        	   title : 'LiveBidDetail'
//					           },
//					           {
//					        	   extend : 'excel',
//					        	   title : 'LiveBidDetail'
//					           },
//					           {
//					        	   extend : 'pdf',
//					        	   title : 'LiveBidDetail'
//					           },
//
//					           {
//					        	   extend : 'print',
//					        	   customize : function(win) {
//					        		   $(win.document.body).addClass(
//					        		   'white-bg');
//					        		   $(win.document.body).css(
//					        				   'font-size', '10px');
//
//					        		   $(win.document.body).find('table')
//					        		   .addClass('compact').css(
//					        				   'font-size',
//					        		   'inherit');
//					        	   }
//					           } ]
//				});
	}
	
	$scope.destroyDatatable = function(){
		$('#dataTableResult').DataTable().destroy();
//		$scope.initDatatable();
	}
}
