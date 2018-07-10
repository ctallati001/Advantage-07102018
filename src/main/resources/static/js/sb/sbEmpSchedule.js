var myApp = angular.module('myApp');
myApp.controller('sbEmpSchCtrl', sbEmpSchCtrl);
sbEmpSchCtrl.$inject = ['$rootScope', '$scope', '$compile', '$timeout', '$filter', 'uiCalendarConfig','calendarFactory','sbdServices'];
function sbEmpSchCtrl($rootScope, $scope,$compile, $timeout, $filter,uiCalendarConfig,calendarFactory,sbdServices) {
	var dates = ['2017-01-01', '2017-01-14', '2017-02-18','2017-05-27','2017-07-04', '201-09-04', '2017-10-09', '2017-11-24', '2017-11-23', '2017-12-25'];
	var offDates = ['2017-11-05', '2017-11-06', '2017-11-12','2017-11-13','2017-11-19', '2017-11-20', '2017-11-26', '2017-11-27'];
	
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
	
	var bd = sbdServices.getBidDetail($scope.bidDetailSearch);
	bd.then(function(data){
		$scope.bidDetailLst = data;
	});
	
	$scope.uiConfig = {
			calendar:{}
	};
	$scope.uiConfigMb = {
			calendar:{}
	};
	
	$scope.events= [
					{
						title: 'T1',
						start: new Date(y, m, 1, 8, 0),
						end: new Date(y, m, 1, 16, 30),
						allDay: false
					},
					{
						title: 'T1',
						start: new Date(y, m, 2, 8, 0),
						end: new Date(y, m, 2, 16, 30),
						allDay: false
					},
					{
						title: 'T1',
						start: new Date(y, m, 3, 8, 0),
						end: new Date(y, m, 3, 16, 30),
						allDay: false
					},
					{
						title: 'T1',
						start: new Date(y, m, 4, 8, 0),
						end: new Date(y, m, 4, 16, 30),
						allDay: false
					},
					{
						title: 'T1',
						start: new Date(y, m-1, 31, 8, 0),
						end: new Date(y, m-1, 31, 16, 30),
						allDay: false
					},
					{
						title: 'T2',
						start: new Date(y, m, 7, 8, 0),
						end: new Date(y, m, 7, 16, 30),
						allDay: false
					},
					{
						title: 'T2',
						start: new Date(y, m, 8, 8, 0),
						end: new Date(y, m, 8, 16, 30),
						allDay: false
					},
					{
						title: 'T2',
						start: new Date(y, m, 9, 8, 0),
						end: new Date(y, m, 9, 16, 30),
						allDay: false
					},
					{
						title: 'T2',
						start: new Date(y, m, 10, 8, 0),
						end: new Date(y, m, 10, 16, 30),
						allDay: false
					},
					{
						title: 'T2',
						start: new Date(y, m, 11, 8, 0),
						end: new Date(y, m, 11, 16, 30),
						allDay: false
					},
					{
						title: 'T3',
						start: new Date(y, m, 14, 8, 0),
						end: new Date(y, m, 14, 16, 30),
						allDay: false
					},
					{
						title: 'T3',
						start: new Date(y, m, 15, 8, 0),
						end: new Date(y, m, 15, 16, 30),
						allDay: false
					},
					{
						title: 'T3',
						start: new Date(y, m, 16, 8, 0),
						end: new Date(y, m, 16, 16, 30),
						allDay: false
					},
					{
						title: 'T3',
						start: new Date(y, m, 17, 8, 0),
						end: new Date(y, m, 17, 16, 30),
						allDay: false
					},
					{
						title: 'T3',
						start: new Date(y, m, 18, 8, 0),
						end: new Date(y, m, 18, 16, 30),
						allDay: false
					},
					{
						title: 'T1',
						start: new Date(y, m, 21, 8, 0),
						end: new Date(y, m, 21, 16, 30),
						allDay: false
					},
					{
						title: 'T1',
						start: new Date(y, m, 22, 8, 0),
						end: new Date(y, m, 22, 16, 30),
						allDay: false
					},
					{
						title: 'T1',
						start: new Date(y, m, 23, 8, 0),
						end: new Date(y, m, 23, 16, 30),
						allDay: false
					},
					{
						title: 'T1',
						start: new Date(y, m, 24, 8, 0),
						end: new Date(y, m, 24, 16, 30),
						allDay: false
					},
					{
						title: 'T1',
						start: new Date(y, m, 25, 8, 0),
						end: new Date(y, m, 25, 16, 30),
						allDay: false
					},
					{
						title: 'OFF',
						start: new Date(y, m, 5),
						end: new Date(y, m, 7),
						color: '#ed5565',
						allDay: true
					},
					{
						title: 'OFF',
						start: new Date(y, m, 12),
						end: new Date(y, m, 14),
						color: '#ed5565',
						allDay: true
					},
					{
						title: 'OFF',
						start: new Date(y, m, 19),
						end: new Date(y, m, 21),
						color: '#ed5565',
						allDay: true
					},
					{
						title: 'OFF',
						start: new Date(y, m, 26),
						end: new Date(y, m, 28),
						color: '#ed5565',
						allDay: true
					}
				];
	$scope.eventList = {
			weekNum : '',
			weekRange : '',
			events : []
	};
	
	$scope.alertOnEventClick = function( date, jsEvent, view){
		$scope.alertMessage = (date.title + ' was clicked ');
	};
	/* alert on eventClick */
	$scope.weekNumberClick = function(date, obj){
	}
	
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
	}
	
	$scope.renderCalender = function() {
		if(uiCalendarConfig.calendars.myCalendar){
			uiCalendarConfig.calendars.myCalendar.fullCalendar('changeView','month');
			uiCalendarConfig.calendars.myCalendar.fullCalendar('changeView','year');
		}
		if(uiCalendarConfig.calendars.myCalendarMb){
			uiCalendarConfig.calendars.myCalendarMb.fullCalendar('changeView','month');
			uiCalendarConfig.calendars.myCalendarMb.fullCalendar('changeView','year');
		}
	};
	
	var id = sbdServices.getBidDtlId();
	if(id){
		$scope.bidDtlId=id;
		$scope.renderCalender();
	}
	
	/* Render Tooltip */
	$scope.eventRender = function( event, element, view ) { 
//		$(element[0].innerHTML).append("<span class='fc-assign'>Hello</span>");
	};
	$scope.dayRender = function (date, cell) {
		if ($scope.dateHasEvent(date)){
			var name =_.findWhere(dateNames, {date : date.format("YYYY-MM-DD")}).title; 
			cell.addClass("bg-yellow");
			cell.attr('title', name);
		}
	}

	$scope.dateHasEvent = function(date){
		var i = $.inArray(date.format("YYYY-MM-DD"), dates);
		return i >= 0;
	}
	
	$scope.isOffDay = function(date){
		var i = $.inArray(date.format("YYYY-MM-DD"), offDates);
		return i >= 0;
	}
	/* config object */
	$scope.uiConfig = {
			calendar:{
				defaultDate: $filter('date')(date,'MM-dd-yyyy'),
				defaultView: 'month',
				weekNumbers: true,
				weekNumbersWidth: 40,
				height: 550,
				weekMode: 'liquid',
				selectable: {
					year: true,
					month: true,
					agenda: true
				},
				selectHelper: true,
				displayEventEnd: true,
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
				defaultDate: $filter('date')(date,'MM-dd-yyyy'),
				defaultView: 'month',
				yearColumns: 1,
				weekNumbers: true,
				weekNumbersWidth: 20,
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
