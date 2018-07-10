
var myApp = angular.module('myApp');

myApp.controller('prefCtrl', prefCtrl);
prefCtrl.$inject = ['$scope', '$rootScope', '$location', 'NgTableParams', 'sbDataFactory','$timeout', '$interval', '$filter', 'store','$window', 'sbdServices', 'empInfoFactory'];

function prefCtrl($scope, $rootScope, $location, NgTableParams, sbDataFactory, $timeout, $interval, $filter, store,$window, sbdServices, empInfoFactory) {
	$scope.loading = true;
	var biddingMins = 5;
	$scope.myDate = new Date();
	$scope.CurrentDate = currentDate = new Date();
	$scope.CurrentDate = new Date(currentDate.getTime() + (120 * 60 * 1000));
	$scope.nextDate = new Date();
	$scope.nextDate.setDate($scope.nextDate.getDate() + 1); 
	$scope.bidTargetTime = new Date(currentDate.getTime() + ((biddingMins+120) * 60 * 1000))
	$scope.demoObj = {};
	$rootScope.addPreference = [];
	$scope.showSuccessAlert = false;
	$scope.filtPanel = false;
	$rootScope.userSelectedRow = null;
	$rootScope.disableRowSelection = false;
	$scope.isPref = true;

	$scope.bidDetailSearch = {};
	var getBidDetails = sbdServices.getBidDetail($scope.bidDetailSearch); 
	getBidDetails.then(function(data){
		$scope.bidDetailLst = data;
	});

	var tour = new Tour({
		debug: true,
		storage: false,
		steps: [
		        {
		        	element: "#step1",
		        	title: "Step1",
		        	placement:"left", 
		        	content: "Select Bid Details",
		        	backdrop: true,
		        	backdropContainer: '#wrapper',
		        	onShown: function (tour){
		        		$('body').addClass('tour-open')
		        	},
		        	onHidden: function (tour){
		        		$('body').removeClass('tour-close')
		        	},
		        },
		        {
		        	element: "#step2",
		        	title: "Step2",
		        	placement:"left",
		        	content: "Select to Show/Hide Filters",
		        	backdrop: true,
		        	backdropContainer: '#wrapper',
		        	onShown: function (tour){
		        		$('body').addClass('tour-open')
		        	},
		        	onHidden: function (tour){
		        		$('body').removeClass('tour-close')
		        	},
		        },

		        {
		        	element: "#step3",
		        	title: "Step3",
		        	placement:"left",
		        	content:'Slide to select Time Range',
		        	backdrop: true,
		        	backdropContainer: '#wrapper',
		        	onShown: function (tour){
		        		$('body').addClass('tour-open')
		        	},
		        	onHidden: function (tour){
		        		$('body').removeClass('tour-close')
		        	},

		        },
		        {
		        	element: "#step4",
		        	title: "Step4",
		        	placement:"right",
		        	content:'Select OFF Days',
		        	backdrop: true,
		        	backdropContainer: '#wrapper',
		        	onShown: function (tour){
		        		$('body').addClass('tour-open')
		        	},
		        	onHidden: function (tour){
		        		$('body').removeClass('tour-close')
		        	},

		        },
		        {
		        	element: "#step5",
		        	title: "Step5",
		        	placement:"top",
		        	content:'Select the type of Shift',
		        	backdrop: true,
		        	backdropContainer: '#wrapper',
		        	onShown: function (tour){
		        		$('body').addClass('tour-open')
		        	},
		        	onHidden: function (tour){
		        		$('body').removeClass('tour-close')
		        	},

		        },
		        {
		        	element: "#step6",
		        	title: "Step6",
		        	placement:"top",
		        	content:'Select Location',
		        	backdrop: true,
		        	backdropContainer: '#wrapper',
		        	onShown: function (tour){
		        		$('body').addClass('tour-open')
		        	},
		        	onHidden: function (tour){
		        		$('body').removeClass('tour-close')
		        	},

		        },
		        {
		        	element: "#step7",
		        	title: "Step7",
		        	placement:"left",
		        	content:'Select Break Option',
		        	backdrop: true,
		        	backdropContainer: '#wrapper',
		        	onShown: function (tour){
		        		$('body').addClass('tour-open')
		        	},
		        	onHidden: function (tour){
		        		$('body').removeClass('tour-close')
		        	},

		        },
		        {
		        	element: "#step8",
		        	title: "Step8",
		        	placement:"right",
		        	content:'Select the Buddy to view their Preferences',
		        	backdrop: true,
		        	backdropContainer: '#wrapper',
		        	onShown: function (tour){
		        		$('body').addClass('tour-open')
		        	},
		        	onHidden: function (tour){
		        		$('body').removeClass('tour-close')
		        	},

		        },
		        {
		        	element: "#step9",
		        	title: "Step9",
		        	placement:"right",
		        	content:'Click Save Filters to Save the Preferences',
		        	backdrop: true,
		        	backdropContainer: '#wrapper',
		        	onShown: function (tour){
		        		$('body').addClass('tour-open')
		        	},
		        	onHidden: function (tour){
		        		$('body').removeClass('tour-close')
		        	},

		        },
		        {
		        	element: "th:last-of-type",
		        	title: "Step10",
		        	placement: 'top',
		        	content: "You can prioritize your Preferences by clicking + or - symbol.",
		        	backdrop: true,
		        	onShown: function (tour) {
		        		$('.tour-step-background').height($('table').height());
		        		$('table th:nth-of-type(11), table td:nth-of-type(11)').css('position', 'relative');
		        		$('table th:nth-of-type(11), table td:nth-of-type(11)').css('z-index', '1000111');
		        	}
		        }        

		        ]});


	$scope.startTheTour = function(){
		tour.init();
		tour.restart();

	}	

	$scope.oldrecords = {
			scheduleLines: []
	}

	$scope.intervalFunction = function() {
		sbdServices.setBidDtlId($scope.sbBidDtlId);
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

	$scope.prefinit = function() {
		if ($scope.intervalObj)
			$interval.cancel($scope.intervalObj);
	}

	$scope.resultinit = function() {
		if ($scope.intervalObj)
			$interval.cancel($scope.intervalObj);
	}

	$scope.refresh = function() {
		$scope.records = null;
		sbDataFactory.getData().then(function(response) {
				angular.forEach(response.data, function(data){
					if(data.bidDtlId == $scope.sbBidDtlId){
						$scope.records = data;
					}				
				});
				angular.forEach($scope.records.scheduleLines, function(detail){
					if(detail.prefNum == 0){
						detail.prefNum = null;
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
						detail.prefNum = null;
					}
				});
				var empinfo = empInfoFactory.getBuddyInfo($rootScope.profile.empId);
				empinfo.then(function(response){
					$scope.buddies = response;
					angular.forEach($scope.records.scheduleLines, function(detail){
						if(detail.isPref){
							var assignees = [];
							if(detail.winner){
								angular.forEach(detail.winner, function(assignee){
									if(_.findWhere($scope.buddies, {name: assignee}) || $rootScope.profile.name == assignee){
										assignees.push(assignee);
									}
								});
								detail.winner = assignees;
							}
						}
					});
				});
			if($scope.records){
				$scope.recScheduleLine = $.extend(true, [], $scope.records.scheduleLines);
			}
			$scope.loading = false;
			$('.loaderDiv_pref, .loaderDiv_bid').hide();
		}, function(error) {
			$scope.status = 'Unable to load customer data: ' + error.message;
		});		
	};

	$scope.init = function() {
		var id = sbdServices.getBidDtlId();
		if(id){
			$scope.sbBidDtlId=id;
			$scope.intervalFunction();
		}
	};

	$scope.sweetAlertForSaveAndUpdate =  function (message) {
		swal({
			title: message,
			type: "success"
		});

	};


	$scope.getSelectedVal = function(coll){
		var o_coll =[];
		angular.forEach(coll,function(key,val){
			if(key.selected==true)
				o_coll.push(key.opt);
		});
		return o_coll;
	}



	$scope.savePreferences = function() {
		angular.forEach($scope.records.scheduleLines, function(lines){
			if(lines.prefNum && lines.prefNum !=0){
				var obj = {
						empName: $rootScope.profile.name,
						empId: $rootScope.profile.empId,
						lineId: lines.lineId,
						prefNumber: lines.prefNum
				};
				sbDataFactory.savePreferences(obj);
			}
		});

		if($rootScope.nobidding){
			$scope.clearFilter();
//			$location.path("/bidresults");
		} else {
//			$location.path("/livebidding");
			ga('send', 'event', 'SB', 'PreferenceSave');
		}
		$scope.sweetAlertForSaveAndUpdate("Preferences Saved");
	};

	$scope.init();

	$scope.closeTimeoutModal = function() {
		$('#sessionTimeOutModal').on('hidden.bs.modal',  function ()  {
			$scope.goToBidResults();
		});
		$('#sessionTimeOutModal').modal('hide');
	}
	$scope.goToBidResults = function() {
		$location.path('/bidresults');
	}

	$scope.openFinishModal = function() {
		$('#finishScreenModal').modal('show');
	}

	$scope.getClass = function(ch) {
		if(ch.opt=='Regular')
			return 'yellow-bg';
		else if (ch.opt=='Variable')
			return 'lazur-bg';
		else 
			return 'navy-bg';
	}

	$scope.closeFinishModal = function() {
		sbDataFactory.saveChoice(data).then(function(response) {
			// this callback will be called asynchronously
			// when the response is available
			ga = window.ga || gaInit();
			ga('send', 'event', 'SB', 'Choice', 'Save');
			$scope.refresh();
		}, function errorCallback(response) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
		});;

		$('#finishScreenModal').on('hidden.bs.modal',  function ()  {
//			$scope.goToBidResults();
		});
		$('#finishScreenModal').modal('hide');
	}

	$scope.initDatatable = function(){
		$('#dataTableFilter').DataTable({
			dom: '<"html5buttons"B>lTfgitp',
			"columnDefs": [ {
				"targets": 10,
				"sortable": false
			} ],
			"columns": [{ "width": "5%" , targets : 0},
			            { "width": "5%" , targets : 1},
			            { "width": "10%" , targets : 2},
			            { "width": "10%" , targets : 3},
			            { "width": "10%" , targets : 4},
			            { "width": "10%" , targets : 5},
			            { "width": "10%" , targets : 6},
			            { "width": "10%" , targets : 7},
			            { "width": "10%" , targets : 8},
			            { "width": "10%" , targets : 9},
			            { "width": "10%" , targets : 10}],
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
	}

	$scope.destroyDatatable = function(){
		$('#dataTableFilter').DataTable().destroy();
		$scope.initDatatable();
	}
}
