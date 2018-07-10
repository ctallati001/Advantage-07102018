var myApp = angular.module('myApp');

myApp.controller('sbFilterCtrl', sbFilterCtrl);
sbFilterCtrl.$inject = ['$scope', '$rootScope', '$location', 'NgTableParams', '$timeout', '$filter', '$window'];

function sbFilterCtrl($scope, $rootScope, $location, NgTableParams, $timeout, $filter, $window) {
	$rootScope.addPreference = [];
	$scope.oldrecords = { scheduleLines: [] };
	$scope.sliderValue = 10;
	$scope.filtPanel = false;
	$scope.days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
	$rootScope.userSelectedRow = null;
	$rootScope.disableRowSelection = false;
	
	$scope.lineNumbers=[];
	$scope.init = function() {
		$scope.initSlider();
		$scope.loadLocationEnum();
	};
	
	$scope.applySelectedFilter = function(index){
		if($rootScope.ctFilterObj[index].selected){
			$scope.offdays = angular.copy($rootScope.ctFilterObj[index].offDays);
			$scope.shiftType = angular.copy($rootScope.ctFilterObj[index].shiftType);
			$scope.breakOption = angular.copy($rootScope.ctFilterObj[index].breakOption);
			$scope.location = angular.copy($rootScope.ctFilterObj[index].location);
			$scope.stTimeFromCriteria = angular.copy($rootScope.ctFilterObj[index].startFrom);
			$scope.endTimeFromCriteria = angular.copy($rootScope.ctFilterObj[index].endFrom);
			$scope.stTimeToCriteria = angular.copy($rootScope.ctFilterObj[index].startTo);
			$scope.endTimeToCriteria = angular.copy($rootScope.ctFilterObj[index].endTo);
			$scope.lineNumbers = angular.copy($rootScope.ctFilterObj[index].lineId);
			$scope.applyCtFilterLive();
		}
		else{
			$scope.clearFilter();
		}
	}

	$scope.handleSbData = function(data) {};

	
	$scope.slideChanged = function (value){
        $scope.valueChangedEvent = $scope.sliderValue;
        $scope.$$phase || $scope.$apply();
        console.log('Slider 1 changed: %o', value);
	};
			
	$scope.initSlider = function() {
		$("#slider-range5,#slider-range6").slider({
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
				if($(this).attr('id') == "slider-range5"){
					$scope.stTimeFromCriteria  =  Number(hours1 + minutes1);
				}
				else if($(this).attr('id') == "slider-range6"){
					$scope.endTimeFromCriteria  =  Number(hours1 +minutes1); 
				}

				var hours2 = ''+Math.floor(ui.values[1] / 60);
				var minutes2 = ''+(ui.values[1] - (hours2 * 60));

				if (hours2.length == 1) hours2 = '0' + hours2;
				if (minutes2.length == 1) minutes2 = '0' + minutes2;
				if (minutes2 == 0) minutes2 = '00';

				$(this).parent().parent().find('.slider-time2').html(hours2 + minutes2);
				if($(this).attr('id') == "slider-range5"){
					$scope.stTimeToCriteria  =  Number(hours2 + minutes2);   
				}
				else if($(this).attr('id') == "slider-range6"){
					$scope.endTimeToCriteria  =  Number(hours2 +  minutes2);  
				}
				if($scope.stTimeFromCriteria.length == 3){
					$scope.stTimeFromCriteria = '0'+$scope.stTimeFromCriteria;
				}
				if($scope.stTimeToCriteria.length == 3){
					$scope.stTimeToCriteria = '0'+$scope.stTimeToCriteria;
				}
				if($scope.endTimeFromCriteria.length == 3){
					$scope.endTimeFromCriteria = '0'+$scope.endTimeFromCriteria;
				}
				if($scope.endTimeToCriteria.length == 3){
					$scope.endTimeToCriteria = '0'+$scope.endTimeToCriteria;
				}
				$scope.applyCtFilterLive();
			}
		});
	}


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

	$scope.loadLocationEnum = function(){
		$scope.location = [{
			opt:"T1",
			selected:false
		},{
			opt:"T2",
			selected:false
		},{
			opt:"T3",
			selected:false
		},{
			opt:"CAR",
			selected:false
		},{
			opt:"T4",
			selected:false
		},{
			opt:"T5",
			selected:false
		},{
			opt:"GT",
			selected:false
		},{
			opt:"TC",
			selected:false
		}];
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

	$scope.saveCtFilter = function(){
		$scope.filters = {
				selected: true,
				shiftType : angular.copy($scope.shiftType),
				offDays: angular.copy($scope.offdays),
				location: angular.copy($scope.location),
				breakOption: angular.copy($scope.breakOption),
				startFrom: angular.copy($scope.stTimeFromCriteria),
				startTo: angular.copy($scope.stTimeToCriteria),
				endFrom: angular.copy($scope.endTimeFromCriteria),
				endTo: angular.copy($scope.endTimeToCriteria)				
		};
		if(!$rootScope.ctFilterObj)
			$rootScope.ctFilterObj = [];
		$rootScope.ctFilterObj.push($scope.filters);
		console.log($rootScope.ctFilterObj);
		$scope.showNotification('Filter has been saved');
	}

	$('.toast-close-button').click(function(){
		$('#toast-container').hide();
		
	});
	
	$scope.applyCtFilterLive = function(){
		var shifts = new Array();
		angular.forEach($scope.shiftType, function(shift){
			if(shift.selected==true && shift.opt == 'Regular'){
				shifts.push('Regular');
			}
			if(shift.selected==true && shift.opt == 'Flex'){
				shifts.push('Flex');
			}
			if(shift.selected==true && shift.opt == 'Variable'){
				shifts.push('Variable');
			}
			if(shift.selected==true && shift.opt == 'Rotating'){
				shifts.push('Rotating');
			}
		});
		var locations = new Array();
		angular.forEach($scope.locations, function(location){
				locations.push(location.opt);
		});
		
		var selectedLineNumbers = new Array();
		angular.forEach($scope.lineNumbers, function(lineNum){
			selectedLineNumbers.push(lineNum.lineId);
		});
		
		$scope.records.scheduleLines = [];
		angular.forEach($scope.recScheduleLine, function(line){
			var addLine = true;
			if(shifts.length>0 && $.inArray(line.tag, shifts) < 0 && addLine){
				addLine = false;
			}
			angular.forEach(line.schedules, function(schedule){
				if(locations.length>0 && ($.inArray(schedule.Mon.location, locations) < 0
						&& $.inArray(schedule.Tue.location, locations) < 0
						&& $.inArray(schedule.Wed.location, locations) < 0
						&& $.inArray(schedule.Thu.location, locations) < 0
						&& $.inArray(schedule.Fri.location, locations) < 0
						&& $.inArray(schedule.Sat.location, locations) < 0
						&& $.inArray(schedule.Sun.location, locations) < 0) && addLine){
					addLine = false;
				}
			});
			var addDay = false;
			var ofDay = false;
		
			angular.forEach($scope.offdays, function(offDay){
				angular.forEach(line.schedules, function(schedule){
					if(offDay.selected == true && !addDay){
						ofDay = true;
						if(offDay.opt == 'Mon' && schedule.offDays.includes('M')){
							addDay = true;
						}
						if(offDay.opt == 'Tue' && schedule.offDays.includes('T')){
							addDay = true;
						}
						if(offDay.opt == 'Wed' && schedule.offDays.includes('W')){
							addDay = true;
						}
						if(offDay.opt == 'Thu' && schedule.offDays.includes('R')){
							addDay = true;
						}
						if(offDay.opt == 'Fri' && schedule.offDays.includes('F')){
							addDay = true;
						}
						if(offDay.opt == 'Sat' && schedule.offDays.includes('Sa')){
							addDay = true;
						}
						if(offDay.opt == 'Sun' && schedule.offDays.includes('Su')){
							addDay = true;
						}
					}
				});
			});
			if(!ofDay){
				addDay = true;
			}
			var addBrk = false;
			var brkOpt = false;
			angular.forEach($scope.breakOption, function(brk){
				if(brk.selected == true && !addBrk){
					brkOpt = true;
					angular.forEach(line.schedules, function(schedule){
						if(($scope.filterLine(schedule.Mon, brk) || $scope.filterLine(schedule.Tue, brk) || $scope.filterLine(schedule.Wed, brk) || $scope.filterLine(schedule.Thu, brk) || $scope.filterLine(schedule.Fri, brk) || $scope.filterLine(schedule.Sat, brk) || $scope.filterLine(schedule.Sun, brk)) && !addBrk){
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
				angular.forEach(line.schedules, function(schedule){
					if(($scope.filterTime(schedule.Mon) || $scope.filterTime(schedule.Tue) || $scope.filterTime(schedule.Wed) || 
					$scope.filterTime(schedule.Thu) || $scope.filterTime(schedule.Fri) || $scope.filterTime(schedule.Sat) 
					|| $scope.filterTime(schedule.Sun)) && !addTime){
						addTime = true;
					}
				});
			}
	
			if(!timeOpt){
				addTime = true;
			}
			
			var addLineFilter= false;
			if($.inArray(line.lineId , selectedLineNumbers) >= 0 || selectedLineNumbers.length==0 ){
				addLineFilter = true;
			}
			
			if(addLine && addDay && addBrk && addTime && addLineFilter){
				$scope.records.scheduleLines.push(line);
				console.log('adding ' + line.lineId);
			}else{
				console.log('filtering ' + line.lineId);
			}
		});	
		$timeout(function(){
			$rootScope.$broadcast('sbdata',$scope.records);
	    }, 1000);
	}
	
	$scope.showBuddy = function(){
		$scope.records.scheduleLines.splice(0, $scope.records.scheduleLines.length);
		if($scope.buddyList && $scope.buddyList.length>0){
			angular.forEach($scope.recScheduleLine, function(line){
				var isBuddyLine = false;
				if(line.winner){
					angular.forEach(line.winner, function(winner){
						angular.forEach($scope.buddyList, function(buddy){
							var name = buddy.firstName + " " + buddy.lastName;
							if(winner == name){
								isBuddyLine = true;
							}
						})
					});
				}
				if(isBuddyLine){
					var schLine = jQuery.extend(true, {}, line);
					$scope.records.scheduleLines.push(schLine);
				}
			});
		}
		else{
			angular.forEach($scope.recScheduleLine, function(line){
				var schLine = jQuery.extend(true, {}, line);
				$scope.records.scheduleLines.push(schLine);
			});				
		}
	}
	
	$scope.filterTime = function(day){
		var retVal = false;
			if((day.shiftStart && day.shiftStart == '') || (day.shiftEnd && day.shiftEnd == '')){
				retVal =  true;
			}
			else if(eval(day.shiftStart) >= $scope.stTimeFromCriteria && eval(day.shiftStart) <= $scope.stTimeToCriteria
					&& eval(day.shiftEnd) >= $scope.endTimeFromCriteria && eval(day.shiftEnd) <= $scope.endTimeToCriteria){
				retVal =  true;
			}
		return retVal;
	}
		
	$scope.filterLine = function(day, brk){
		var retVal = false;
		if(day.break != 'Off' && ((brk.opt == '0' && day.break == '00') ||
				(brk.opt == '15' && day.break == '15') ||
				(brk.opt == '30' && day.break == '30') ||
				(brk.opt == '60' && day.break == '60') ||
				(brk.opt == 'All'))){
			retVal = true;
		}
		return retVal;
	}


	$scope.clearFilter = function(){
		angular.forEach($scope.shiftType, function(opt){
			opt.selected = false;
		});
		angular.forEach($scope.breakOption, function(opt){
			opt.selected = false;
		});
		angular.forEach($scope.offdays, function(opt){
			opt.selected = false;
		});
		$scope.location = [];
		$scope.lineNumbers = [];
		$scope.stTimeFromCriteria = 0;
		$scope.endTimeFromCriteria = 0;
		$scope.stTimeToCriteria = 2359;
		$scope.endTimeToCriteria = 2359;
		$scope.initSlider();
		$scope.applyCtFilterLive();
	}

	
	$scope.init();

}


