var myApp = angular.module('myApp');
myApp.controller('CalendarCtrl', CalendarCtrl);
CalendarCtrl.$inject = ['$rootScope', '$scope', '$compile', '$timeout', '$filter', 'uiCalendarConfig','vbPreferenceFactory','$ngBootbox','calendarFactory','bdServices','vbWeeklyAllotmentFactory','weeklyAllotments'];
function CalendarCtrl($rootScope, $scope,$compile, $timeout, $filter,uiCalendarConfig,vbPreferenceFactory,$ngBootbox,calendarFactory,bdServices,vbWeeklyAllotmentFactory,weeklyAllotments) {
	var dates = ['2017-01-01', '2017-01-14', '2017-02-18','2017-05-27','2017-07-04', '201-09-04', '2017-10-09', '2017-11-24', '2017-11-23', '2017-12-25'];
	var dateNames = [{date:'2017-01-01', title: 'New Year'},
	                 {date:'2017-01-14', title: 'Martin Luther King Jr Day'},
	                 {date:'2017-02-18', title: 'Washingtons Birthday'},
	                 {date:'2017-05-27', title: 'Memorial Day'},
	                 {date:'2017-07-04', title: 'Independence Day'},
	                 {date:'2017-09-04', title: 'Labor Day'},
	                 {date:'2017-10-09', title: 'Columbus Day'},
	                 {date:'2017-11-24', title: 'Thanks Giving'},
	                 {date:'2017-11-23', title: 'Thanks Giving'},
	                 {date:'2017-12-25', title: 'Christams'}];
	var date = new Date();
	var d = date.getDate();
	var m = date.getMonth();
	var y = date.getFullYear();
	$scope.showEvents = true;
	$scope.showSubmit = false;
	$scope.bidDetailSearch = {
			bidId : 0,
			bidType :'',
			shiftType : '',
			windowLength : 0,
			rounds : 0,
			startDate : null,
			endDate : null
	};
	
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
           content: "Select off Days",
           placement: "top",
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
			placement:"right",
			content:'click on the week num to Select the week',
			backdrop: false,
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
		   placement:"top",
		   content:'Selected weeks are displayed here and click submit to confirm',
		   backdrop: true,
		    backdropContainer: '#wrapper',
		    onShown: function (tour){
		    $('body').addClass('tour-open')
		    },
		    onHidden: function (tour){
		    $('body').removeClass('tour-close')
		  },
				   
		   },
		 
		]});

	$scope.startTheTour = function(){
	    tour.init();
		tour.restart();
		
}
	
	
	var bd = bdServices.getBidDetail($scope.bidDetailSearch);
	bd.then(function(data){
		$scope.bidDetailLst = data;
	});
	
	$scope.uiConfig = {
			calendar:{}
	};
	$scope.uiConfigMb = {
			calendar:{}
	};

	$scope.wkAllotment = weeklyAllotments;
	$scope.preferences = [];

	$scope.events = [];
	$scope.eventList = {
			weekNum : '',
			weekRange : '',
			events : []
	};
	$scope.eventLst = [];
	$scope.preferences = [];
	$scope.getPreferences = function(){
		vbPreferenceFactory.getPreferences().then(function(data){
			if(data && data.length > 0){
				angular.forEach(data, function(d){
					var event = {
							weekNum: d.weekNumber,
							start: d.startDate,
							end: d.endDate,
							selected: d.assignment ? 'true' : (d.preference ? 'false' : ''),
							title: d.prefNumber,
							vacationId: d.vacationId,
							preference: d.preference,
							assignment: d.assignment,
							empName: d.empName,
							bidDtlId: d.bidDtlId,
							vacType: d.vacType
					}
					$scope.eventLst.push(event);
				});
			}
			var events = _.sortBy( $scope.eventLst, 'title');
			$scope.eventLst = events;
		});
	}
	$scope.getPreferences();
	$scope.select = function(date, obj){
//		if(!$(obj.target).is('i.fa.fa-circle')){
//		$scope.alertMessage = null;
//		var preference = prompt('Enter Preference Number:');
//		if(preference){
//		var error = $.isNumeric(preference);
//		if(error == true){
//		var start = moment(date.year()+'-'+(date.month()+1)+'-'+date.date());
//		var end = moment(date.year()+'-'+(date.month()+1)+'-'+eval(date.date()+7));
//		if (preference) {
//		var eventData = {
//		title: preference,
//		start: start.clone(),
//		end: end.clone()
//		};
//		$scope.addEvent(eventData);
//		}
//		}
//		else{
//		$scope.alertMessage = 'Shift Number not correct!';
//		}
//		}
//		}
	};

	/* alert on eventClick */
	$scope.alertOnEventClick = function( date, jsEvent, view){
		$scope.alertMessage = (date.title + ' was clicked ');
	};
	/* alert on eventClick */
	$scope.weekNumberClick = function(date, obj){
		if($scope.bidDtlId && $scope.bidDtlId>0){
			if($scope.eventList.events.length<5){
				var val = obj.target.innerHTML.split(" ")[1];
				var startDt = date.split("-");
				$scope.alertMessage = null;
				var preference = 1;
				var start = moment(startDt[0]+'-'+startDt[1]+'-'+startDt[2]);
				var startDate = calendarFactory.getWeekStartDate(new Date().getFullYear(), 1).clone().startOf('day');;
				if(start>=startDate){
					if(!$scope.eventList.events.find(x => x.weekNum == val)){
						var d1, d2;
						angular.forEach($scope.wkAllotment, function(w){
							if(w.weekNumber == val && w.bidDtlId == $scope.bidDtlId && w.slotsRemaining > 0){
								if($scope.eventList.events && $scope.eventList.events.length > 0){
									preference = $scope.eventList.events.length+1;
								}
								var getDays = vbPreferenceFactory.getPreferencesDays(val, $scope.offDays ? $scope.offDays : '');
								getDays.then(function(res){
									start = res[0];
									var end = res[1];
									var eventData = {
											title: preference,
											start: start,
											end: end,
											weekNum: val,
											selected: 'false',
											empName : $rootScope.profile.name,
											preference: false,
											bidDtlId: $scope.bidDtlId,
											vacType: $scope.vacType ? 'HOLVAC' : 'VAC'
									};
									$scope.addEvent(eventData);
									$scope.showSubmit = true;
								});
							}
						});
					}
					else{
						$scope.alertMessage="Week already selected."
					}
				}
				else{
					$scope.alertMessage="Week not selectable."
				}
			}
			else{
				$scope.alertMessage="Maximum 5 preferences can be selected."
			}
		}
		else{
			$scope.alertMessage="Please select Bid Detail first."
		}
	};

	$scope.sortPreferences = {
			stop: function(e, ui) {
				for(var i=0;i<$scope.eventList.events.length;i++){
					$scope.eventList.events[i].title = i+1;
				}
				$scope.showSubmit = true;
			}
	}

	$scope.saveAllPreferences = function(){
		var preferences = [];
		angular.forEach($scope.eventList.events, function(eventData){
			if(!eventData.assignment){
				var preference = {
						weekNumber: eventData.weekNum,
						startDate: eventData.start,
						endDate: eventData.end,
						preference: true,
						prefNumber: eventData.title,
						empName : $rootScope.profile.name,
						vacationId: eventData.vacationId,
						bidDtlId: eventData.bidDtlId,
						vacType: eventData.vacType
				}
				preferences.push(preference);
			}
		}); 
		vbPreferenceFactory.savePreference(preferences);
		$scope.showSubmit = false;
		$scope.sweetAlertForSaveAndUpdate("Preferences Saved");
	}

	$scope.deletePreference = function(id){
		if(id >= 0){
			var vacId = $scope.eventList.events[id].vacationId;
			var prefNum = $scope.eventList.events[id].title;
			if(vacId && vacId > 0){
				vbPreferenceFactory.deletePreference(vacId).then(function(){
					$scope.eventList.events.splice(id, 1);
					var events = _.sortBy( $scope.eventList.events, 'title');
					$scope.eventList.events = events;
					var ind = 0;
					for(var n=0; n< $scope.events; n++){
						if($scope.events[n].title == prefNum){
							ind = n;
						}
					}
					$scope.remove(id);
					var i=1;
					angular.forEach($scope.eventList.events, function(event){
						event.title = i;
						i++;
					});
					angular.forEach($scope.eventList.events, function(eventLst){
						angular.forEach($scope.eventList.events, function(event){
							if(eventLst.weekNum == event.weekNum){
								event.title = eventLst.title;
							}
						});
					});
					if($scope.events.length == 0){
						$scope.showSubmit = false;
					}
					$scope.saveAllPreferences();
				});
			}
			else{
				$scope.eventList.events.splice(id, 1);
				var events = _.sortBy( $scope.eventList.events, 'title');
				$scope.eventList.events = events;
				var ind = 0;
				for(var n=0; n< $scope.events; n++){
					if($scope.events[n].title == prefNum){
						ind = n;
					}
				}
				$scope.remove(id);
				var i=1;
				angular.forEach($scope.eventList.events, function(event){
					event.title = i;
					i++;
				});
				angular.forEach($scope.eventList.events, function(eventLst){
					angular.forEach($scope.eventList.events, function(event){
						if(eventLst.weekNum == event.weekNum){
							event.title = eventLst.title;
						}
					});
				});
			}
			if($scope.events.length == 0){
				$scope.showSubmit = false;
			}
		}
	}

	$scope.sweetAlertForSaveAndUpdate =  function (message) {
        swal({
            title: message,
            type: "success"
        });

    };

	$scope.savePreferences = function(eventData){
		var preferences = [];
		var preference = {
				weekNumber: eventData.weekNum,
				startDate: eventData.start,
				endDate: eventData.end,
				preference: true,
				prefNumber: eventData.title,
				empName : $rootScope.profile.name,
				vacType: eventData.vacType
		}
		preferences.push(preference);
		vbPreferenceFactory.savePreference(preferences);
	}

	/* alert on Drop */
	$scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
		angular.forEach($scope.events, function(evnt, i){
			if(event.title == evnt.title){
				$scope.events.splice(i,1);
			}
		});
		var eventNew = {
				title: event.title,
				start: event.start.format('MM-DD-YYYY'),
				end: event.end.format('MM-DD-YYYY')
		}
		$scope.events.push(eventNew);
		var events = _.sortBy( $scope.events, 'title');
		$scope.eventList.events = events;
	};
	/* alert on Resize */
	$scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view ){
		$scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
	};

	/* add custom event */
	$scope.addEvent = function(eventData) {
		$scope.events.push(eventData);
		var eventLst = _.sortBy( $scope.events, 'title');
		$scope.eventList.events = eventLst;
	};
	/* remove event */
	$scope.remove = function(index) {
		$scope.events.splice(index,1);
	};
	/* Change View */
	$scope.changeView = function(view) {
		if(uiCalendarConfig.calendars.myCalendar)
			uiCalendarConfig.calendars.myCalendar.fullCalendar('changeView',view.type);
		if(uiCalendarConfig.calendars.myCalendarMb)
			uiCalendarConfig.calendars.myCalendarMb.fullCalendar('changeView',view.type);
		var w = $('.fc-week-number a');
		angular.forEach(w,function(wk){
			var t = wk.innerText;
			t = "Week "+t;
			wk.innerHTML = "<span id='step3' class='wk-num'>"+t+"</span>";
		});
		if($scope.bidDtlId && $scope.bidDtlId>0){
			angular.forEach($scope.wkAllotment, function(wk){
				if(wk.bidDtlId == $scope.bidDtlId){
					var a = $('.fc-week-number a').find('span').filter(function(){
						return this.innerText === 'Week '+wk.weekNumber ? true : false;
					});
					if(a){
						var t = "<span ng-click='showEmployees("+wk.weekNumber+")' class='wk-num-emp' data-toggle='tooltip' data-placement='left' title='Employees Assigned'><br/><h3><i class='fa fa-user text-success'></i></h3></span>";
						var temp = $compile(t)($scope); 
						temp.bind('click', $scope.showEmployees(wk.weekNumber));
						a.parent().after(temp);
					}
				}
			});
		}
	};

	$scope.showEmployees = function(wkNum){
		$scope.wkEmployees = [];
		angular.forEach($scope.eventLst, function(event){
			if(wkNum == event.weekNum && event.assignment && event.bidDtlId == $scope.bidDtlId){
				var e = {
						weekNum: event.weekNum,
						start: moment(event.start).toDate(),
						end: moment(event.end).toDate(),
						pref: event.title,
						title: event.empName,
						vacType: event.vacType
				}
				$scope.wkEmployees.push(e);	
			}
		});
		$scope.wkEmployees = _.sortBy( $scope.wkEmployees, 'title');
	};

	/* Change View */
	$scope.renderCalender = function() {
		bdServices.setBidDtlId($scope.bidDtlId);
		$scope.events.splice(0, $scope.events.length);
		$scope.eventList.events.splice(0, $scope.eventList.events.length);
		var e = [];
		angular.forEach($scope.eventLst, function(event){
			if(event.bidDtlId == $scope.bidDtlId &&
				event.empName == $rootScope.profile.name){
				e.push(event);
			}
		});
		e = _.sortBy(e, 'title');
		angular.forEach(e, function(event){
			if(event.bidDtlId == $scope.bidDtlId){
				$scope.events.push(event);
			}
		});
		angular.forEach(e, function(event){
			if(event.bidDtlId == $scope.bidDtlId){
				$scope.eventList.events.push(event);
			}
		});
		
		if(uiCalendarConfig.calendars.myCalendar){
			uiCalendarConfig.calendars.myCalendar.fullCalendar('changeView','month');
			uiCalendarConfig.calendars.myCalendar.fullCalendar('changeView','year');
		}
		if(uiCalendarConfig.calendars.myCalendarMb){
			uiCalendarConfig.calendars.myCalendarMb.fullCalendar('changeView','month');
			uiCalendarConfig.calendars.myCalendarMb.fullCalendar('changeView','year');
		}
	};
	
	var id = bdServices.getBidDtlId();
	if(id){
		$scope.bidDtlId=id;
		$scope.renderCalender();
	}
	
	/* Render Tooltip */
	$scope.eventRender = function( event, element, view ) { 
		element.attr({'tooltip': event.title,
			'tooltip-append-to-body': true});
		$compile(element)($scope);
	};
	$scope.dayRender = function (date, cell) {
		if ($scope.dateHasEvent(date)){
			var name =_.findWhere(dateNames, {date : date.format("YYYY-MM-DD")}).title; 
			cell.addClass("bg-yellow");
			cell.attr('title', name);
		}
		if($scope.bidDtlId && $scope.bidDtlId>0){
			angular.forEach($scope.wkAllotment, function(wk){
				if(wk.bidDtlId == $scope.bidDtlId){
					var a = date.format('dddd');
					var w = date.isoWeek();
					if(w == wk.weekNumber){
						if(a=='Monday'){
							cell.prepend('<br/><span class="fc-day-number-span" title="'+name+'">' + wk.slotsRemainingMon+'</span>');
						}
						if(a=='Tuesday'){
							cell.prepend('<br/><span class="fc-day-number-span" title="'+name+'">' +wk.slotsRemainingTue+'</span>');
						}
						if(a=='Wednesday'){
							cell.prepend('<br/><span class="fc-day-number-span" title="'+name+'">' +wk.slotsRemainingWed+'</span>');
						}
						if(a=='Thursday'){
							cell.prepend('<br/><span class="fc-day-number-span" title="'+name+'">' +wk.slotsRemainingThu+'</span>');
						}
						if(a=='Friday'){
							cell.prepend('<br/><span class="fc-day-number-span" title="'+name+'">' +wk.slotsRemainingFri+'</span>');
						}
						if(a=='Saturday'){
							cell.prepend('<br/><span class="fc-day-number-span" title="'+name+'">' + wk.slotsRemainingSat+'</span>');
						}
						if(a=='Sunday'){
							cell.prepend('<br/><span class="fc-day-number-span" title="'+name+'">' + wk.slotsRemainingSun+'</span>');
						}
					}
				}
			});
		}
	}

	$scope.dateHasEvent = function(date){
		var i = $.inArray(date.format("YYYY-MM-DD"), dates);
		return i >= 0;
	}
	/* config object */
	$scope.uiConfig = {
			calendar:{
				header: {
					left: 'prev,next today',
					center: 'title',
					right: 'year,month'
				},
				defaultDate: $filter('date')(date,'MM-dd-yyyy'),
				defaultView: 'year',
				yearColumns: 2,
				weekNumbers: true,
				weekNumbersWidth: 50,
				height: 750,
				weekMode: 'liquid',
				displayEventTime : false,
				selectable: {
					year: true,
					month: true,
					agenda: true
				},
				selectHelper: true,
				firstDay: 1,
				editable: true,
				eventLimit: true,
				dayClick: $scope.select,
				eventClick: $scope.alertOnEventClick,
				eventDrop: $scope.alertOnDrop,
				eventResize: $scope.alertOnResize,
				eventRender: $scope.eventRender,
				weekClick: $scope.weekNumberClick,
				dayRender: $scope.dayRender,
				viewRender: $scope.changeView
			}
	};
	$scope.uiConfigMb = {
			calendar:{
				header: {
					left: 'prev,next today',
					center: 'title',
					right: 'year,month'
				},
				defaultDate: $filter('date')(date,'MM-dd-yyyy'),
				defaultView: 'year',
				yearColumns: 1,
				weekNumbers: true,
				weekNumbersWidth: 35,
				height: 320,
				weekMode: 'liquid',
				selectable: {
					month: true,
					agenda: true
				},
				selectHelper: true,
				firstDay: 1,
				editable: true,
				eventLimit: true,
				dayClick: $scope.select,
				eventClick: $scope.alertOnEventClick,
				eventDrop: $scope.alertOnDrop,
				eventResize: $scope.alertOnResize,
				eventRender: $scope.eventRender,
				weekClick: $scope.weekNumberClick,
				dayRender: $scope.dayRender,
				viewRender: $scope.changeView
			}
	};

	/* event sources array */
	$scope.eventSources = [$scope.events];
	
}
