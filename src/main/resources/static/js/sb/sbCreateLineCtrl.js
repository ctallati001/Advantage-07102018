var myApp = angular.module('myApp');

myApp.controller('sbCreateLineCtrl', sbCreateLineCtrl);
sbCreateLineCtrl.$inject = ['$scope', '$rootScope', '$location', 'sbDataFactory','$timeout', '$interval', '$filter', 'store', 'sbdServices'];

function sbCreateLineCtrl($scope, $rootScope, $location, sbDataFactory, $timeout, $interval, $filter, store, sbdServices) {
	
	$scope.getLines = sbDataFactory.getData().then(function(response) {
		$scope.list = response.data;
	}, function(error) {
		$scope.status = 'Unable to load customer data: ' + error.message;
	});
	
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
	
		$scope.bidDetailSearch = {};
		var getBidDetails = sbdServices.getBidDetail($scope.bidDetailSearch); 
		getBidDetails.then(function(data){
			$scope.bidDetailLst = data;
		});

	$rootScope.onLoad = function(){
		$('.schedule-table').DataTable().clear().destroy();
		$rootScope.listSchedulelines = [];
		angular.forEach($scope.list, function(data){
			if(data.bidDtlId == $rootScope.selectedRow.val){
				$rootScope.listSchedulelines = data.scheduleLines;
			}
		});
		$rootScope.listSchedulelines.sort(function(a,b) {return (a.lineId > b.lineId) ? 1 : ((b.lineId > a.lineId) ? -1 : 0);} );
		$scope.initScheduleTable();
	}
	
	$scope.saveLines = function(lines){
		sbDataFactory.saveLines(lines).then(function(response) {
			$scope.status = 'Updated Lines';
			if($rootScope.loadAsnmnt){
				$rootScope.loadAsnmnt();
			}
			$('#addRowsModal').modal('hide');
			$scope.initScheduleTable();
		}, function(error) {
			$scope.status = 'Unable to load customer data: ' + error.message;
		});
	}
	
	$scope.varOffDay = "";

	$scope.shiftTypes = ["Regular","Variable","Flex","Rotating"];
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

	$scope.showCopyRowModal = function(){
		$('#addRowsModal').modal('show');
		$scope.lineNumber = '';
		$scope.rowCount = '';
		$scope.preLineNumber = '';
		$scope.offDays = '';
	}
	
	$scope.showAddRowModal = function(){
		$('#addMutipleRowsModal').modal('show');
		$scope.rowCount = '';
		$scope.preLineNumber = '';
	}

	$scope.copyScheduleLines = function(){
		$('.schedule-table').DataTable().clear().destroy();
		var schLines = [];
		var schLine = {};
		var ind = 0;
		var schedules = [];
		angular.forEach($rootScope.listSchedulelines, function(line){
			if(line.lineId == $scope.lineNumber){
				angular.forEach(line.schedules, function(schedule){
					var scheduleLine = jQuery.extend(true, {}, schedule);
					var monOff = false;
					var tueOff = false;
					var wedOff = false;
					var thuOff = false;
					var friOff = false;
					var satOff = false;
					var sunOff = false;
					if($scope.offDays == 'MT'){
						monOff = true;
						tueOff = true;
					}
					if($scope.offDays == 'TW'){
						wedOff = true;
						tueOff = true;
					}
					if($scope.offDays == 'WR'){
						wedOff = true;
						thuOff = true;
					}
					if($scope.offDays == 'RF'){
						thuOff = true;
						friOff = true;
					}
					if($scope.offDays == 'FSa'){
						friOff = true;
						satOff = true;
					}
					if($scope.offDays == 'SaSu'){
						satOff = true;
						sunOff = true;
					}
					if($scope.offDays == 'SuM'){
						sunOff = true;
						monOff = true;
					}
					if($scope.offDays == 'MTW'){
						monOff = true;
						wedOff = true;
						tueOff = true;
					}
					if($scope.offDays == 'TWR'){
						wedOff = true;
						tueOff = true;
						thuOff = true;
					}
					if($scope.offDays == 'WRF'){
						wedOff = true;
						thuOff = true;
						friOff = true;
					}
					if($scope.offDays == 'RFSa'){
						thuOff = true;
						friOff = true;
						satOff = true;
					}
					if($scope.offDays == 'FSaSu'){
						friOff = true;
						satOff = true;
						sunOff = true;
					}
					if($scope.offDays == 'SaSuM'){
						satOff = true;
						sunOff = true;
						monOff = true;
					}
					if($scope.offDays == 'SuMT'){
						sunOff = true;
						monOff = true;
						tueOff = true;
					}
					if(monOff){
						scheduleLine.Mon = {
								shiftStart: "",
								shiftEnd: "",
								break: "",
								location: ""
							};							
					}
					if(tueOff){
						scheduleLine.Tue = {
								shiftStart: "",
								shiftEnd: "",
								break: "",
								location: ""
							};							
					}else{
						scheduleLine.Tue = jQuery.extend(true, {}, scheduleLine.Mon);
					}
					if(wedOff){
						scheduleLine.Wed = {
								shiftStart: "",
								shiftEnd: "",
								break: "",
								location: ""
							};							
					}else{
						scheduleLine.Wed = jQuery.extend(true, {}, scheduleLine.Mon);
					}
					if(thuOff){
						scheduleLine.Thu = {
								shiftStart: "",
								shiftEnd: "",
								break: "",
								location: ""
							};							
					}else{
						scheduleLine.Thu = jQuery.extend(true, {}, scheduleLine.Mon);
					}
					if(friOff){
						scheduleLine.Fri = {
								shiftStart: "",
								shiftEnd: "",
								break: "",
								location: ""
							};							
					}else{
						scheduleLine.Fri = jQuery.extend(true, {}, scheduleLine.Mon);
					}
					if(satOff){
						scheduleLine.Sat = {
								shiftStart: "",
								shiftEnd: "",
								break: "",
								location: ""
							};							
					}else{
						scheduleLine.Sat = jQuery.extend(true, {}, scheduleLine.Mon);
					}
					if(sunOff){
						scheduleLine.Sun = {
								shiftStart: "",
								shiftEnd: "",
								break: "",
								location: ""
							};							
					}else{
						scheduleLine.Sun = jQuery.extend(true, {}, scheduleLine.Mon);
					}
					schedules.push(scheduleLine);
				});
				
				schLine = {
						lineId: line.lineId,
						bidDtlId: line.bidDtlId,
						tag: line.tag,
						flexDate: line.flexDate,
						schedules: schedules,
						comments: line.comments
				}
			}
		});
		var count = eval($scope.rowCount);
		var cntPlus = eval($scope.preLineNumber);
		for(var j=0; j<$rootScope.listSchedulelines.length; j++){
			if($rootScope.listSchedulelines[j].lineId > cntPlus){
				$rootScope.listSchedulelines[j].lineId = eval($rootScope.listSchedulelines[j].lineId)+count;
			}
		}
		for(var i=0; i<count; i++){
			var line =  jQuery.extend(true, {}, schLine);
			line.lineId = eval($scope.preLineNumber) + i + 1 + "";
			schLines.push(line);
		}
		var index = $rootScope.listSchedulelines.map(function(e) { return e.lineId; }).indexOf($scope.preLineNumber);
		for(var j=0; j<schLines.length; j++){
			$rootScope.listSchedulelines.splice(index+j+1, 0, schLines[j]);
		}
		
		$rootScope.listSchedulelines.sort(function(a,b) {return (a.lineId > b.lineId) ? 1 : ((b.lineId > a.lineId) ? -1 : 0);} );
		sbDataFactory.deleteLines($rootScope.selectedRow.val).then(function(response) {
			for(var j=0; j<$rootScope.listSchedulelines.length; j++){
				$scope.saveLines($rootScope.listSchedulelines[j]);
			}
		}, function(error) {
			$scope.status = 'Unable to load customer data: ' + error.message;
		});
		
		$('#addRowsModal').modal('hide');
	}

	
	$scope.deleteLines = function(id){
		sbDataFactory.deleteLines(id).then(function(response) {
			$scope.status = 'Updated Lines';
		}, function(error) {
			$scope.status = 'Unable to load customer data: ' + error.message;
		});
	}
	
	$scope.sortScheduleLines = {
			stop: function(e, ui) {
				var item = $(ui.item[0]).prev();
				var index = item[0].firstElementChild.innerText;
				index = eval(index);
				angular.forEach($rootScope.listSchedulelines, function(line){

				});
				$scope.showSubmit = true;
			}
	}

	$scope.addScheduleLines = function(){
		$('.schedule-table').DataTable().clear().destroy();
		var i = 7001;
		if($rootScope.listSchedulelines && $rootScope.listSchedulelines.length > 0){
			i = eval($rootScope.listSchedulelines[$rootScope.listSchedulelines.length-1].lineId) +1;
		}
		var lines = {
				lineId: i+"",
				tag: "Regular",
				bidDtlId: $rootScope.selectedRow.val,
				comments: '',
				schedules: [{
					offDays: "",
					Mon: {
						shiftStart: "",
						shiftEnd: "",
						break: "",
						location: ""
					},
					Tue: {
						shiftStart: "",
						shiftEnd: "",
						break: "",
						location: ""
					},
					Wed: {
						shiftStart: "",
						shiftEnd: "",
						break: "",
						location: ""
					},
					Thu: {
						shiftStart: "",
						shiftEnd: "",
						break: "",
						location: ""
					},
					Fri: {
						shiftStart: "",
						shiftEnd: "",
						break: "",
						location: ""
					},
					Sat: {
						shiftStart: "",
						shiftEnd: "",
						break: "",
						location: ""
					},
					Sun: {
						shiftStart: "",
						shiftEnd: "",
						break: "",
						location: ""
					}
				}]
		};
		$rootScope.listSchedulelines.push(lines);
		$scope.saveLines(lines);
	}

	$scope.addMultipleLines = function(){
		$('.schedule-table').DataTable().clear().destroy();
		var schLines = [];
		var lines = {
				lineId: 0,
				tag: "Regular",
				bidDtlId: $rootScope.selectedRow.val,
				comments: '',
				schedules: [{
					offDays: "",
					Mon: {
						shiftStart: "",
						shiftEnd: "",
						break: "",
						location: ""
					},
					Tue: {
						shiftStart: "",
						shiftEnd: "",
						break: "",
						location: ""
					},
					Wed: {
						shiftStart: "",
						shiftEnd: "",
						break: "",
						location: ""
					},
					Thu: {
						shiftStart: "",
						shiftEnd: "",
						break: "",
						location: ""
					},
					Fri: {
						shiftStart: "",
						shiftEnd: "",
						break: "",
						location: ""
					},
					Sat: {
						shiftStart: "",
						shiftEnd: "",
						break: "",
						location: ""
					},
					Sun: {
						shiftStart: "",
						shiftEnd: "",
						break: "",
						location: ""
					}
				}]
		};
		var count = eval($scope.rowCount);
		var cntPlus = eval($scope.preLineNumber);
		for(var j=0; j<$rootScope.listSchedulelines.length; j++){
			if($rootScope.listSchedulelines[j].lineId > cntPlus){
				$rootScope.listSchedulelines[j].lineId = eval($rootScope.listSchedulelines[j].lineId)+count;
			}
		}
		for(var i=0; i<count; i++){
			var line =  jQuery.extend(true, {}, lines);
			line.lineId = eval($scope.preLineNumber) + i + 1 + "";
			schLines.push(line);
		}
		var index = $rootScope.listSchedulelines.map(function(e) { return e.lineId; }).indexOf($scope.preLineNumber);
		for(var j=0; j<schLines.length; j++){
			$rootScope.listSchedulelines.splice(index+j+1, 0, schLines[j]);
		}

		$rootScope.listSchedulelines.sort(function(a,b) {return (a.lineId > b.lineId) ? 1 : ((b.lineId > a.lineId) ? -1 : 0);} );
		sbDataFactory.deleteLines($rootScope.selectedRow.val).then(function(response) {
			for(var j=0; j<$rootScope.listSchedulelines.length; j++){
				$scope.saveLines($rootScope.listSchedulelines[j]);
			}
		}, function(error) {
			$scope.status = 'Unable to load customer data: ' + error.message;
		});

		$('#addMutipleRowsModal').modal('hide');
	}
	
	$scope.showModal = function(ind){
		$("#rotDiv").hide();
		$("#regDiv").hide();
		$("#varDiv").hide();
		$("#flexDiv").hide();
		if(ind == -1){
			$scope.add = true;
			$('#addLineModal').modal('show');
			$scope.msScheduleLines = [{
				lineNo: "",
				bidDtlId: $rootScope.selectedRow.val,
				start: "",
				end: "",
				break: "",
				offDays: "",
				location: ""

			}];
			$scope.msScheduleLines.shiftType = "Regular";
			$("#regDiv").show();
		}
		else{
			$scope.add = false;
			$('#addLineModal').modal('show');
			$scope.msScheduleLines = [];
			angular.forEach($rootScope.listSchedulelines, function(line){
				if(line.lineId == ind){
					if(line.tag == "Regular" || line.tag == "Variable"){
						var offDays = "";
						if(line.schedules && line.schedules[0] && line.schedules[0].offDays){
							offDays = line.schedules[0].offDays;
						}
						var monOff = false;
						var tueOff = false;
						var wedOff = false;
						var thuOff = false;
						var friOff = false;
						var satOff = false;
						var sunOff = false;
						if(offDays == 'MT'){
							monOff = true;
							tueOff = true;
						}
						if(offDays == 'TW'){
							wedOff = true;
							tueOff = true;
						}
						if(offDays == 'WR'){
							wedOff = true;
							thuOff = true;
						}
						if(offDays == 'RF'){
							thuOff = true;
							friOff = true;
						}
						if(offDays == 'FSa'){
							friOff = true;
							satOff = true;
						}
						if(offDays == 'SaSu'){
							satOff = true;
							sunOff = true;
						}
						if(offDays == 'SuM'){
							sunOff = true;
							monOff = true;
						}
						if(offDays == 'MTW'){
							monOff = true;
							wedOff = true;
							tueOff = true;
						}
						if(offDays == 'TWR'){
							wedOff = true;
							tueOff = true;
							thuOff = true;
						}
						if(offDays == 'WRF'){
							wedOff = true;
							thuOff = true;
							friOff = true;
						}
						if(offDays == 'RFSa'){
							thuOff = true;
							friOff = true;
							satOff = true;
						}
						if(offDays == 'FSaSu'){
							friOff = true;
							satOff = true;
							sunOff = true;
						}
						if(offDays == 'SaSuM'){
							satOff = true;
							sunOff = true;
							monOff = true;
						}
						if(offDays == 'SuMT'){
							sunOff = true;
							monOff = true;
							tueOff = true;
						}

						if(line.tag == "Regular"){
							if(!monOff){
								angular.forEach(line.schedules, function(shift){
									var monLine = {
											lineNo: line.lineId,
											start: shift.Mon.shiftStart,
											end: shift.Mon.shiftEnd,
											break: shift.Mon.break,
											offDays: shift.offDays,
											location: shift.Mon.location,
											bidDtlId: line.bidDtlId
									};
									$scope.msScheduleLines.push(monLine);
								});
							}
							else if(!tueOff){
								angular.forEach(line.schedules, function(shift){
									var monLine = {
											lineNo: line.lineId,
											start: shift.Tue.shiftStart,
											end: shift.Tue.shiftEnd,
											break: shift.Tue.break,
											offDays: shift.offDays,
											location: shift.Tue.location,
											bidDtlId: line.bidDtlId
									};
									$scope.msScheduleLines.push(monLine);
								});
							}
							else if(!wedOff){
								angular.forEach(line.schedules, function(shift){
									var monLine = {
											lineNo: line.lineId,
											start: shift.Wed.shiftStart,
											end: shift.Wed.shiftEnd,
											break: shift.Wed.break,
											offDays: shift.offDays,
											location: shift.Wed.location,
											bidDtlId: line.bidDtlId
									};
									$scope.msScheduleLines.push(monLine);
								});
							}
							else if(!thuOff){
								angular.forEach(line.schedules, function(shift){
									var monLine = {
											lineNo: line.lineId,
											start: shift.Thu.shiftStart,
											end: shift.Thu.shiftEnd,
											break: shift.Thu.break,
											offDays: shift.offDays,
											location: shift.Thu.location,
											bidDtlId: line.bidDtlId
									};
									$scope.msScheduleLines.push(monLine);
								});
							}
							else if(!friOff){
								angular.forEach(line.schedules, function(shift){
									var monLine = {
											lineNo: line.lineId,
											start: shift.Fri.shiftStart,
											end: shifshiftStart.shiftEnd,
											break: shift.Fri.break,
											offDays: shift.offDays,
											location: shift.Fri.location,
											bidDtlId: line.bidDtlId
									};
									$scope.msScheduleLines.push(monLine);
								});
							}
							else if(!satOff){
								angular.forEach(line.schedules, function(shift){
									var monLine = {
											lineNo: line.lineId,
											start: shift.Sat.shiftStart,
											end: shift.Sat.shiftEnd,
											break: shift.Sat.break,
											offDays: shift.offDays,
											location: shift.Sat.location,
											bidDtlId: line.bidDtlId
									};
									$scope.msScheduleLines.push(monLine);
								});
							}
							else if(!sunOff){
								angular.forEach(line.schedules, function(shift){
									var monLine = {
											lineNo: line.lineId,
											start: shift.Sun.shiftStart,
											end: shift.Sun.shiftEnd,
											break: shift.Sun.break,
											offDays: shift.offDays,
											location: shift.Sun.location,
											bidDtlId: line.bidDtlId
									};
									$scope.msScheduleLines.push(monLine);
								});
							}
							$scope.msScheduleLines.comments = line.comments;
						}
						else if(line.tag == "Variable"){
							if(!monOff){
								angular.forEach(line.schedules, function(shift){
									var monLine = {
											lineNo: line.lineId,
											start: shift.Mon.shiftStart,
											end: shift.Mon.shiftEnd,
											break: shift.Mon.break,
											offDays: shift.offDays,
											location: shift.Mon.location,
											bidDtlId: line.bidDtlId,
											label: "Mon"
									};
									$scope.msScheduleLines.push(monLine);
								});
							}
							if(!tueOff){
								angular.forEach(line.schedules, function(shift){
									var monLine = {
											lineNo: line.lineId,
											start: shift.Tue.shiftStart,
											end: shift.Tue.shiftEnd,
											break: shift.Tue.break,
											offDays: shift.offDays,
											location: shift.Tue.location,
											bidDtlId: line.bidDtlId,
											label: "Tue"
									};
									$scope.msScheduleLines.push(monLine);
								});
							}
							if(!wedOff){
								angular.forEach(line.schedules, function(shift){
									var monLine = {
											lineNo: line.lineId,
											start: shift.Wed.shiftStart,
											end: shift.Wed.shiftEnd,
											break: shift.Wed.break,
											offDays: shift.offDays,
											location: shift.Wed.location,
											bidDtlId: line.bidDtlId,
											label: "Wed"
									};
									$scope.msScheduleLines.push(monLine);
								});
							}
							if(!thuOff){
								angular.forEach(line.schedules, function(shift){
									var monLine = {
											lineNo: line.lineId,
											start: shift.Thu.shiftStart,
											end: shift.Thu.shiftEnd,
											break: shift.Thu.break,
											offDays: shift.offDays,
											location: shift.Thu.location,
											bidDtlId: line.bidDtlId,
											label: "Thu"
									};
									$scope.msScheduleLines.push(monLine);
								});
							}
							if(!friOff){
								angular.forEach(line.schedules, function(shift){
									var monLine = {
											lineNo: line.lineId,
											start: shift.Fri.shiftStart,
											end: shift.Fri.shiftEnd,
											break: shift.Fri.break,
											offDays: shift.offDays,
											location: shift.Fri.location,
											bidDtlId: line.bidDtlId,
											label: "Fri"
									};
									$scope.msScheduleLines.push(monLine);
								});
							}
							if(!satOff){
								angular.forEach(line.schedules, function(shift){
									var monLine = {
											lineNo: line.lineId,
											start: shift.Sat.shiftStart,
											end: shift.Sat.shiftEnd,
											break: shift.Sat.break,
											offDays: shift.offDays,
											location: shift.Sat.location,
											bidDtlId: line.bidDtlId,
											label: "Sat"
									};
									$scope.msScheduleLines.push(monLine);
								});
							}
							if(!sunOff){
								angular.forEach(line.schedules, function(shift){
									var monLine = {
											lineNo: line.lineId,
											start: shift.Sun.shiftStart,
											end: shift.Sun.shiftEnd,
											break: shift.Sun.break,
											offDays: shift.offDays,
											location: shift.Sun.location,
											bidDtlId: line.bidDtlId,
											label: "Sun"
									};
									$scope.msScheduleLines.push(monLine);
								});
							}
							$scope.varOffDays = $scope.msScheduleLines[0].offDays;
							$scope.msScheduleLines.comments = line.comments;
						}
					}
					else if(line.tag == "Rotating"){
						angular.forEach(line.schedules, function(shift){
							var monOff = false;
							var tueOff = false;
							var wedOff = false;
							var thuOff = false;
							var friOff = false;
							var satOff = false;
							var sunOff = false;
							if(shift.offDays == 'MT'){
								monOff = true;
								tueOff = true;
							}
							if(shift.offDays == 'TW'){
								wedOff = true;
								tueOff = true;
							}
							if(shift.offDays == 'WR'){
								wedOff = true;
								thuOff = true;
							}
							if(shift.offDays == 'RF'){
								thuOff = true;
								friOff = true;
							}
							if(shift.offDays == 'FSa'){
								friOff = true;
								satOff = true;
							}
							if(shift.offDays == 'SaSu'){
								satOff = true;
								sunOff = true;
							}
							if(shift.offDays == 'SuM'){
								sunOff = true;
								monOff = true;
							}
							if(shift.offDays == 'MTW'){
								monOff = true;
								wedOff = true;
								tueOff = true;
							}
							if(shift.offDays == 'TWR'){
								wedOff = true;
								tueOff = true;
								thuOff = true;
							}
							if(shift.offDays == 'WRF'){
								wedOff = true;
								thuOff = true;
								friOff = true;
							}
							if(shift.offDays == 'RFSa'){
								thuOff = true;
								friOff = true;
								satOff = true;
							}
							if(shift.offDays == 'FSaSu'){
								friOff = true;
								satOff = true;
								sunOff = true;
							}
							if(shift.offDays == 'SaSuM'){
								satOff = true;
								sunOff = true;
								monOff = true;
							}
							if(shift.offDays == 'SuMT'){
								sunOff = true;
								monOff = true;
								tueOff = true;
							}

							if(!monOff){
								var monLine = {
										lineNo: line.lineId,
										start: shift.Mon.shiftStart,
										end: shift.Mon.shiftEnd,
										break: shift.Mon.break,
										offDays: shift.offDays,
										location: shift.Mon.location,
										bidDtlId: line.bidDtlId
								};
								$scope.msScheduleLines.push(monLine);
							}
							else if(!tueOff){
								var monLine = {
										lineNo: line.lineId,
										start: shift.Tue.shiftStart,
										end: shift.Tue.shiftEnd,
										break: shift.Tue.break,
										offDays: shift.offDays,
										location: shift.Tue.location,
										bidDtlId: line.bidDtlId
								};
								$scope.msScheduleLines.push(monLine);
							}
							else if(!wedOff){
								var monLine = {
										lineNo: line.lineId,
										start: shift.Wed.shiftStart,
										end: shift.Wed.shiftEnd,
										break: shift.Wed.break,
										offDays: shift.offDays,
										location: shift.Wed.location,
										bidDtlId: line.bidDtlId
								};
								$scope.msScheduleLines.push(monLine);
							}
							else if(!thuOff){
								var monLine = {
										lineNo: line.lineId,
										start: shift.Thu.shiftStart,
										end: shift.Thu.shiftEnd,
										break: shift.Thu.break,
										offDays: shift.offDays,
										location: shift.Thu.location,
										bidDtlId: line.bidDtlId
								};
								$scope.msScheduleLines.push(monLine);
							}
							else if(!friOff){
								var monLine = {
										lineNo: line.lineId,
										start: shift.Fri.shiftStart,
										end: shift.Fri.shiftEnd,
										break: shift.Fri.break,
										offDays: shift.offDays,
										location: shift.Fri.location,
										bidDtlId: line.bidDtlId
								};
								$scope.msScheduleLines.push(monLine);
							}
							else if(!satOff){
								var monLine = {
										lineNo: line.lineId,
										start: shift.Sat.shiftStart,
										end: shift.Sat.shiftEnd,
										break: shift.Sat.break,
										offDays: shift.offDays,
										location: shift.Sat.location,
										bidDtlId: line.bidDtlId
								};
								$scope.msScheduleLines.push(monLine);
							}
							else if(!sunOff){
								var monLine = {
										lineNo: line.lineId,
										start: shift.Sun.shiftStart,
										end: shift.Sun.shiftEnd,
										break: shift.Sun.break,
										offDays: shift.offDays,
										location: shift.Sun.location,
										bidDtlId: line.bidDtlId
								};
								$scope.msScheduleLines.push(monLine);
							}							
						});
						$scope.msScheduleLines.comments = line.comments;
					}
					else if(line.tag == "Flex"){
						var flexScheduleLines = [];
						angular.forEach(line.schedules, function(shift){
							if(!shift.flexDays || shift.flexDays != 'Y'){
								var monOff = false;
								var tueOff = false;
								var wedOff = false;
								var thuOff = false;
								var friOff = false;
								var satOff = false;
								var sunOff = false;
								if(shift.offDays == 'MT'){
									monOff = true;
									tueOff = true;
								}
								if(shift.offDays == 'TW'){
									wedOff = true;
									tueOff = true;
								}
								if(shift.offDays == 'WR'){
									wedOff = true;
									thuOff = true;
								}
								if(shift.offDays == 'RF'){
									thuOff = true;
									friOff = true;
								}
								if(shift.offDays == 'FSa'){
									friOff = true;
									satOff = true;
								}
								if(shift.offDays == 'SaSu'){
									satOff = true;
									sunOff = true;
								}
								if(shift.offDays == 'SuM'){
									sunOff = true;
									monOff = true;
								}
								if(shift.offDays == 'MTW'){
									monOff = true;
									wedOff = true;
									tueOff = true;
								}
								if(shift.offDays == 'TWR'){
									wedOff = true;
									tueOff = true;
									thuOff = true;
								}
								if(shift.offDays == 'WRF'){
									wedOff = true;
									thuOff = true;
									friOff = true;
								}
								if(shift.offDays == 'RFSa'){
									thuOff = true;
									friOff = true;
									satOff = true;
								}
								if(shift.offDays == 'FSaSu'){
									friOff = true;
									satOff = true;
									sunOff = true;
								}
								if(shift.offDays == 'SaSuM'){
									satOff = true;
									sunOff = true;
									monOff = true;
								}
								if(shift.offDays == 'SuMT'){
									sunOff = true;
									monOff = true;
									tueOff = true;
								}

								if(!monOff){
									var monLine = {
											lineNo: line.lineId,
											start: shift.Mon.shiftStart,
											end: shift.Mon.shiftEnd,
											break: shift.Mon.break,
											offDays: shift.offDays,
											location: shift.Mon.location,
											bidDtlId: line.bidDtlId
									};
									$scope.msScheduleLines.push(monLine);
								}
								else if(!tueOff){
									var monLine = {
											lineNo: line.lineId,
											start: shift.Tue.shiftStart,
											end: shift.Tue.shiftEnd,
											break: shift.Tue.break,
											offDays: shift.offDays,
											location: shift.Tue.location,
											bidDtlId: line.bidDtlId
									};
									$scope.msScheduleLines.push(monLine);
								}
								else if(!wedOff){
									var monLine = {
											lineNo: line.lineId,
											start: shift.Wed.shiftStart,
											end: shift.Wed.shiftEnd,
											break: shift.Wed.break,
											offDays: shift.offDays,
											location: shift.Wed.location,
											bidDtlId: line.bidDtlId
									};
									$scope.msScheduleLines.push(monLine);
								}
								else if(!thuOff){
									var monLine = {
											lineNo: line.lineId,
											start: shift.Thu.shiftStart,
											end: shift.Thu.shiftEnd,
											break: shift.Thu.break,
											offDays: shift.offDays,
											location: shift.Thu.location,
											bidDtlId: line.bidDtlId
									};
									$scope.msScheduleLines.push(monLine);
								}
								else if(!friOff){
									var monLine = {
											lineNo: line.lineId,
											start: shift.Fri.shiftStart,
											end: shift.Fri.shiftEnd,
											break: shift.Fri.break,
											offDays: shift.offDays,
											location: shift.Fri.location,
											bidDtlId: line.bidDtlId
									};
									$scope.msScheduleLines.push(monLine);
								}
								else if(!satOff){
									var monLine = {
											lineNo: line.lineId,
											start: shift.Sat.shiftStart,
											end: shift.Sat.shiftEnd,
											break: shift.Sat.break,
											offDays: shift.offDays,
											location: shift.Sat.location,
											bidDtlId: line.bidDtlId
									};
									$scope.msScheduleLines.push(monLine);
								}
								else if(!sunOff){
									var monLine = {
											lineNo: line.lineId,
											start: shift.Sun.shiftStart,
											end: shift.Sun.shiftEnd,
											break: shift.Sun.break,
											offDays: shift.offDays,
											location: shift.Sun.location,
											bidDtlId: line.bidDtlId
									};
									$scope.msScheduleLines.push(monLine);
								}		
							}
							else{
								var monOff = false;
								var tueOff = false;
								var wedOff = false;
								var thuOff = false;
								var friOff = false;
								var satOff = false;
								var sunOff = false;
								if(shift.offDays == 'MT'){
									monOff = true;
									tueOff = true;
								}
								if(shift.offDays == 'TW'){
									wedOff = true;
									tueOff = true;
								}
								if(shift.offDays == 'WR'){
									wedOff = true;
									thuOff = true;
								}
								if(shift.offDays == 'RF'){
									thuOff = true;
									friOff = true;
								}
								if(shift.offDays == 'FSa'){
									friOff = true;
									satOff = true;
								}
								if(shift.offDays == 'SaSu'){
									satOff = true;
									sunOff = true;
								}
								if(shift.offDays == 'SuM'){
									sunOff = true;
									monOff = true;
								}
								if(shift.offDays == 'MTW'){
									monOff = true;
									wedOff = true;
									tueOff = true;
								}
								if(shift.offDays == 'TWR'){
									wedOff = true;
									tueOff = true;
									thuOff = true;
								}
								if(shift.offDays == 'WRF'){
									wedOff = true;
									thuOff = true;
									friOff = true;
								}
								if(shift.offDays == 'RFSa'){
									thuOff = true;
									friOff = true;
									satOff = true;
								}
								if(shift.offDays == 'FSaSu'){
									friOff = true;
									satOff = true;
									sunOff = true;
								}
								if(shift.offDays == 'SaSuM'){
									satOff = true;
									sunOff = true;
									monOff = true;
								}
								if(shift.offDays == 'SuMT'){
									sunOff = true;
									monOff = true;
									tueOff = true;
								}

								if(!monOff){
									var monLine = {
											lineNo: line.lineId,
											start: shift.Mon.shiftStart,
											end: shift.Mon.shiftEnd,
											break: shift.Mon.break,
											offDays: shift.offDays,
											location: shift.Mon.location,
											bidDtlId: line.bidDtlId
									};
									flexScheduleLines.push(monLine);
								}
								else if(!tueOff){
									var monLine = {
											lineNo: line.lineId,
											start: shift.Tue.shiftStart,
											end: shift.Tue.shiftEnd,
											break: shift.Tue.break,
											offDays: shift.offDays,
											location: shift.Tue.location,
											bidDtlId: line.bidDtlId
									};
									flexScheduleLines.push(monLine);
								}
								else if(!wedOff){
									var monLine = {
											lineNo: line.lineId,
											start: shift.Wed.shiftStart,
											end: shift.Wed.shiftEnd,
											break: shift.Wed.break,
											offDays: shift.offDays,
											location: shift.Wed.location,
											bidDtlId: line.bidDtlId
									};
									flexScheduleLines.push(monLine);
								}
								else if(!thuOff){
									var monLine = {
											lineNo: line.lineId,
											start: shift.Thu.shiftStart,
											end: shift.Thu.shiftEnd,
											break: shift.Thu.break,
											offDays: shift.offDays,
											location: shift.Thu.location,
											bidDtlId: line.bidDtlId
									};
									flexScheduleLines.push(monLine);
								}
								else if(!friOff){
									var monLine = {
											lineNo: line.lineId,
											start: shift.Fri.shiftStart,
											end: shift.Fri.shiftEnd,
											break: shift.Fri.break,
											offDays: shift.offDays,
											location: shift.Fri.location,
											bidDtlId: line.bidDtlId
									};
									flexScheduleLines.push(monLine);
								}
								else if(!satOff){
									var monLine = {
											lineNo: line.lineId,
											start: shift.Sat.shiftStart,
											end: shift.Sat.shiftEnd,
											break: shift.Sat.break,
											offDays: shift.offDays,
											location: shift.Sat.location,
											bidDtlId: line.bidDtlId
									};
									flexScheduleLines.push(monLine);
								}
								else if(!sunOff){
									var monLine = {
											lineNo: line.lineId,
											start: shift.Sun.shiftStart,
											end: shift.Sun.shiftEnd,
											break: shift.Sun.break,
											offDays: shift.offDays,
											location: shift.Sun.location,
											bidDtlId: line.bidDtlId
									};
									flexScheduleLines.push(monLine);
								}								
							}
						});
						$scope.msScheduleLines.flexLines = flexScheduleLines;
						$scope.msScheduleLines.flexDate = new Date(line.flexDate);
						$scope.msScheduleLines.comments = line.comments;
					}
					$scope.msScheduleLines.shiftType = line.tag;
				}
			});
			$scope.shiftChange();
		}
	}

	$scope.saveScheduleLines = function(){
		var lineToSave = {};
		var i = 7001;
		if($rootScope.listSchedulelines.length > 0){
			i = eval(Math.max.apply(Math,$rootScope.listSchedulelines.map(function(line){return line.lineId;}))) +1;
		}
		var lines = {
				lineId: "",
				tag: $scope.msScheduleLines.shiftType,
				bidDtlId: $rootScope.selectedRow.val,
				schedules: []
		};
		if($scope.msScheduleLines.shiftType == 'Regular' || $scope.msScheduleLines.shiftType == 'Flex'  || $scope.msScheduleLines.shiftType == 'Rotating'){
			var exists = false;
			angular.forEach($scope.msScheduleLines, function(line){
				if(line.lineNo != null && line.lineNo !=''){
					lines.lineId = line.lineNo; 
					exists = true;
				}
				else{
					lines.lineId = i+"";
				}
				lines.bidDtlId = line.bidDtlId;
				lines.comments = $scope.msScheduleLines.comments;
				lines.tag = $scope.msScheduleLines.shiftType;
				var monOff = false;
				var tueOff = false;
				var wedOff = false;
				var thuOff = false;
				var friOff = false;
				var satOff = false;
				var sunOff = false;
				if(line.offDays == 'MT'){
					monOff = true;
					tueOff = true;
				}
				if(line.offDays == 'TW'){
					wedOff = true;
					tueOff = true;
				}
				if(line.offDays == 'WR'){
					wedOff = true;
					thuOff = true;
				}
				if(line.offDays == 'RF'){
					thuOff = true;
					friOff = true;
				}
				if(line.offDays == 'FSa'){
					friOff = true;
					satOff = true;
				}
				if(line.offDays == 'SaSu'){
					satOff = true;
					sunOff = true;
				}
				if(line.offDays == 'SuM'){
					sunOff = true;
					monOff = true;
				}
				if(line.offDays == 'MTW'){
					monOff = true;
					wedOff = true;
					tueOff = true;
				}
				if(line.offDays == 'TWR'){
					wedOff = true;
					tueOff = true;
					thuOff = true;
				}
				if(line.offDays == 'WRF'){
					wedOff = true;
					thuOff = true;
					friOff = true;
				}
				if(line.offDays == 'RFSa'){
					thuOff = true;
					friOff = true;
					satOff = true;
				}
				if(line.offDays == 'FSaSu'){
					friOff = true;
					satOff = true;
					sunOff = true;
				}
				if(line.offDays == 'SaSuM'){
					satOff = true;
					sunOff = true;
					monOff = true;
				}
				if(line.offDays == 'SuMT'){
					sunOff = true;
					monOff = true;
					tueOff = true;
				}
				var shift = {};
				shift.offDays = line.offDays;
				if($scope.msScheduleLines.shiftType == 'Flex'){
					
				}
				if(!monOff){
					shift.Mon = {
							shiftStart: line.start,
							shiftEnd: line.end,
							break: line.break,
							location: line.location
					};
				}
				if(!tueOff){
					shift.Tue = {
							shiftStart: line.start,
							shiftEnd: line.end,
							break: line.break,
							location: line.location
					};
				}
				if(!wedOff){
					shift.Wed = {
							shiftStart: line.start,
							shiftEnd: line.end,
							break: line.break,
							location: line.location
					};
				}
				if(!thuOff){
					shift.Thu = {
							shiftStart: line.start,
							shiftEnd: line.end,
							break: line.break,
							location: line.location
					};
				}
				if(!friOff){
					shift.Fri = {
							shiftStart: line.start,
							shiftEnd: line.end,
							break: line.break,
							location: line.location
					};
				}
				if(!satOff){
					shift.Sat = {
							shiftStart: line.start,
							shiftEnd: line.end,
							break: line.break,
							location: line.location
					};
				}
				if(!sunOff){
					shift.Sun = {
							shiftStart: line.start,
							shiftEnd: line.end,
							break: line.break,
							location: line.location
					};
				}
				lines.schedules.push(shift);
			});
			if($scope.msScheduleLines.shiftType == 'Flex'){
				var tt = '';
				angular.forEach($scope.msScheduleLines.flexLines, function(line){
					lines.bidDtlId = line.bidDtlId;
					lines.comments = $scope.msScheduleLines.comments;
					lines.tag = $scope.msScheduleLines.shiftType;
					var monOff = false;
					var tueOff = false;
					var wedOff = false;
					var thuOff = false;
					var friOff = false;
					var satOff = false;
					var sunOff = false;
					if(line.offDays == 'MT'){
						monOff = true;
						tueOff = true;
					}
					if(line.offDays == 'TW'){
						wedOff = true;
						tueOff = true;
					}
					if(line.offDays == 'WR'){
						wedOff = true;
						thuOff = true;
					}
					if(line.offDays == 'RF'){
						thuOff = true;
						friOff = true;
					}
					if(line.offDays == 'FSa'){
						friOff = true;
						satOff = true;
					}
					if(line.offDays == 'SaSu'){
						satOff = true;
						sunOff = true;
					}
					if(line.offDays == 'SuM'){
						sunOff = true;
						monOff = true;
					}
					if(line.offDays == 'MTW'){
						monOff = true;
						wedOff = true;
						tueOff = true;
					}
					if(line.offDays == 'TWR'){
						wedOff = true;
						tueOff = true;
						thuOff = true;
					}
					if(line.offDays == 'WRF'){
						wedOff = true;
						thuOff = true;
						friOff = true;
					}
					if(line.offDays == 'RFSa'){
						thuOff = true;
						friOff = true;
						satOff = true;
					}
					if(line.offDays == 'FSaSu'){
						friOff = true;
						satOff = true;
						sunOff = true;
					}
					if(line.offDays == 'SaSuM'){
						satOff = true;
						sunOff = true;
						monOff = true;
					}
					if(line.offDays == 'SuMT'){
						sunOff = true;
						monOff = true;
						tueOff = true;
					}
					var shift = {};
					shift.offDays = line.offDays;
					shift.flexDays = 'Y';
					
					if(!monOff){
						shift.Mon = {
								shiftStart: line.start,
								shiftEnd: line.end,
								break: line.break,
								location: line.location
						};
					}
					if(!tueOff){
						shift.Tue = {
								shiftStart: line.start,
								shiftEnd: line.end,
								break: line.break,
								location: line.location
						};
					}
					if(!wedOff){
						shift.Wed = {
								shiftStart: line.start,
								shiftEnd: line.end,
								break: line.break,
								location: line.location
						};
					}
					if(!thuOff){
						shift.Thu = {
								shiftStart: line.start,
								shiftEnd: line.end,
								break: line.break,
								location: line.location
						};
					}
					if(!friOff){
						shift.Fri = {
								shiftStart: line.start,
								shiftEnd: line.end,
								break: line.break,
								location: line.location
						};
					}
					if(!satOff){
						shift.Sat = {
								shiftStart: line.start,
								shiftEnd: line.end,
								break: line.break,
								location: line.location
						};
					}
					if(!sunOff){
						shift.Sun = {
								shiftStart: line.start,
								shiftEnd: line.end,
								break: line.break,
								location: line.location
						};
					}
					lines.schedules.push(shift);
					tt = line.start + "-" + line.end;
				});
				lines.flexDate = moment($scope.msScheduleLines.flexDate);
				lines.toolTip = "Flex - " + lines.flexDate.format('MM-DD-YYYY') + " (" + tt + ")";
			}
			$('.schedule-table').DataTable().clear().destroy();
			if(exists){
				var list = [];
				angular.forEach($rootScope.listSchedulelines, function(l){
					if(l.lineId == lines.lineId){
						var sLine = jQuery.extend(true, {}, l);
						sLine.bidDtlId = lines.bidDtlId;
						sLine.tag = $scope.msScheduleLines.shiftType;
						sLine.schedules = lines.schedules;
						sLine.comments = $scope.msScheduleLines.comments;
						list.push(sLine);
					}else{
						list.push(l);
						list.sort(function(a,b) {return (a.lineId > b.lineId) ? 1 : ((b.lineId > a.lineId) ? -1 : 0);} );
					}
				});
				$rootScope.listSchedulelines.splice(0, $rootScope.listSchedulelines.length);
				angular.forEach(list, function(l){
					$rootScope.listSchedulelines.push(l);
				});
			}
			else{
				$rootScope.listSchedulelines.push(lines);
			}
			lineToSave = lines;
		}
		else if($scope.msScheduleLines.shiftType == 'Variable' ){
			var exists = false;
			var shift = {};
			angular.forEach($scope.msScheduleLines, function(line){
				if(line.lineNo != null && line.lineNo !=''){
					lines.lineId = line.lineNo; 
					exists = true;
				}
				else{
					lines.lineId = i+"";
				}
				lines.shiftType = $scope.msScheduleLines.shiftType;
				lines.comments = $scope.msScheduleLines.comments;
				var monOff = false;
				var tueOff = false;
				var wedOff = false;
				var thuOff = false;
				var friOff = false;
				var satOff = false;
				var sunOff = false;
				if(line.offDays == 'MT'){
					monOff = true;
					tueOff = true;
				}
				if(line.offDays == 'TW'){
					wedOff = true;
					tueOff = true;
				}
				if(line.offDays == 'WR'){
					wedOff = true;
					thuOff = true;
				}
				if(line.offDays == 'RF'){
					thuOff = true;
					friOff = true;
				}
				if(line.offDays == 'FSa'){
					friOff = true;
					satOff = true;
				}
				if(line.offDays == 'SaSu'){
					satOff = true;
					sunOff = true;
				}
				if(line.offDays == 'SuM'){
					sunOff = true;
					monOff = true;
				}
				if(line.offDays == 'MTW'){
					monOff = true;
					wedOff = true;
					tueOff = true;
				}
				if(line.offDays == 'TWR'){
					wedOff = true;
					tueOff = true;
					thuOff = true;
				}
				if(line.offDays == 'WRF'){
					wedOff = true;
					thuOff = true;
					friOff = true;
				}
				if(line.offDays == 'RFSa'){
					thuOff = true;
					friOff = true;
					satOff = true;
				}
				if(line.offDays == 'FSaSu'){
					friOff = true;
					satOff = true;
					sunOff = true;
				}
				if(line.offDays == 'SaSuM'){
					satOff = true;
					sunOff = true;
					monOff = true;
				}
				if(line.offDays == 'SuMT'){
					sunOff = true;
					monOff = true;
					tueOff = true;
				}
				shift.offDays = line.offDays;
				if(!monOff && line.label=="Mon"){
					shift.Mon = {
							shiftStart: line.start,
							shiftEnd: line.end,
							break: line.break,
							location: line.location
					};
				}
				if(!tueOff && line.label=="Tue"){
					shift.Tue = {
							shiftStart: line.start,
							shiftEnd: line.end,
							break: line.break,
							location: line.location
					};
				}
				if(!wedOff && line.label=="Wed"){
					shift.Wed = {
							shiftStart: line.start,
							shiftEnd: line.end,
							break: line.break,
							location: line.location
					};
				}
				if(!thuOff && line.label=="Thu"){
					shift.Thu = {
							shiftStart: line.start,
							shiftEnd: line.end,
							break: line.break,
							location: line.location
					};
				}
				if(!friOff && line.label=="Fri"){
					shift.Fri = {
							shiftStart: line.start,
							shiftEnd: line.end,
							break: line.break,
							location: line.location
					};
				}
				if(!satOff && line.label=="Sat"){
					shift.Sat = {
							shiftStart: line.start,
							shiftEnd: line.end,
							break: line.break,
							location: line.location
					};
				}
				if(!sunOff && line.label=="Sun"){
					shift.Sun = {
							shiftStart: line.start,
							shiftEnd: line.end,
							break: line.break,
							location: line.location
					};
				}
			});
			lines.schedules.push(shift);
			$('.schedule-table').DataTable().clear().destroy();
			if(exists){
				var list = [];
				angular.forEach($rootScope.listSchedulelines, function(l){
					if(l.lineId == lines.lineId){
						var sLine = jQuery.extend(true, {}, l);
						sLine.bidDtlId = lines.bidDtlId;
						sLine.tag = $scope.msScheduleLines.shiftType;
						sLine.schedules = lines.schedules;
						sLine.comments = $scope.msScheduleLines.comments;
						list.push(sLine);
					}else{
						list.push(l);
						list.sort(function(a,b) {return (a.lineId > b.lineId) ? 1 : ((b.lineId > a.lineId) ? -1 : 0);} );
					}
				});
				$rootScope.listSchedulelines.splice(0, $rootScope.listSchedulelines.length);
				angular.forEach(list, function(l){
					$rootScope.listSchedulelines.push(l);
				});
			}
			else{
				$rootScope.listSchedulelines.push(lines);
			}
			lineToSave = lines;
		}
		
		if(lineToSave){
			var count = $scope.msScheduleLines.rowCount && $scope.msScheduleLines.rowCount != '' ? eval($scope.msScheduleLines.rowCount) : 1;
			var lineId = eval(lineToSave.lineId);
			while(count > 0){
				var line= jQuery.extend(true, {}, lineToSave);
				line.lineId = lineId;
				$scope.saveLines(line);
				if(lineId != eval(lineToSave.lineId)){
					$rootScope.listSchedulelines.push(line);
				}
				lineId++;
				count--;
			}
		}
		$('#addLineModal').modal('hide');
	}

	$scope.shiftChange = function(){
		if($scope.msScheduleLines.shiftType == 'Regular'){
			$("#regDiv").show();
			$("#flexDiv").hide();
			$("#varDiv").hide();
			$("#rotDiv").hide();
		}
		else if($scope.msScheduleLines.shiftType == 'Flex'){
			$("#flexDiv").show();
			$("#regDiv").hide();
			$("#varDiv").hide();
			$("#rotDiv").hide();
			$scope.msScheduleLines.flexDate = $filter('date')($scope.msScheduleLines.flexDate,'MM-dd-yyyy');
			$timeout(function(){
				$('.input-group.date').datepicker({
					defaultViewDate: $scope.msScheduleLines.flexDate,
					todayBtn: "linked",
					keyboardNavigation: false,
					forceParse: false,
					autoclose: true,
					todayHighlight: true,
					calendarWeeks: true,
					format: 'mm-dd-yyyy'
				});
			},100);
			if(!$scope.msScheduleLines.flexDate){
				$("#flexRow").hide();		
			}
		}
		else if($scope.msScheduleLines.shiftType == 'Variable'){
			$("#varDiv").show();
			$("#flexDiv").hide();
			$("#regDiv").hide();
			$("#rotDiv").hide();
		}
		else{
			$("#rotDiv").show();
			$("#flexDiv").hide();
			$("#regDiv").hide();
			$("#varDiv").hide();
		}
	}

	$scope.showFlexSchedule = function(){
		if($scope.msScheduleLines.flexDate){
			$("#flexRow").show();
			$scope.msScheduleLines.flexLines = [{
					lineNo: "",
					shiftType: "",
					bidDtlId: $rootScope.selectedRow.val,
					start: "",
					end: "",
					break: "",
					offDays: "",
					location: ""
			}];
		}
	}
	
	$scope.copyVarRow = function(){
		var newLine = [];
		var days = [];
		var monOff = false;
		var tueOff = false;
		var wedOff = false;
		var thuOff = false;
		var friOff = false;
		var satOff = false;
		var sunOff = false;
		if($scope.varOffDays == 'MT'){
			monOff = true;
			tueOff = true;
		}
		if($scope.varOffDays == 'TW'){
			wedOff = true;
			tueOff = true;
		}
		if($scope.varOffDays == 'WR'){
			wedOff = true;
			thuOff = true;
		}
		if($scope.varOffDays == 'RF'){
			thuOff = true;
			friOff = true;
		}
		if($scope.varOffDays == 'FSa'){
			friOff = true;
			satOff = true;
		}
		if($scope.varOffDays == 'SaSu'){
			satOff = true;
			sunOff = true;
		}
		if($scope.varOffDays == 'SuM'){
			sunOff = true;
			monOff = true;
		}
		if($scope.varOffDays == 'MTW'){
			monOff = true;
			wedOff = true;
			tueOff = true;
		}
		if($scope.varOffDays == 'TWR'){
			wedOff = true;
			tueOff = true;
			thuOff = true;
		}
		if($scope.varOffDays == 'WRF'){
			wedOff = true;
			thuOff = true;
			friOff = true;
		}
		if($scope.varOffDays == 'RFSa'){
			thuOff = true;
			friOff = true;
			satOff = true;
		}
		if($scope.varOffDays == 'FSaSu'){
			friOff = true;
			satOff = true;
			sunOff = true;
		}
		if($scope.varOffDays == 'SaSuM'){
			satOff = true;
			sunOff = true;
			monOff = true;
		}
		if($scope.varOffDays == 'SuMT'){
			sunOff = true;
			monOff = true;
			tueOff = true;
		}

		if(!monOff){
			days.push("Mon");
		}
		if(!tueOff){
			days.push("Tue");
		}
		if(!wedOff){
			days.push("Wed");
		}
		if(!thuOff){
			days.push("Thu");
		}
		if(!friOff){
			days.push("Fri");
		}
		if(!satOff){
			days.push("Sat");
		}
		if(!sunOff){
			days.push("Sun");
		}
		var index = $scope.msScheduleLines.length;
		angular.forEach($scope.msScheduleLines, function(line){
			if(line.selected){
				var newLn = {
						lineNo: line.lineNo,
						start: line.start,
						end: line.end,
						break: line.break,
						offDays: line.offDays,
						location: line.location,
						bidDtlId: line.bidDtlId,
						shiftType: line.shiftType,
						label: days[index]
				}
				newLine.push(newLn);
				index++;
			}
		});
		angular.forEach(newLine, function(lines){
			$scope.msScheduleLines.push(lines);
		});
	}

	$scope.addVarRow = function(){
		var days = [];
		var monOff = false;
		var tueOff = false;
		var wedOff = false;
		var thuOff = false;
		var friOff = false;
		var satOff = false;
		var sunOff = false;
		if($scope.varOffDays == 'MT'){
			monOff = true;
			tueOff = true;
		}
		if($scope.varOffDays == 'TW'){
			wedOff = true;
			tueOff = true;
		}
		if($scope.varOffDays == 'WR'){
			wedOff = true;
			thuOff = true;
		}
		if($scope.varOffDays == 'RF'){
			thuOff = true;
			friOff = true;
		}
		if($scope.varOffDays == 'FSa'){
			friOff = true;
			satOff = true;
		}
		if($scope.varOffDays == 'SaSu'){
			satOff = true;
			sunOff = true;
		}
		if($scope.varOffDays == 'SuM'){
			sunOff = true;
			monOff = true;
		}
		if($scope.varOffDays == 'MTW'){
			monOff = true;
			wedOff = true;
			tueOff = true;
		}
		if($scope.varOffDays == 'TWR'){
			wedOff = true;
			tueOff = true;
			thuOff = true;
		}
		if($scope.varOffDays == 'WRF'){
			wedOff = true;
			thuOff = true;
			friOff = true;
		}
		if($scope.varOffDays == 'RFSa'){
			thuOff = true;
			friOff = true;
			satOff = true;
		}
		if($scope.varOffDays == 'FSaSu'){
			friOff = true;
			satOff = true;
			sunOff = true;
		}
		if($scope.varOffDays == 'SaSuM'){
			satOff = true;
			sunOff = true;
			monOff = true;
		}
		if($scope.varOffDays == 'SuMT'){
			sunOff = true;
			monOff = true;
			tueOff = true;
		}

		if(!monOff){
			days.push("Mon");
		}
		if(!tueOff){
			days.push("Tue");
		}
		if(!wedOff){
			days.push("Wed");
		}
		if(!thuOff){
			days.push("Thu");
		}
		if(!friOff){
			days.push("Fri");
		}
		if(!satOff){
			days.push("Sat");
		}
		if(!sunOff){
			days.push("Sun");
		}
		var index = $scope.msScheduleLines.length;
		var lineId = $scope.msScheduleLines[0].lineNo;
		var newLine = {
				lineNo: lineId+"",
				start: "",
				end: "",
				break: "",
				offDays: $scope.varOffDays,
				location: "",
				bidDtlId: $rootScope.selectedRow.val,
				shiftType: $scope.msScheduleLines.shiftType,
				label: days[index]
		}
		$scope.msScheduleLines.push(newLine);
	}

	$scope.offDayChange = function(){
		var days = [];
		var monOff = false;
		var tueOff = false;
		var wedOff = false;
		var thuOff = false;
		var friOff = false;
		var satOff = false;
		var sunOff = false;
		if($scope.varOffDays == 'MT'){
			monOff = true;
			tueOff = true;
		}
		if($scope.varOffDays == 'TW'){
			wedOff = true;
			tueOff = true;
		}
		if($scope.varOffDays == 'WR'){
			wedOff = true;
			thuOff = true;
		}
		if($scope.varOffDays == 'RF'){
			thuOff = true;
			friOff = true;
		}
		if($scope.varOffDays == 'FSa'){
			friOff = true;
			satOff = true;
		}
		if($scope.varOffDays == 'SaSu'){
			satOff = true;
			sunOff = true;
		}
		if($scope.varOffDays == 'SuM'){
			sunOff = true;
			monOff = true;
		}
		if($scope.varOffDays == 'MTW'){
			monOff = true;
			wedOff = true;
			tueOff = true;
		}
		if($scope.varOffDays == 'TWR'){
			wedOff = true;
			tueOff = true;
			thuOff = true;
		}
		if($scope.varOffDays == 'WRF'){
			wedOff = true;
			thuOff = true;
			friOff = true;
		}
		if($scope.varOffDays == 'RFSa'){
			thuOff = true;
			friOff = true;
			satOff = true;
		}
		if($scope.varOffDays == 'FSaSu'){
			friOff = true;
			satOff = true;
			sunOff = true;
		}
		if($scope.varOffDays == 'SaSuM'){
			satOff = true;
			sunOff = true;
			monOff = true;
		}
		if($scope.varOffDays == 'SuMT'){
			sunOff = true;
			monOff = true;
			tueOff = true;
		}

		if(!monOff){
			days.push("Mon");
		}
		if(!tueOff){
			days.push("Tue");
		}
		if(!wedOff){
			days.push("Wed");
		}
		if(!thuOff){
			days.push("Thu");
		}
		if(!friOff){
			days.push("Fri");
		}
		if(!satOff){
			days.push("Sat");
		}
		if(!sunOff){
			days.push("Sun");
		}
		var lineNo = $scope.msScheduleLines[0].lineNo;
		$scope.msScheduleLines.splice(0,$scope.msScheduleLines.length);
		var index = $scope.msScheduleLines.length;
		var newLine = {
				lineNo: lineNo,
				selected: false,
				start: "",
				end: "",
				break: "",
				offDays: $scope.varOffDays,
				location: "",
				bidDtlId: $rootScope.selectedRow.val,
				shiftType: "",
				label: days[index]
		}
		$scope.msScheduleLines.push(newLine);
	}
	

	$scope.initScheduleTable = function(){
		$timeout(function(){
			$('.schedule-table').DataTable({
				pageLength: 10,
				responsive: true,
				destroy: true,
				dom: '<"html5buttons"B>lTfgitp',
				buttons: [
				          {extend: 'copy'},
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