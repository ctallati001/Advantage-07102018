var myApp = angular.module('myApp');

myApp.controller('adminVbEditCtrl', adminVbEditCtrl);
adminVbEditCtrl.$inject = ['$scope', '$rootScope', '$timeout', 'store', '$filter', 'bdServices', 'bidGroupFactory'];

function adminVbEditCtrl($scope, $rootScope, $timeout, store, $filter, bdServices, bidGroupFactory) {

	$rootScope.loading = true;
	var biddingMins = 5;
	$scope.CurrentDate = currentDate = new Date();
	$scope.nextDate = new Date();
	$scope.nextDate.setDate($scope.nextDate.getDate() + 1); 
	$scope.bidTargetTime = new Date(currentDate.getTime() + (biddingMins * 60 * 1000));
	$scope.vbBidResults =[
	                      {rank:"01",name:"John Doe",start:"04/20/2017 | 7:00",end:"04/30/2017 | 7:05",status:"Completed",weeksAwarded:"21,22,25,45"},
	                      {rank:"02",name:"Ashley Paul",start:"04/20/2017 | 7:05",end:"04/30/2017 | 7:10",status:"Completed",weeksAwarded:"23,52"},
	                      {rank:"03",name:"David Bell",start:"04/20/2017 | -:--",end:"04/30/2017 | 7.15",status:"Active",weeksAwarded:"--"},
	                      {rank:"04",name:"Ryan Hill",start:"04/20/2017 | 7:00",end:"04/30/2017 | 7:20",status:"Upcoming",weeksAwarded:"--"},
	                      {rank:"05",name:"Joseph Doe",start:"04/20/2017 | 7:00",end:"04/30/2017 | 7:25",status:"Upcoming",weeksAwarded:"--"}
	                      ];	


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

		var dt = new Date($scope.bidDetails.startDate);
		$('#bidDtlModal').modal('show');
		

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
	
	 $scope.formatDate = function(date){
         var dateOut = new Date(date);
         return dateOut;
   };
   
   $scope.saveBidDetails = function(){
	   var detail = $scope.bidDetails;
	   var bidGrpIds = detail.bidGroup;
	   var details = new Array(bidGrpIds.length);
	   for(i=0;i<bidGrpIds.length;i++){
		   var bidGroup = '';
		   for(var j=0; j<$scope.bidGroupLst.length; j++){
			   if(bidGrpIds[i] == $scope.bidGroupLst[j].id){
				   bidGroup = $scope.bidGroupLst[j].bidGroupName;
				   break;
			   }
		   }
		   details[i] = {
				   bidDtlId: detail.bidDtlId,
				   bidGrpId: bidGrpIds[i],
				   bidGrpName: bidGroup,
				   bidName : detail.bidName,
				   bidDesc : detail.bidDesc,
				   windowLength: detail.windowLength,
				   bidType: detail.bidType,
				   rounds: detail.rounds,
				   shiftType: detail.shiftType,
				   startDate: new Date(detail.startDate+' '+'00:00 AM'),
				   endDate: new Date(detail.endDate+' '+'00:00 AM'),
				   bidStartDate: new Date(detail.bidStartDate),
				   bidEndDate: new Date(detail.bidEndDate)
		   }
	   }
	   var saveBidDetails = bdServices.saveBidDetail(details); 
	   saveBidDetails.then(function(data){
		   $('.bidDetailTbl').DataTable().clear().destroy();
		   $scope.bidDetailSearch = {};
		   var getBidDetails = bdServices.getBidDetail($scope.bidDetailSearch); 
		   getBidDetails.then(function(data){
			   $scope.bidDetail = {
					   bidDetail: data
			   }
			   $scope.bidNameLst = data;
			   $timeout( function(){		
				   $('.bidDetailTbl').DataTable({
					   dom: '<"html5buttons"B>lTfgitp',
					   "columnDefs": [ {
						   "targets": 7,
						   "sortable": false
					   } ],
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
		var getBidDetails = bdServices.getBidDetail($scope.bidDetailSearch); 
		getBidDetails.then(function(data){
			$scope.bidDetail = {
					bidDetail: data
				}
			$timeout( function(){		
					$('.bidDetailTbl').DataTable({
				dom: '<"html5buttons"B>lTfgitp',
				"columnDefs": [ {
					"targets": 7,
					"sortable": false
					} ],
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
				shiftType : '',
				windowLength : 0,
				rounds : 0,
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
		var deleteBidDetails = bdServices.deleteBidDetail(bidDetail); 
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
			"columnDefs": [ {
				"targets": 7,
				"sortable": false
				} ],
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
		$timeout(function(){
			$("#searchParams").hide();
			$("#expand").hide();
		},500);
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
		$scope.bidDetails = {
				bidDtlId: '',
				bidGroup: [],
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
		$scope.bidDetailSearch = {
				bidId : 0,
				bidType :'',
				shiftType : '',
				windowLength : 0,
				rounds : 0,
				startDate : null,
				endDate : null
		};
		var getBidDetails = bdServices.getBidDetail($scope.bidDetailSearch); 
		getBidDetails.then(function(data){
			$scope.bidDetail = {
				bidDetail: data
			}
			$scope.bidNameLst = data;
			$timeout( function(){				
			$('.bidDetailTbl').DataTable({
					dom: '<"html5buttons"B>lTfgitp',
					"columnDefs": [ {
						"targets": 7,
						"sortable": false
					} ],
					
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

}


