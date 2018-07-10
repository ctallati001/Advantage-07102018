(function() {

	'use strict';

	angular
	.module('myApp')
	.controller('datsubmissionsCtrl', datsubmissionsCtrl);


	datsubmissionsCtrl.$inject = ['$scope', '$rootScope', 'store', '$http', 'NgTableParams','$compile', '$filter', 'uiCalendarConfig', 'bdServices','vbPreferenceFactory','vbWeeklyAllotmentFactory','weeklyAllotments'];

	function datsubmissionsCtrl($scope, $rootScope, store, $http, NgTableParams,$compile, $filter,uiCalendarConfig,bdServices, vbPreferenceFactory, vbWeeklyAllotmentFactory,weeklyAllotments) {
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
		$scope.items=[];
		$scope.dat={};
		for(var i=1;i<=52;i++){
			$scope.items.push(i);
		}
		$scope.dat.datweek="1";
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

		$scope.wkAllotment = weeklyAllotments;
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
						if(d.assignment == true){
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
									bidDtlId: d.bidDtlId
							}
							$scope.eventLst.push(event);
						}
					});
				}
				var events = _.sortBy( $scope.eventLst, 'title');
				$scope.eventLst = events;
				var id = bdServices.getBidDtlId();
				if(id){
					$scope.bidDtlId=id;
					$scope.renderCalender();
				}
			});
		}
		$scope.getPreferences();

		$scope.saveDatInfo =function(obj){
			$http.post("/dat/saveDat",obj)
			.then(function(res){
				$scope.showNotification('Successfully Saved');
			});
			
		
			$scope.showNotification = function(msg){
				$('.toast-message').text(msg);
				$('#toast-container').fadeIn(1000).fadeOut(60000);
			}
			
			$('.toast-close-button').click(function(){
				$('#toast-container').hide();
				
			});


		}
		 
		 $scope.dateFormattingPattern = function(){
			 $('#date_3 .input-group.date').datepicker({
					defaultViewDate : $scope.dat.effectiveDate,
					todayBtn: "linked",
					keyboardNavigation: false,
					forceParse: false,
					autoclose: true,
					todayHighlight: true,
					calendarWeeks: true,
					format: 'mm-dd-yyyy'
				});
				if($scope.dat.effectiveDate != null && $scope.dat.effectiveDate != 'undefined' && $scope.dat.effectiveDate != ''){
					$('#date_3 .input-group.date').data("datepicker")._setDate($scope.dat.effectiveDate);
				}
		  }
		 $scope.dateFormattingPattern();
		 
		//start
		var date = new Date();
		var d = date.getDate();
		var m = date.getMonth();
		var y = date.getFullYear();
		$scope.showEvents = false;
		$scope.uiConfig = {
				calendar:{}
		};
		$scope.uiConfigMb = {
				calendar:{}
		};

		$scope.select = function(date, obj){};

		//added the selecting code
		$scope.dipslayingOrder=function(obj){}
		//end
		/* alert on eventClick */
		$scope.alertOnEventClick = function( date, jsEvent, view){
			$scope.alertMessage = (date.title + ' was clicked ');
		};
		/* alert on eventClick */
		$scope.weekNumberClick = function(date, obj){};
		/* alert on Drop */
		$scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
			$scope.alertMessage = ('Event Droped to make dayDelta ' + delta);
		};
		/* alert on Resize */
		$scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view ){
			$scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
		};
		/* add and removes an event source of choice */
		$scope.addRemoveEventSource = function(sources,source) {
			var canAdd = 0;
			angular.forEach(sources,function(value, key){
				if(sources[key] === source){
					sources.splice(key,1);
					canAdd = 1;
				}
			});
			if(canAdd === 0){
				sources.push(source);
			}
		};
		/* add custom event*/
		$scope.addEvent = function(eventData) {
			$scope.events.push(eventData);
		};
		/* remove event */
		$scope.remove = function(index) {
			$scope.events.splice(index,1);
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
							start: event.start,
							end: event.end,
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
		$scope.renderCalender = function(calendar) {
			for(var i=1;i<=52;i++){
				$scope.items.push(i);
			}
			$scope.events.splice(0, $scope.events.length);
			$scope.eventList.events.splice(0, $scope.eventList.events.length);
			var e = [];
			angular.forEach($scope.eventLst, function(event){
				if(event.bidDtlId == $scope.bidDtlId && event.empName == $rootScope.profile.name){
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
			
			angular.forEach($scope.eventLst, function(event){
				if(event.bidDtlId == $scope.bidDtlId){
					var ind = $scope.items.indexOf(eval(event.weekNum));
					$scope.items.splice(ind,1);
				}
			});
			
			uiCalendarConfig.calendars.myCalendar.fullCalendar('changeView','month');
			uiCalendarConfig.calendars.myCalendar.fullCalendar('changeView','year');
		};
		
		/* Render Tooltip */
		$scope.eventRender = function( event, element, view ) { 
			element.attr({'tooltip': event.title,
				'tooltip-append-to-body': true});
			$compile(element)($scope);
		};
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
		//end
	}
})()
