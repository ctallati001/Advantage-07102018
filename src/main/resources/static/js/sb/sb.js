var myApp = angular.module('myApp');

myApp.controller('sbCtrl', sbCtrl);
sbCtrl.$inject = ['$scope', '$rootScope', '$location', 'NgTableParams', 'sbDataFactory','$timeout', '$interval', '$filter', 'store','SocketService'];
function sbCtrl($scope, $rootScope, $location, NgTableParams, sbDataFactory, $timeout, $interval, $filter, store, SocketService) {
    $scope.loading = true;
    var biddingMins = 5;
    $scope.CurrentDate = currentDate = new Date();
    $scope.nextDate = new Date();
    $scope.nextDate.setDate($scope.nextDate.getDate() + 1); 
    $scope.bidTargetTime = new Date(currentDate.getTime() + (biddingMins * 60 * 1000))
    $scope.demoObj = {};
    $rootScope.addPreference = [];
    $scope.oldrecords = {
        scheduleLines: []
    }
    $scope.messages = [];

    $scope.intervalFunction = function() {
        $scope.initSlider();
        $scope.refresh();
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

    $scope.filterSearch = function() {
        timeRangeFilter();
    }
    
    SocketService.receive().then(null, null, function(message) {
    	//$scope.messages.push(message.body);
    	//$scope.handleSbData(message);
     });
    
    $scope.handleSbData = function(data){
        $rootScope.records = data;
		$scope.scheduleLines = $scope.records.scheduleLines;
        $scope.loading = false;
        $('.loaderDiv_pref, .loaderDiv_bid').hide();
        if (!(angular.equals($rootScope.records, $scope.oldrecords))) {
            $scope.oldrecords = $rootScope.records;
            if($rootScope.sbUserPreference && $rootScope.sbUserPreference.length>0){
        	    var arrayLength2 = $rootScope.records.scheduleLines.length;
            	for (var ij = 0; ij < arrayLength2; ij++) {
            	    var obj2 = $rootScope.records.scheduleLines[ij];
            	    if($rootScope.sbUserPreference[obj2.lineId]){
            	    	obj2.preference=$rootScope.sbUserPreference[obj2.lineId];
            	    }
            	}
            }
            $timeout(function(){
				$scope.initDatatable();
			},50);
            $scope.getLocation();
            //https://github.com/ifightcrime/bootstrap-growl
            //if ($rootScope.selection != 'signin')
              //  $.bootstrapGrowl("Updated", { delay: 500 });
        }
    
    }
    
    $scope.refresh = function() {
        sbDataFactory.getData().then(function(response) {
        	$scope.handleSbData(response.data);
        }, function(error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
    };

    $scope.initSlider = function() {
        $("#slider-range,#slider-range2,#slider-range3,#slider-range4,#slider-range5,#slider-range6").slider({
            range: true,
            min: 0,
            max: 1440,
            step: 15,
            values: [0, 1440],
            slide: function(e, ui) {
                var hours1 = ''+Math.floor(ui.values[0] / 60);
                var minutes1 = ''+(ui.values[0] - (hours1 * 60));

                if (hours1.length == 1) hours1 = '0' + hours1;
                if (minutes1.length == 1) minutes1 = '0' + minutes1;
                if (minutes1 == 0) minutes1 = '00';


                $(this).parent().parent().find('.slider-time').html(hours1 + minutes1);
                    $scope.tableParams.filter().ctFilter = null;
                    if ($(this).attr('id') == "slider-range" || $(this).attr('id') == "slider-range3") {
                        $scope.tableParams.filter().startTimeFrom = Number(hours1 + minutes1);
                    } 
                    
                    else {
                        $scope.tableParams.filter().endTimeFrom = Number(hours1 + minutes1);
                    }

                var hours2 = ''+Math.floor(ui.values[1] / 60);
                var minutes2 = ''+(ui.values[1] - (hours2 * 60));

                if (hours2.length == 1) hours2 = '0' + hours2;
                if (minutes2.length == 1) minutes2 = '0' + minutes2;
                if (minutes2 == 0) minutes2 = '00';
                
                $(this).parent().parent().find('.slider-time2').html(hours2 + minutes2);
                    $scope.tableParams.filter().ctFilter = null;
                    if ($(this).attr('id') == "slider-range" || $(this).attr('id') == "slider-range3") {
                        $scope.tableParams.filter().startTimeTo = Number(hours2 + ':' + minutes2);
                    } else {
                        $scope.tableParams.filter().endTimeTo = Number(hours2 + ':' + minutes2);
                    }
            }
        });
    }

    $scope.init = function() {
    	if(!$rootScope.profile){
    		$rootScope.profile = store.getSession('profile');
    	}
        $scope.intervalFunction();
    };
    
    $scope.offdays = [{
		opt:"Mon",
		selected:false
	},{
		opt:"Tue",
		selected:false
	},{
		opt:"Wed",
		selected:false
	},{
		opt:"Thu",
		selected:false
	},{
		opt:"Fri",
		selected:false
	},{
		opt:"Sat",
		selected:false
	},{
		opt:"Sun",
		selected:false
	}];

     
    $scope.getLocation = function(){
		$scope.location = [];
		angular.forEach($rootScope.records.scheduleLines,function(key,index){
			$scope.location.push({"opt":key["label"],"selected":false})
		});
	}

	$scope.shiftType = [{
		opt:"Regular",
		selected:false
	},{
		opt:"Variable",
		selected:false
	},{
		opt:"Flex",
		selected:false
	},{
		opt:"Rotating",
		selected:false
	}];
	$scope.breakOption = [{
		opt:"All",
		title:"All",
		selected:false
	},{
		opt:"0",
		title:"0 min",
		selected:false
	},{
		opt:"15",
		title:"15 min",
		selected:false
	},{
		opt:"30",
		title:"30 min",
		selected:false
	},{
		opt:"60",
		title:"60 min",
		selected:false
	}];

 	$scope.selectedBreakOpt ='all';
 	$scope.selectedLocation = "Ramp FT1";  
 	$scope.stTimeFromCriteria = 0;
 	$scope.endTimeFromCriteria = 0;
 	$scope.stTimeToCriteria = 2359;
 	$scope.endTimeToCriteria = 2359;
 	
    $scope.initCtFilter = function(){
	    if($rootScope.ctFilterObj && $rootScope.ctFilterObj.length>0 ){
	        angular.forEach($rootScope.ctFilterObj,function(key,idx){
	            key.selected = false;
	        });
	    }     
	}
    $scope.applyCtFilter = function(index){
	    console.log('checkbox apply filter');
	    angular.forEach($rootScope.ctFilterObj,function(key,idx){
	        if(idx != index)
	            key.selected = false;
	    });
	    
	    $scope.tableParams.filter().ctFilter = $rootScope.ctFilterObj[index];
	}
    
    $scope.applyCtFilterLive = function(){
		$scope.filterApplied = true;
		console.log('filter1:'+new Date());
		var shifts = new Array();
		angular.forEach($scope.shiftType, function(shift){
			if(shift.selected==true && shift.opt == 'Regular'){
				shifts.push('REG');
			}
			if(shift.selected==true && shift.opt == 'Flex'){
				shifts.push('FLEX');
			}
			if(shift.selected==true && shift.opt == 'Variable'){
				shifts.push('VAR');
			}
			if(shift.selected==true && shift.opt == 'Rotating'){
				shifts.push('ROT');
			}
		});
		var locations = new Array();
		angular.forEach($scope.location, function(location){
			if(location.selected==true){
				locations.push(location.opt);
			}
		});

		$scope.scheduledLines = [];
		angular.forEach($scope.scheduleLines, function(line){
			var addLine = true;
			if(shifts.length>0 && $.inArray(line.tag, shifts) < 0 && addLine){
				addLine = false;
			}
			if(locations.length>0 && $.inArray(line.label, locations) < 0 && addLine){
				addLine = false;
			}
			var addDay = false;
			var ofDay = false;

			angular.forEach($scope.offdays, function(offDay){
				if(offDay.selected == true && !addDay){
					ofDay = true;
					angular.forEach(line.Mon, function(day){
						if(offDay.opt == 'Mon' && day.break == 'Off'){
							addDay = true;
						}
					});
					angular.forEach(line.Tue, function(day){
						if(offDay.opt == 'Tue' && day.break == 'Off'){
							addDay = true;
						}
					});
					angular.forEach(line.Wed, function(day){
						if(offDay.opt == 'Wed' && day.break == 'Off'){
							addDay = true;
						}
					});
					angular.forEach(line.Thu, function(day){
						if(offDay.opt == 'Thu' && day.break == 'Off'){
							addDay = true;
						}
					});
					angular.forEach(line.Fri, function(day){
						if(offDay.opt == 'Fri' && day.break == 'Off'){
							addDay = true;
						}
					});
					angular.forEach(line.Sat, function(day){
						if(offDay.opt == 'Sat' && day.break == 'Off'){
							addDay = true;
						}
					});
					angular.forEach(line.Sun, function(day){
						if(offDay.opt == 'Sun' && day.break == 'Off'){
							addDay = true;
						}
					});
				}
			});
			if(!ofDay){
				addDay = true;
			}

			var addBrk = false;
			var brkOpt = false;
			angular.forEach($scope.breakOption, function(brk){
				if(brk.selected == true && !addBrk){
					brkOpt = true;
					angular.forEach(line.Mon, function(day){
						if(day.break != 'Off' && ((brk.opt == '0' && day.break == 'U00') ||
								(brk.opt == '15' && day.break == 'U15') ||
								(brk.opt == '30' && day.break == 'U30') ||
								(brk.opt == '60' && day.break == 'U60') ||
								(brk.opt == 'All'))){
							addBrk = true;
						}
					});
					angular.forEach(line.Tue, function(day){
						if(day.break != 'Off' && ((brk.opt == '0' && day.break == 'U00') ||
								(brk.opt == '15' && day.break == 'U15') ||
								(brk.opt == '30' && day.break == 'U30') ||
								(brk.opt == '60' && day.break == 'U60') ||
								(brk.opt == 'All'))){
							addBrk = true;
						}
					});
					angular.forEach(line.Wed, function(day){
						if(day.break != 'Off' && ((brk.opt == '0' && day.break == 'U00') ||
								(brk.opt == '15' && day.break == 'U15') ||
								(brk.opt == '30' && day.break == 'U30') ||
								(brk.opt == '60' && day.break == 'U60') ||
								(brk.opt == 'All'))){
							addBrk = true;
						}
					});
					angular.forEach(line.Thu, function(day){
						if(day.break != 'Off' && ((brk.opt == '0' && day.break == 'U00') ||
								(brk.opt == '15' && day.break == 'U15') ||
								(brk.opt == '30' && day.break == 'U30') ||
								(brk.opt == '60' && day.break == 'U60') ||
								(brk.opt == 'All'))){
							addBrk = true;
						}
					});
					angular.forEach(line.Fri, function(day){
						if(day.break != 'Off' && ((brk.opt == '0' && day.break == 'U00') ||
								(brk.opt == '15' && day.break == 'U15') ||
								(brk.opt == '30' && day.break == 'U30') ||
								(brk.opt == '60' && day.break == 'U60') ||
								(brk.opt == 'All'))){
							addBrk = true;
						}
					});
					angular.forEach(line.Sat, function(day){
						if(day.break != 'Off' && ((brk.opt == '0' && day.break == 'U00') ||
								(brk.opt == '15' && day.break == 'U15') ||
								(brk.opt == '30' && day.break == 'U30') ||
								(brk.opt == '60' && day.break == 'U60') ||
								(brk.opt == 'All'))){
							addBrk = true;
						}
					});
					angular.forEach(line.Sun, function(day){
						if(day.break != 'Off' && ((brk.opt == '0' && day.break == 'U00') ||
								(brk.opt == '15' && day.break == 'U15') ||
								(brk.opt == '30' && day.break == 'U30') ||
								(brk.opt == '60' && day.break == 'U60') ||
								(brk.opt == 'All'))){
							addBrk = true;
						}
					});
				}
			});

			if(!brkOpt){
				addBrk = true;
			}

			var addTime = false;
			var timeOpt = false;

			if($scope.stTimeToCriteria != '2359' ||  $scope.stTimeFromCriteria != '0'
				||  $scope.endTimeToCriteria != '2359' ||  $scope.endTimeFromCriteria != '0'){
				timeOpt = true;
				angular.forEach(line.Mon, function(day){
					if(day.shiftStart >= $scope.stTimeFromCriteria && day.shiftStart <= $scope.stTimeToCriteria
							&& day.shiftEnd >= $scope.endTimeFromCriteria && day.shiftEnd <= $scope.endTimeToCriteria){
						addTime = true;

						console.log('time range:'+new Date());
					}
				});
				angular.forEach(line.Tue, function(day){
					if(day.shiftStart >= $scope.stTimeFromCriteria && day.shiftStart <= $scope.stTimeToCriteria
							&& day.shiftEnd >= $scope.endTimeFromCriteria && day.shiftEnd <= $scope.endTimeToCriteria){
						addTime = true;
					}
				});
				angular.forEach(line.Wed, function(day){
					if(day.shiftStart >= $scope.stTimeFromCriteria && day.shiftStart <= $scope.stTimeToCriteria
							&& day.shiftEnd >= $scope.endTimeFromCriteria && day.shiftEnd <= $scope.endTimeToCriteria){
						addTime = true;
					}
				});
				angular.forEach(line.Thu, function(day){
					if(day.shiftStart >= $scope.stTimeFromCriteria && day.shiftStart <= $scope.stTimeToCriteria
							&& day.shiftEnd >= $scope.endTimeFromCriteria && day.shiftEnd <= $scope.endTimeToCriteria){
						addTime = true;
					}
				});
				angular.forEach(line.Fri, function(day){
					if(day.shiftStart >= $scope.stTimeFromCriteria && day.shiftStart <= $scope.stTimeToCriteria
							&& day.shiftEnd >= $scope.endTimeFromCriteria && day.shiftEnd <= $scope.endTimeToCriteria){
						addTime = true;
					}
				});
				angular.forEach(line.Sat, function(day){
					if(day.shiftStart >= $scope.stTimeFromCriteria && day.shiftStart <= $scope.stTimeToCriteria
							&& day.shiftEnd >= $scope.endTimeFromCriteria && day.shiftEnd <= $scope.endTimeToCriteria){
						addTime = true;
					}
				});
				angular.forEach(line.Sun, function(day){
					if(day.shiftStart >= $scope.stTimeFromCriteria && day.shiftStart <= $scope.stTimeToCriteria
							&& day.shiftEnd >= $scope.endTimeFromCriteria && day.shiftEnd <= $scope.endTimeToCriteria){
						addTime = true;
					}
				});
			}

			if(!timeOpt){
				addTime = true;
			}
			if(addLine && addDay && addBrk && addTime){
				$scope.scheduledLines.push(line);
			}
		});	 

		console.log('filter2:'+new Date());
		$('#dataTableResult').DataTable().clear().destroy();

		$scope.records.scheduleLines = $scope.scheduledLines;
		
		$timeout(function(){
			$scope.initDatatable();
		},50);    	
    };
    
    $scope.showSuccessAlert = false;
    $scope.init();
    $scope.days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    $rootScope.userSelectedRow = null;
    $rootScope.disableRowSelection = false;
    $scope.closeTimeoutModal = function() {
        ga('send', 'event', 'SB', 'Timeout');
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
    $scope.closeFinishModal = function() {
        ga('send', 'event', 'SB-Bid',$rootScope.userSelectedRow.label);
        sbDataFactory.saveChoice().then(function(response) {
	            // this callback will be called asynchronously
	            // when the response is available
	            $scope.refresh();
	        }, function errorCallback(response) {
	            // called asynchronously if an error occurs
	            // or server returns response with an error status.
	        });
	
	        $('#finishScreenModal').on('hidden.bs.modal',  function ()  {
	            $scope.goToBidResults();
	        });
	        $('#finishScreenModal').modal('hide');
        }
	$scope.initDatatable = function(){
		$('#dataTableResult').DataTable(
				{
					"dom" : '<"html5buttons"B>lTfgitp',
					"columns" : [ {
						"width" : "10%",
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


