var myApp = angular.module('myApp');

myApp.controller('sbBidDtlCtrl', sbBidDtlCtrl);
sbBidDtlCtrl.$inject = ['$scope', '$rootScope', '$timeout', 'store', '$filter', 'sbdServices', 'bidGroupFactory'];

function sbBidDtlCtrl($scope, $rootScope, $timeout, store, $filter, sbdServices, bidGroupFactory) {	

	$rootScope.selectedRow = {
			val : ''
	}
	
	$rootScope.loading = true;
	var biddingMins = 5;
	$scope.CurrentDate = currentDate = new Date();
	$scope.nextDate = new Date();
	$scope.nextDate.setDate($scope.nextDate.getDate() + 1); 
	$scope.bidTargetTime = new Date(currentDate.getTime() + (biddingMins * 60 * 1000));
	$scope.bidDetailSearch = {};
	$scope.addBidDetailModal = function(i){
		if(i>=0){
			var id = $scope.bidDetail.bidDetail[i].bidGroup.id;
			$rootScope.bidDetails = {
					bidDtlId: $scope.bidDetail.bidDetail[i].bidDtlId,
					bidGroup: eval(id),
					bidName : $scope.bidDetail.bidDetail[i].bidName,
					bidDesc : $scope.bidDetail.bidDetail[i].bidDesc,
					windowLength: $scope.bidDetail.bidDetail[i].windowLength,
					jobType: $scope.bidDetail.bidDetail[i].jobType,
					bidType: $scope.bidDetail.bidDetail[i].bidType,
					bidStartDate: $filter('date')($scope.bidDetail.bidDetail[i].bidStartDate,'MM-dd-yyyy hh:mm a'),
					bidEndDate: $filter('date')($scope.bidDetail.bidDetail[i].bidEndDate,'MM-dd-yyyy hh:mm a'),
					openTime: $scope.bidDetail.bidDetail[i].openTime,
					airportCode: $scope.bidDetail.bidDetail[i].airportCode,
					effectiveDate: $filter('date')($scope.bidDetail.bidDetail[i].effectiveDate,'MM-dd-yyyy')
			};
		}
		else{
			$rootScope.bidDetails = {};
		}

		var dt = new Date($rootScope.bidDetails.bidStartDate);
		$('#bidDtlModal').modal('show');

		$('#datetimepicker1').datetimepicker({
			defaultDate: $rootScope.bidDetails.bidStartDate,
			calendarWeeks: true,
			format: 'MM-DD-YYYY hh:mm A'
		});
		$("#datetimepicker1").on("dp.change", function() {
			$rootScope.bidDetails.bidStartDate = $("#datetimepicker1 .form-control").val();
		});

		$('#datetimepicker2').datetimepicker({
			defaultDate: $rootScope.bidDetails.bidEndDate,
			calendarWeeks: true,
			format: 'MM-DD-YYYY hh:mm A'
		});
		$("#datetimepicker2").on("dp.change", function() {
			$rootScope.bidDetails.bidEndDate = $("#datetimepicker2 .form-control").val();
		});
		
		$('#datetimepicker3 .input-group.date').datepicker({
			defaultViewDate : $scope.bidDetails.endDate,
			todayBtn: "linked",
			keyboardNavigation: false,
			forceParse: false,
			autoclose: true,
			todayHighlight: true,
			calendarWeeks: true,
			format: 'mm-dd-yyyy'
		});
	};

	$scope.formatDate = function(date){
		var dateOut = new Date(date);
		return dateOut;
	};

	$rootScope.saveBidDetails = function(){
		var detail = $rootScope.bidDetails;
		var bidGroup = '';
		for(var j=0; j<$rootScope.bidGroupLst.length; j++){
			if(detail.bidGroup == $rootScope.bidGroupLst[j].id){
				bidGroup = $rootScope.bidGroupLst[j].bidGroupName;
				break;
			}
		}

		var details = new Array();
		details[0] = {
				bidDtlId: detail.bidDtlId,
				bidGroup: { id : detail.bidGroup, bidGroupName : bidGroup},
				bidName : detail.bidName,
				bidDesc : detail.bidDesc,
				windowLength: detail.windowLength,
				jobType: detail.jobType,
				bidType: detail.bidType,
				rounds: detail.rounds,
				shiftType: detail.shiftType,
				startDate: new Date(detail.startDate+' '+'00:00 AM'),
				endDate: new Date(detail.endDate+' '+'00:00 AM'),
				bidStartDate: new Date(detail.bidStartDate),
				bidEndDate: new Date(detail.bidEndDate),
				openTime: detail.openTime,
				airportCode: detail.airportCode,
				effectiveDate: new Date(detail.effectiveDate)
		}
		var saveBidDetails = sbdServices.saveBidDetail(details); 
		saveBidDetails.then(function(data){
			$('.bidDetailTbl').DataTable().clear().destroy();
			var getBidDetails = sbdServices.getBidDetail($scope.bidDetailSearch); 
			getBidDetails.then(function(data){
				$scope.bidDetail = {
						bidDetail: data
				}
				$scope.bidNameLst = data;
				$timeout( function(){		
					$('.bidDetailTbl').DataTable({
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
			}, function(msg){
				$scope.error = msg;
			});
			$('#bidDtlModal').modal('hide');		   
		}, function(msg){
			$scope.error = msg;
			$('#bidDtlModal').modal('hide');
		});
	}

	$scope.search = function(){
		$('.bidDetailTbl').DataTable().clear().destroy();
		var getBidDetails = sbdServices.getBidDetail($scope.bidDetailSearch); 
		getBidDetails.then(function(data){
			$scope.bidDetail = {
					bidDetail: data
			}
			$timeout( function(){		
				$('.bidDetailTbl').DataTable({
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
		});
	};

	$scope.clear = function(){
		$scope.bidDetailSearch = {
				bidId : 0,
				bidType :'',
				windowLength : 0,
				startDate : null,
				endDate : null
		};
		$('select').each(function () {
			this.find('option').attr("selected",false);
		});
	}

	$scope.deleteBidDetail = function(id){
		var bidDetail = {
				bidDtlId : id
		}
		var deleteBidDetails = sbdServices.deleteBidDetail(bidDetail); 
		deleteBidDetails.then(function(data){
			for(var i=$scope.bidDetail.bidDetail.length-1;i>=0;i--){
				if($scope.bidDetail.bidDetail[i].bidDtlId == id){
					$scope.bidDetail.bidDetail.splice(i,1);
					break;
				}
			}
			$('.bidDetailTbl').DataTable().clear().destroy();
			$timeout( function(){		
				$('.bidDetailTbl').DataTable({
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

		}, function(msg){
			$scope.error = msg;
		});
	}

	$scope.showParams = function(){
		$("#collapse").toggle();
		$("#expand").toggle();
		$('#searchParams').slideToggle('slow');

		$('#date_3 .input-group.date').datepicker({
			defaultViewDate : $scope.bidDetailSearch.startDate,
			todayBtn: "linked",
			keyboardNavigation: false,
			forceParse: false,
			autoclose: true,
			todayHighlight: true,
			calendarWeeks: true,
			format: 'mm-dd-yyyy'
		});

		if($scope.bidDetailSearch.startDate != null && $scope.bidDetailSearch.startDate != 'undefined' && $scope.bidDetailSearch.startDate != ''){
			$('#date_3 .input-group.date').data("datepicker")._setDate($scope.bidDetailSearch.startDate);
		}

		$('#date_4 .input-group.date').datepicker({
			defaultViewDate : $scope.bidDetailSearch.endDate,
			todayBtn: "linked",
			keyboardNavigation: false,
			forceParse: false,
			autoclose: true,
			todayHighlight: true,
			calendarWeeks: true,
			format: 'mm-dd-yyyy'
		});

		if($scope.bidDetailSearch.endDate != null && $scope.bidDetailSearch.endDate != 'undefined' && $scope.bidDetailSearch.endDate != ''){
			$('#date_4 .input-group.date').data("datepicker")._setDate($scope.bidDetailSearch.endDate);
		}
	};

	$scope.init = function(){
			$rootScope.jobType = [{opt:"FT"},{opt:"PT"}];
			$rootScope.biddingType = [{opt:"Live"},{opt:"Proxy"}];
			$rootScope.windowLength = [{opt:"2"},{opt:"5"},{opt:"10"}];
			var bg = bidGroupFactory.getBidGroup();
			bg.then(function(data){
				$rootScope.bidGroupLst = data;
			}, function(msg){
				$scope.error = msg;
			});
			$rootScope.airportCodeLst = [
			                          { name: 'ABQ'},
			                          { name: 'BOS'},
			                          { name: 'CLT'},
			                          { name: 'DFW'},
			                          { name: 'RDU'},
			                          { name: 'LAS'},
			                          { name: 'PHX'}
			                          ];
			$scope.bidNameLst = [
			                     {id: 8, name: '2017 ABQ-ABQ PS'},
			                     {id: 7, name: '2017 BOS-BOS PS'},
			                     {id: 6, name: '2017 CLT-CLT PS'},
			                     {id: 5, name: '2017 DFW-DFW PS'},
			                     {id: 1, name: '2017 RDU PS PT'},
			                     {id: 2, name: '2017 RDU FS'},
			                     {id: 3, name: '2017 RDU PS CLUB'},
			                     {id: 4, name: '2017 LAS FS FT'}
			                     ];
			$rootScope.bidDetails = {
					bidDtlId: 0,
					bidGroup: [],
					bidName : '',
					bidDesc : '',
					windowLength: 0,
					jobType: '',
					bidType: '',
					bidStartDate: '',
					bidEndDate: '',
					openTime: false,
					effectiveDate: '',
					airportCode: ''
			};
			$scope.bidDetailSearch = {
					bidId : 0,
					bidType :'',
					windowLength : 0,
					startDate : null,
					endDate : null
			};

		var getBidDetails = sbdServices.getBidDetail($scope.bidDetailSearch); 
		getBidDetails.then(function(data){
			$scope.bidDetail = {
					bidDetail: data
			}
			$scope.bidNameLst = data;
			$timeout( function(){				
				$('.bidDetailTbl').DataTable({
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
		}, function(msg){
			$scope.error = msg;
		});

		$("#searchParams").hide();
		$("#expand").hide();
	}
}
