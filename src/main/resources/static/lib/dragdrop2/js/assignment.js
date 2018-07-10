var myApp = angular.module('myApp');

myApp.controller("amtCtrl", amtCtrl);
amtCtrl.$inject = ["$scope","$rootScope",'$timeout','sbDataFactory', 'NgTableParams', 'sbdServices'];

function amtCtrl($scope, $rootScope, $timeout, sbDataFactory, NgTableParams, sbdServices) {
	
    function timeRangeFilter(data, filterValues /*, comparator*/ ) {
        return data.filter(function(item) {
            var startFrom = filterValues.startTimeFrom == null ? 0 : filterValues.startTimeFrom;
            var endFrom = filterValues.endTimeFrom == null ? 0 : filterValues.endTimeFrom;
            var startTo = filterValues.startTimeTo == null ? 2359 : filterValues.startTimeTo;
            var endTo = filterValues.endTimeTo == null ? 2359 : filterValues.endTimeTo;
            var day = filterValues.day == null ? "Mon" : filterValues.day;
            return (startFrom <= item[day][0].shiftStart && startTo >= item[day][0].shiftStart) && (endFrom <= item[day][0].shiftEnd && endTo >= item[day][0].shiftEnd);
        });
    }
    
	$scope.bidDetailSearch = {};
	var getBidDetails = sbdServices.getBidDetail($scope.bidDetailSearch); 
	getBidDetails.then(function(data){
		$scope.bidDetailLst = data;
	});
    
  
	$rootScope.loadAsnmnt = function() {
		if(($rootScope.selectedRow && $rootScope.selectedRow.val) || $rootScope.sbDtl){
			$scope.sbBidDtlId=$rootScope.sbDtl ? $rootScope.sbDtl : $rootScope.selectedRow.val;
			sbDataFactory.getData().then(function(response) {
				if ((typeof($rootScope.uPreferences) != 'undefined' && $rootScope.uPreferences.length > 0)) {
					$rootScope.records.scheduleLines = $rootScope.uPreferences;
				} else {
					$rootScope.records = response.data;
					$scope.oldrecords = $rootScope.records;
				}
				$scope.intervalFunction();
			}, function(error) {
				$scope.status = 'Unable to load customer data: ' + error.message;
				$scope.intervalFunction();
			});
		}
	};

    $scope.intervalFunction = function(){
		$('#dataTables').DataTable().clear().destroy();
    	var data = [];
    	angular.forEach($rootScope.records, function(line){
    		if(line.bidDtlId == $scope.sbBidDtlId){
    			data = line.scheduleLines;
    		}
    	});
        $scope.tableParams = new NgTableParams({
            count: 100, // count per page
            // initial sort order
            sorting: {
                preference: "asc"
            }
        }, {
            counts: [], // hide page counts control
            total: 1, // value less than count hide pagination
            filterOptions: {
                filterFn: timeRangeFilter
            },
            filterLayout: "horizontal",
            dataset: data
        });
        
        $timeout(function(){
			$('#dataTables').DataTable({
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
		}, 150);
    }

    $scope.models = {
      cars: []
    };
    
    $scope.models.cars.push({id: "1", subject: "Employee", name: "Kevin Jones"});
    $scope.models.cars.push({id: "2", subject: "Employee", name: "Jonathan Parker"});
    $scope.models.cars.push({id: "3", subject: "Employee", name: "Amelia Brooks"});
    $scope.models.cars.push({id: "4", subject: "Employee", name: "James Stark"});
    $scope.models.cars.push({id: "5", subject: "Employee", name: "Dana Hufler"});
    $scope.models.cars.push({id: "6", subject: "Employee", name: "Stacy Butler"});
    $scope.models.cars.push({id: "7", subject: "Employee", name: "Ben Hawkins"});
    $scope.models.cars.push({id: "8", subject: "Employee", name: "Oscar Smith"});
    $scope.models.cars.push({id: "9", subject: "Employee", name: "Martha Jones"});
    $scope.models.cars.push({id: "10", subject: "Employee", name: "Sean Scott"});

    $scope.currentDropElement = null;

    $scope.remove = function(l, o) {
      var index = l.indexOf(o);
      if (index > -1) {
        l.splice(index, 1);
      }
    };

    $scope.onDragStart = function(data, dragElement, e) {
        // var element = dragElement.el[0];
        // var mouseX = e.pageX;
        // var mouseY = e.pageY;
        // dragElement.el[0].style.top =  mouseX;
        // dragElement.el[0].style.left =  mouseY;
    };

    $scope.onDragEnd = function() {

    };

    $scope.onDragOver = function(data, dragElement, dropElement) {
        $scope.currentDropElement = dropElement;
        dropElement.el[0].classList.add("rowSelected"); //highlight row
    };

    $scope.onDragLeave = function(data, dragElement, dropElement) {
        $scope.currentDropElement = null;
        dropElement.el[0].classList.remove("rowSelected"); //remove highlight on leave
    };

    $scope.onDrop = function(data, el1, el2, event, lineId) {
      el2.el[0].classList.remove("rowSelected"); //remove highlight after drop
      if (data && $scope.currentDropElement) {
    	  for (var i = 0; i < $scope.tableParams.data.length; i++) {
    		  if($scope.tableParams.data[i].lineId == lineId){
    			  if(!$scope.tableParams.data[i].winner){
    				  $scope.tableParams.data[i].winner = [];
    			  }
    			  $scope.tableParams.data[i].winner.push(data.name);
    		  }
    	}
        //$scope.models.basket.push(data);
        $scope.remove($scope.models.cars, data);
      }
    };
  }