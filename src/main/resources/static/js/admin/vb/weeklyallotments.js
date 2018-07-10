(function() {

	'use strict';

	angular
	.module('myApp')
	.controller('weeklyallotmentsCtrl', weeklyallotmentsCtrl);
	
	weeklyallotmentsCtrl.$inject = ['$scope', '$rootScope', '$http', '$timeout', 'vbWeeklyAllotmentFactory', 'bdServices', 'calendarFactory'];
	
	function weeklyallotmentsCtrl($scope, $rootScope, $http, $timeout, vbWeeklyAllotmentFactory, bdServices, calendarFactory) {

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

		$rootScope.changeBidDtl=function(val){
			$('.dataTables-example').DataTable().clear().destroy();
			$scope.getWeeklyAllotment(val);

		}

		$.fn.dataTable.ext.order['dom-text'] = function  ( settings, col )
		{
			return this.api().column( col, {order:'index'} ).nodes().map( function ( td, i ) {
				return $('input', td).val();
			} );
		}

		$scope.getWeeklyAllotment = function(ind){
			var weeklyAllotments = vbWeeklyAllotmentFactory.getWeeklyAllotment(ind);
			weeklyAllotments.then(function(data){
				if(data.length>0){
					$scope.weeklyAllotments = data;
					$timeout(function(){
						$('.dataTables-example').DataTable({
							pageLength: 10,
							responsive: true,
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
				else{
					var start = '';
					var end = '';
					angular.forEach($scope.bidDetailLst, function(b){
						if(b.bidDtlId == ind){
							start = new Date(b.startDate);
							end = new Date(b.endDate);
						}
					});
					if(start == ''){
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
							angular.forEach($scope.bidDetailLst, function(b){
								if(b.bidDtlId == ind){
									start = new Date(b.startDate);
									end = new Date(b.endDate);
								}
							});

							var weeklyALt = [];
							for(var i=1; i<53; i++){
								var dt = calendarFactory.getWeekStartDate(start.getFullYear(), i);
								var edt = calendarFactory.getWeekEndDate(start.getFullYear(), i);
								if(dt>=start && dt<=end){
									var wk = {
											weekNumber: i,
											bidDtlId: ind,
											startDate: dt.startOf('day').format('MM-DD-YYYY'),
											endDate: edt.startOf('day').format('MM-DD-YYYY'),
											slotsAvailable: 0,
											slotsAvailableMon: 0,
											slotsAvailableTue:0,
											slotsAvailableWed:0,
											slotsAvailableThu:0,
											slotsAvailableFri:0,
											slotsAvailableSat:0,
											slotsAvailableSun:0
									}
									weeklyALt.push(wk);
								}
							}

							$scope.weeklyAllotments = weeklyALt;
							$timeout(function(){
								$('.dataTables-example').DataTable({
									pageLength: 10,
									responsive: true,
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
					}
					else{
						var weeklyALt = [];
						for(var i=1; i<53; i++){
							var dt = calendarFactory.getWeekStartDate(start.getFullYear(), i);
							var edt = calendarFactory.getWeekEndDate(start.getFullYear(), i);
							if(dt>=start && dt<=end){
								var wk = {
										weekNumber: i,
										bidDtlId: ind,
										startDate: dt.startOf('day').format('MM-DD-YYYY'),
										endDate: edt.startOf('day').format('MM-DD-YYYY'),
										slotsAvailable: 0,
										slotsAvailableMon: 0,
										slotsAvailableTue:0,
										slotsAvailableWed:0,
										slotsAvailableThu:0,
										slotsAvailableFri:0,
										slotsAvailableSat:0,
										slotsAvailableSun:0
								}
								weeklyALt.push(wk);
							}
						}

						$scope.weeklyAllotments = weeklyALt;
						$timeout(function(){
							$('.dataTables-example').DataTable({
								pageLength: 10,
								responsive: true,
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
				}
			});
		}
		$scope.getWeeklyAllotment(0);
		$scope.object=[];
		$scope.listObj=[];
		$scope.object={};



		$scope.saveAllotments=function(){
			angular.forEach($scope.weeklyAllotments, function(allotment){
				allotment.startDate = moment(allotment.startDate).format('YYYY-MM-DD');
				allotment.endDate = moment(allotment.endDate).format('YYYY-MM-DD');
				allotment.slotsAvailableMon = allotment.slotsAvailable;
				allotment.slotsAvailableTue = allotment.slotsAvailable;
				allotment.slotsAvailableWed = allotment.slotsAvailable;
				allotment.slotsAvailableThu = allotment.slotsAvailable;
				allotment.slotsAvailableFri = allotment.slotsAvailable;
				allotment.slotsAvailableSat = allotment.slotsAvailable;
				allotment.slotsAvailableSun = allotment.slotsAvailable;
				allotment.slotsRemaining = allotment.slotsRemaining > 0 ? allotment.slotsRemaining : allotment.slotsAvailable;
				allotment.slotsRemainingMon = allotment.slotsRemainingMon > 0 ? allotment.slotsRemainingMon : allotment.slotsAvailable;
				allotment.slotsRemainingTue = allotment.slotsRemainingTue > 0 ? allotment.slotsRemainingTue : allotment.slotsAvailable;
				allotment.slotsRemainingWed = allotment.slotsRemainingWed > 0 ? allotment.slotsRemainingWed : allotment.slotsAvailable;
				allotment.slotsRemainingThu = allotment.slotsRemainingThu > 0 ? allotment.slotsRemainingThu : allotment.slotsAvailable;
				allotment.slotsRemainingFri = allotment.slotsRemainingFri > 0 ? allotment.slotsRemainingFri : allotment.slotsAvailable;
				allotment.slotsRemainingSat = allotment.slotsRemainingSat > 0 ? allotment.slotsRemainingSat : allotment.slotsAvailable;
				allotment.slotsRemainingSun = allotment.slotsRemainingSun > 0 ? allotment.slotsRemainingSun : allotment.slotsAvailable;
			});
			var save = vbWeeklyAllotmentFactory.saveWeeklyAllotment($scope.weeklyAllotments);
			save.then(function(){
				$('.dataTables-example').DataTable().clear().destroy();
				$scope.getWeeklyAllotment($scope.bidDtlId);
				$scope.showNotification('Weekly Allotments Updated.');
			});
		}

		$('.toast-close-button').click(function(){
			$('#toast-container').hide();
			
		});
		
		$scope.showNotification = function(msg){
			$('.toast-message').text(msg);
			$('#toast-container').fadeIn(1000).fadeOut(60000);
		}

	}
})()
