myApp.controller('masterCalandarCtrl', MasterCalandarCtrl);
MasterCalandarCtrl.$inject = ['$rootScope', '$scope', '$compile', '$location', '$timeout', '$filter', 'bdServices', 'uiCalendarConfig','vbPreferenceFactory', 'vbWeeklyAllotmentFactory','weeklyAllotments'];
function MasterCalandarCtrl($rootScope, $scope, $compile, $location, $timeout, $filter, bdServices, uiCalendarConfig, vbPreferenceFactory, vbWeeklyAllotmentFactory, weeklyAllotments) {
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
	$scope.uiConfig = {
			calendar:{}
	};
	$scope.uiConfigMb = {
			calendar:{}
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
	
	var bd = bdServices.getBidDetail($scope.bidDetailSearch);
	bd.then(function(data){
		$scope.bidDetailLst = data;
	});

	$scope.eventData = [];
	$scope.preferences = [];
	$scope.changeTo = 'Hungarian';

	$scope.events = [];
	$scope.eventList = {
			weekNum : '',
			weekRange : '',
			events : []
	};
	$scope.mapEvents = [];
	$scope.getPreferences = function(){
		vbPreferenceFactory.getPreferences().then(function(data){
			$scope.eventData = data;
			if(data && data.length > 0){
				angular.forEach(data, function(d){
					if(d.assignment == true){
						var event = {
								weekNum: d.weekNumber,
								start: moment(d.startDate).format('MM-DD-YYYY'),
								end: moment(d.endDate).format('MM-DD-YYYY'),
								selected: d.assignment,
								pref: d.prefNumber,
								vacationId: d.vacationId,
								title: d.empName,
								bidDtlId: d.bidDtlId,
								vacType: d.vacType
						}
						$scope.mapEvents.push(event);
					}
				});
			}
			$scope.mapEvents = _.sortBy( $scope.mapEvents, 'title');
			var id = bdServices.getBidDtlId();
			if(id){
				$scope.bidDtlId=id;
				$scope.renderCalender();
				$scope.showAll();
			}
			$scope.tableview();
		});
	}
	$scope.wkAllotment = weeklyAllotments;
	
	$scope.changeTab = function(name){
		if(name == 'calendar'){
			$('#tab-1').fadeIn('fast',function(){
				uiCalendarConfig.calendars.myCalendar.fullCalendar('render');
			});
			$('#tab-2').hide();
		}
		if(name == 'table'){
			$('#tab-2').fadeIn();
			$('#tab-1').hide();
		}
	}
	$scope.tableview=function(){
		$scope.wklyAllotments = [];
		$('.dataTables-example').DataTable().clear().destroy();
		angular.forEach($scope.wkAllotment, function(wk){
			if(wk.bidDtlId == $scope.bidDtlId){
				angular.forEach($scope.eventData, function(ev){
					if(ev.bidDtlId == $scope.bidDtlId && wk.weekNumber == ev.weekNumber){
						wk.empName = ev.empName;
					}
				});
				$scope.wklyAllotments.push(wk);
			}
		});
		$.fn.dataTable.ext.order['dom-text'] = function  ( settings, col )
		{
			return this.api().column( col, {order:'index'} ).nodes().map( function ( td, i ) {
				return $('input', td).val();
			} );
		}

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
	$scope.getPreferences();
	$scope.select = function(date, obj){
	};

	/* alert on eventClick */
	$scope.alertOnEventClick = function( date, jsEvent, view){
		$scope.alertMessage = (date.title + ' was clicked ');
	};
	/* alert on eventClick */
	$scope.weekNumberClick = function(date, obj){

	};
	
	$scope.showAll = function(){
		$scope.alertMessage = null;
		$scope.events = [];
		angular.forEach($scope.eventData, function(event){
			if(event.bidDtlId == $scope.bidDtlId){
				var e = {
						weekNum: event.weekNumber,
						start: moment(event.startDate).format('MM-DD-YYYY'),
						end: moment(event.endDate).format('MM-DD-YYYY'),
						selected: event.assignment,
						pref: event.prefNumber,
						vacationId: event.vacationId,
						title: event.empName,
						vacType: event.vacType
				}
				$scope.events.push(e);	
			}
		});
		var events = _.sortBy( $scope.events, 'title');
		$scope.eventList.events = events;
	};
	
	$scope.savePreferences = function(eventData){
		var preferences = [];
		var preference = {
				weekNumber: eventData.weekNum,
				startDate: eventData.start,
				endDate: eventData.end,
				status: eventData.selected,
				prefNumber: eventData.title,
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

	/* add custom event*/
	$scope.addEvent = function(eventData) {
		$scope.events.push(eventData);
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
	
	$scope.showEmployees = function(val){
		$scope.alertMessage = null;
		$scope.events = [];
		angular.forEach($scope.eventData, function(event){
			if(val == event.weekNumber && event.bidDtlId == $scope.bidDtlId){
				var e = {
						weekNum: event.weekNumber,
						start: moment(event.startDate).format('MM-DD-YYYY'),
						end: moment(event.endDate).format('MM-DD-YYYY'),
						selected: event.assignment,
						pref: event.prefNumber,
						vacationId: event.vacationId,
						title: event.empName,
						vacType: event.vacType
				}
				$scope.events.push(e);	
			}
		});
		var events = _.sortBy( $scope.events, 'title');
		$scope.eventList.events = events;
	
	}
	/* Change View */
	$scope.renderCalender = function() {
		$scope.events.splice(0, $scope.events.length);
		$scope.eventList.events.splice(0, $scope.eventList.events.length);
		angular.forEach($scope.mapEvents, function(event){
			if(event.bidDtlId == $scope.bidDtlId && event.empName == $rootScope.profile.name){
				$scope.events.push(event);
			}
		});
		angular.forEach($scope.mapEvents, function(event){
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
	
	/* Render Tooltip */
	$scope.eventRender = function( event, element, view ) { 
		element.attr({'tooltip': event.title,
			'tooltip-append-to-body': true});
		$compile(element)($scope);
	};
	
	$scope.dayRender = function (date, cell) {
		if ($scope.dateHasEvent(date)){
			var name =_.findWhere(dateNames, {date : date.format("YYYY-MM-DD")}).title; 
			cell.attr('title', name);
			cell.addClass("bg-yellow");
		}
		if($scope.bidDtlId && $scope.bidDtlId>0){
			angular.forEach($scope.wkAllotment, function(wk){
				if(wk.bidDtlId == $scope.bidDtlId){
					var a = date.format('dddd');
					var w = date.isoWeek();
					if(w == wk.weekNumber){
						if(a=='Monday'){
							cell.prepend('<br/><span class="fc-day-number-span">' + wk.slotsRemainingMon+'</span>');
						}
						if(a=='Tuesday'){
							cell.prepend('<br/><span class="fc-day-number-span">' +wk.slotsRemainingTue+'</span>');
						}
						if(a=='Wednesday'){
							cell.prepend('<br/><span class="fc-day-number-span">' +wk.slotsRemainingWed+'</span>');
						}
						if(a=='Thursday'){
							cell.prepend('<br/><span class="fc-day-number-span">' +wk.slotsRemainingThu+'</span>');
						}
						if(a=='Friday'){
							cell.prepend('<br/><span class="fc-day-number-span">' +wk.slotsRemainingFri+'</span>');
						}
						if(a=='Saturday'){
							cell.prepend('<br/><span class="fc-day-number-span">' + wk.slotsRemainingSat+'</span>');
						}
						if(a=='Sunday'){
							cell.prepend('<br/><span class="fc-day-number-span">' + wk.slotsRemainingSun+'</span>');
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
				height: 700,
				weekMode: 'variable',
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
				weekNumbersWidth: 30,
				height: 400,
				weekMode: 'variable',
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
	/* event sources array*/
	$scope.eventSources = [$scope.events];

}