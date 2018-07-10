var app = angular.module('myApp');
app.controller("userPrefCtrl", userPrefCtrl);
userPrefCtrl.$inject = ["$scope", "$rootScope", "$location","$timeout", "$interval", "$filter",'$http'];

function userPrefCtrl($scope, $rootScope, $location, $timeout, $interval, $filter,$http) {

	
	$scope.filterDataList='';
	$scope.userDataList='';
	
	
	$http.post('/asset/getAllFilterTable', $rootScope.profile.userName)
	.then(function(success) {
		$scope.filterDataList = success.data;
		console.log('success >> '+JSON.stringify(success.data));
		
		 var gridDiv = document.querySelector('#bestHtml5Grid');
	     new agGrid.Grid(gridDiv, gridOptions);

	     gridOptions.api.setRowData($scope.filterDataList);
	  });
	
	$http.get('/preference/getlistUsers')
	.then(function(success) {
		$scope.userDataList = success.data;
		 var gridDiv = document.querySelector('#bestHtmlUser');
	     new agGrid.Grid(gridDiv, gridOptionsUser);

	     gridOptionsUser.api.setRowData($scope.userDataList);
		console.log('$scope.userDataList success >> '+JSON.stringify(success.data));	 
	  });
	
	
	 var columnDefs = [
	        {headerName: "idval", field: "idval", width: 150},
	        {headerName: "fName", field: "fName", width: 90},
	        {headerName: "userName", field: "userName", width: 120},
	        {headerName: "filterData", field: "filterData", width: 410}
	    ];
	 
	 var columnUser = [
	        {headerName: "userId", field: "userId", width: 150},
	        {headerName: "userName", field: "userName", width: 90},
	        {headerName: "firstName", field: "firstName", width: 120},
	        {headerName: "lastName", field: "lastName", width: 120},
	        {headerName: "aaID", field: "aaID", width: 120},
	        {headerName: "userType", field: "userType", width: 120},
	        {headerName: "role", field: "role", width: 120}
	    ];
	 
	 var gridOptions = {
		        columnDefs: columnDefs,
		        pagination: true,
		        paginationAutoPageSize: true,
		        enableFilter: true,
		        enableSorting: true,
		        refreshCells: true,
		        onModelUpdated: modelUpdated

		    };
	 var gridOptionsUser = {
		        columnDefs: columnUser,
		        pagination: true,
		        paginationAutoPageSize: true,
		        enableFilter: true,
		        enableSorting: true,
		        refreshCells: true,
		        onModelUpdated: modelUpdatedUser

		    };
	 function modelUpdated() {
	        var model = gridOptions.api.getModel();
	        var totalRows = model.getTopLevelNodes().length;
	        var processedRows = model.getRowCount();
	        var eSpan = document.querySelector('#rowCount');
	        eSpan.innerHTML = processedRows.toLocaleString() + ' / ' + totalRows.toLocaleString();
	    };
	function modelUpdatedUser() {
	        var model = gridOptionsUser.api.getModel();
	        var totalRows = model.getTopLevelNodes().length;
	        var processedRows = model.getRowCount();
	        var eSpan = document.querySelector('#rowCount');
	        eSpan.innerHTML = processedRows.toLocaleString() + ' / ' + totalRows.toLocaleString();
	    };
	 
	 
	 document.addEventListener('DOMContentLoaded', function() {
	    	console.log('$scope.records.data >> '+ $scope.records.data);
	        var gridDiv = document.querySelector('#bestHtml5Grid');
	        new agGrid.Grid(gridDiv, gridOptions);

	        gridOptions.api.setRowData(JSON.stringify($scope.filterDataList));
	       
	    });
	
  
}
