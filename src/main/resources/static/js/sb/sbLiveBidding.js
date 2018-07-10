var myApp = angular.module('myApp');

myApp.controller('sbLiveBiddingCtrl', sbLiveBiddingCtrl);
sbLiveBiddingCtrl.$inject = ['$scope', '$rootScope', '$location', 'sbDataFactory','$timeout', '$interval', '$filter', 'store', 'sbdServices'];

function sbLiveBiddingCtrl($scope, $rootScope, $location, sbDataFactory, $timeout, $interval, $filter, store, sbdServices) {
	$scope.loading = true;
	var biddingMins = 5;
	$scope.CurrentDate = currentDate = new Date();
	$scope.nextDate = new Date();
	$scope.nextDate.setDate($scope.nextDate.getDate() + 1); 
	$scope.bidTargetTime = new Date(currentDate.getTime() + (biddingMins * 60 * 1000));
	$scope.demoObj = {};
	$rootScope.addPreference = [];
	$scope.filterApplied = false;
	$scope.isLiveBidOpen = false;
	$scope.oldrecords = {
			scheduleLines: []
	}
	
	$scope.bidDetailSearch = {};
	var getBidDetails = sbdServices.getBidDetail($scope.bidDetailSearch); 
	getBidDetails.then(function(data){
		$scope.bidDetailLst = data;
	});
	

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
			angular.forEach($scope.bidDetailLst, function(dtl){
				if(dtl.bidDtlId == $scope.sbBidDtlId){
					$scope.bidStartTime = dtl.bidStartDate;
					$scope.bidEndTime = dtl.bidEndDate;
				}
			});
			
//			var currDt = new Date();
//			if($scope.bidStartTime != '' && $scope.bidEndTime != '' && currDt >= $scope.bidStartTime && currDt <= $scope.bidEndTime){
//				$scope.isLiveBidOpen = true;
//				$rootScope.liveBidRemTime = Math.round((end - currDt.getTime())/1000);
//			}
//			else{
//				$scope.isLiveBidOpen = false;
//			}
			if($scope.records){
				$scope.scheduleLines = $scope.records.scheduleLines;
			}
			$scope.loading = false;
			$('.loaderDiv_pref, .loaderDiv_bid').hide();
				angular.forEach($scope.records.scheduleLines, function(detail){
					if(detail.prefNum == 0){
						detail.prefNum = '~';
					}
					else{
						detail.prefNum = detail.prefNum +'';
					}
					var isBuddy = false;
					if(detail.winner){
						angular.forEach(detail.winner, function(winner){
							if(winner==$rootScope.profile.name){
								isBuddy = true;
							}
						});
					}
					if(!isBuddy){
						detail.prefNum = '~';
					}
				});
			if($rootScope.ctFilterObj && $rootScope.ctFilterObj[0].selected){
				$scope.applySelectedFilter(0);
			}
//			else{
//				$timeout(function(){
//					$scope.initDatatable();
//				},50);
//			}
			var lines = _.sortBy($scope.records.scheduleLines, 'prefNum');
			$scope.records.scheduleLines = $.extend(true, [], lines);
			if($scope.records){
				$scope.recScheduleLine = $.extend(true, [], $scope.records.scheduleLines);
			}
		}, function(error) {
			$scope.status = 'Unable to load customer data: ' + error.message;
			$('#dataTableSB').DataTable().clear().destroy();
		});
	};

	$scope.init = function() {
		if(!$rootScope.profile){
			$rootScope.profile = store.getSession('profile');
		}
		var id = sbdServices.getBidDtlId();
		if(id){
			$scope.sbBidDtlId=id;
			$scope.intervalFunction();
		}
	};

	

	$scope.showSuccessAlert = false;
	$scope.init();
	$scope.days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
	$rootScope.userSelectedRow = null;
	$rootScope.disableRowSelection = false;
	$scope.closeTimeoutModal = function() {
		$('#sessionTimeOutModal').on('hidden.bs.modal',  function ()  {
			$scope.goToBidResults();
		});
		$('#sessionTimeOutModal').modal('hide');
		ga('send', 'event', 'SB', 'Timeout');
	}
	$scope.goToBidResults = function() {
//		$location.path('/bidresults');
	}

	$scope.openFinishModal = function() {
		$('#finishScreenModal').modal('show');
	}
	$scope.closeFinishModal = function() {
		sbDataFactory.saveChoice($rootScope.profile).then(function(response) {
			// this callback will be called asynchronously
			// when the response is available
			$scope.refresh();
			$('#finishScreenModal').on('hidden.bs.modal',  function ()  {
//				$scope.goToBidResults();
			});
			$('#finishScreenModal').modal('hide');
			$("#success").modal();
		}, function errorCallback(response) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
		});

		

		ga('send', 'event', 'SB-Bid',$rootScope.userSelectedRow.lineId+'');
	}
	$scope.initDatatable = function(){
		$('#dataTableSB').DataTable(
				{
					"order": [[ 10, "asc" ]],
					"dom" : '<"html5buttons"B>lTfgitp',
					"columnDefs" : [ {
						"targets" : 11,
						"sortable" : false
					} ],
					"columns" : [ {
						"width" : "5%",
						targets : 0
					}, {
						"width" : "5%",
						targets : 1
					}, {
						"width" : "5%",
						targets : 2
					}, {
						"width" : "10%",
						targets : 3
					}, {
						"width" : "10%",
						targets : 4
					}, {
						"width" : "10%",
						targets : 5
					}, {
						"width" : "10%",
						targets : 6
					}, {
						"width" : "10%",
						targets : 7
					}, {
						"width" : "10%",
						targets : 8
					}, {
						"width" : "10%",
						targets : 9
					}, {
						"width" : "10%",
						targets : 10
					}, {
						"width" : "5%",
						targets : 11
					} ],
					buttons : [
					           {
					        	   extend : 'copy'
					           },
					           {
					        	   extend : 'csv',
					        	   title : 'LiveBidDetail'
					           },
					           {
					        	   extend : 'excel',
					        	   title : 'LiveBidDetail'
					           },
					           {
					        	   extend : 'pdf',
					        	   title : 'LiveBidDetail'
					           },

					           {
					        	   extend : 'print',
					        	   customize : function(win) {
					        		   $(win.document.body).addClass(
					        		   'white-bg');
					        		   $(win.document.body).css(
					        				   'font-size', '10px');

					        		   $(win.document.body).find('table')
					        		   .addClass('compact').css(
					        				   'font-size',
					        		   'inherit');
					        	   }
					           } ]
				});
	}
}
