var myApp = angular.module('myApp');
myApp.controller('mainCtrl', mainCtrl);
mainCtrl.$inject = ['$scope', '$rootScope', '$location', '$timeout','$filter', '$window','$http'];
function mainCtrl($scope, $rootScope, $location, $timeout, $filter,$window, $http, store) {
    $scope.loading = true;
    $scope.showDetails = false;
    $scope.flag=false;
    $scope.records=[];
    $scope.exportData=[];
    
    $scope.prefinit = function() {
        if ($scope.intervalObj)
            $interval.cancel($scope.intervalObj);
    }

    $scope.resultinit = function() {
        if ($scope.intervalObj)
            $interval.cancel($scope.intervalObj);
    }
    
    $scope.initFunc = function() {
    	  $http.get("/elastic/get/1")
    	  .then(function(response){
    		  console.log("----response data--"+response.data);
    		  $scope.details = response.data;
    		  $scope.gridData = [];
    		  if ($scope.details.hits !== undefined && $scope.details.hits.total !== undefined && $scope.details.hits.total >0) {
    			  $scope.gridData = $scope.details.hits.hits;
    			  var eGridDiv = document.querySelector('#bestHtml5Grid');
    		        new agGrid.Grid(eGridDiv, gridOptions);
//    		        if (btBringGridBack) {
//    		            btBringGridBack.disabled = true;
//    		            btDestroyGrid.disabled = false;
//    		        }
    		        // createRowData is available in data.js
    		        gridOptions.api.setRowData($scope.gridData);
    			  console.log('----array Data'+$scope.gridData);
    		  }
    		  });
    }
    $scope.initFunc();
   // $scope.getDropDownValues = function() {
    	
    //}
    
    
    
    
    
    $scope.formData = {}; 
    $scope.selectedRow = {'name':'--Select--'};
    
    $scope.items = [{
        'name': 'EOL' , 'color':'blue'
    }, {
        'name': 'Expired/Expiring' ,'color':'orange'
    }, {
        'name': 'EOL & Expired' , 'color':'red'
    }];
       
    
    $scope.getSelectItems = function(item) {
    	$scope.selectedRow = item;
    	
    }
    var btBringGridBack;
    var btDestroyGrid;
    
    function modelUpdated() {
        var model = gridOptions.api.getModel();
        var totalRows = model.getTopLevelNodes().length;
        var processedRows = model.getRowCount();
        var eSpan = document.querySelector('#rowCount');
        eSpan.innerHTML = processedRows.toLocaleString() + ' / ' + totalRows.toLocaleString();
    };

    // wait for the document to be loaded, otherwise
    // ag-Grid will not find the div in the document.
    document.addEventListener("DOMContentLoaded", function () {
        btBringGridBack = document.querySelector('#btBringGridBack');
        btDestroyGrid = document.querySelector('#btDestroyGrid');

        // this example is also used in the website landing page, where
        // we don't display the buttons, so we check for the buttons existance
        if (btBringGridBack) {
            btBringGridBack.addEventListener('click', onBtBringGridBack);
            btDestroyGrid.addsventListener('click', onBtDestroyGrid);
        }

        addQuickFilterListener();
        onBtBringGridBack();
    });
    
    function addQuickFilterListener() {
        var eInput = document.querySelector('#quickFilterInput');
        eInput.addEventListener("input", function () {
            var text = eInput.value;
            gridOptions.api.setQuickFilter(text);
        });
    }

    function onBtBringGridBack() {
        var eGridDiv = document.querySelector('#bestHtml5Grid');
        new agGrid.Grid(eGridDiv, gridOptions);
        if (btBringGridBack) {
            btBringGridBack.disabled = true;
            btDestroyGrid.disabled = false;
        }
        // createRowData is available in data.js
        gridOptions.api.setRowData($scope.records.data );
   
    }


    
   
   // 
    $scope.ExpiredLst = [
        { id: 'r1', name: '30 Days' },
        { id: 'r2', name: '90 Days' },
        { id: 'r3', name: 'Specific Date' }];
    
    
    $scope.ChangeValue=function()
    {
    	
    	if($scope.itemid=='r3')
    		{
    		$scope.flag=true;
    		}
    	else
    		{
    		$scope.flag=false;
    		}
    }
    $scope.funVal=function()
    {
    		alert('Expired - Specific Date');
    		
    }
    
    //$scope.exportData=;
    
   $scope.exportAssetsExcel=function(){
    	
    	
    	$scope.exportData=$scope.records;
    	
    	    	
    }
    $scope.JSONToCSVConvertor=function (JSONData, ReportTitle, ShowLabel) {
        //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
        var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
        
        var CSV = '';    
        //Set Report title in first row or line
        
        CSV += ReportTitle + '\r\n\n';

        //This condition will generate the Label/Header
        if (ShowLabel) {
            var row = "";
            
            //This loop will extract the label from 1st index of on array
            for (var index in arrData[0]) {
                
                //Now convert each value to string and comma-seprated
                row += index + ',';
            }

            row = row.slice(0, -1);
            
            //append Label row with line break
            CSV += row + '\r\n';
        }
        
        //1st loop is to extract each row
        for (var i = 0; i < arrData.length; i++) {
            var row = "";
            
            //2nd loop will extract each column and convert it in string comma-seprated
            for (var index in arrData[i]) {
                row += '"' + arrData[i][index] + '",';
            }

            row.slice(0, row.length - 1);
            
            //add a line break after each row
            CSV += row + '\r\n';
        }

        if (CSV == '') {        
            alert("Invalid data");
            return;
        }   
        
        //Generate a file name
        var fileName = "MyReport_";
        //this will remove the blank-spaces from the title and replace it with an underscore
        fileName += ReportTitle.replace(/ /g,"_");   
        
        //Initialize file format you want csv or xls
        var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
        
        // Now the little tricky part.
        // you can use either>> window.open(uri);
        // but this will not work in some browsers
        // or you will not get the correct file extension    
        
        //this trick will generate a temp <a /> tag
        var link = document.createElement("a");    
        link.href = uri;
        
        //set the visibility hidden so it will not effect on your web-layout
        link.style = "visibility:hidden";
        link.download = fileName + ".csv";
        
        //this part will append the anchor tag and remove it after automatic click
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    
    
    
    /*var columnDefs = [
        {headerName: "id", field: "id", width: 150},
        {headerName: "assetId", field: "assetId", width: 90},
        {headerName: "endDate", field: "endDate", width: 120},
        {headerName: "endofLife", field: "endofLife", width: 120}},
        {headerName: "endofSale", field: "endofSale", width: 90},
        {headerName: "eolAnnoucement", field: "eolAnnoucement", width: 110},
        {headerName: "install", field: "install", width: 110},
        {headerName: "installDate", field: "installDate", width: 100},
        {headerName: "manufactureNo", field: "manufactureNo", width: 100},
        {headerName: "poNumber", field: "poNumber", width: 100},
        {headerName: "serialNo", field: "serialNo", width: 100}
    ];*/
    var columnDefs = [
        //{headerName: "id", field: "id", width: 150},
        {headerName: "assetId", field: "_source.AssetID", 
        	width: 140,headerCheckboxSelection: true, headerCheckboxSelectionFilteredOnly: true,
            checkboxSelection: true,suppressMovable: true},
        {headerName: "endDate", field: "_source.Contracts[0].EndDate", width: 120
        },
        {headerName: "endofLife", field: "_source.EOLA", width: 120,
    	  	cellFormatter: function(data) {
        	    return moment(data.value).format('L');
        	}
        },
        {headerName: "eolAnnoucement", field: "EOLA", width: 140},
        {headerName: "install", field: "install", width: 110},
        {headerName: "installDate", field: "installDate", width: 110,
    	  	cellFormatter: function(data) {
        	    return moment(data.value).format('L');
        	}
        },
        {headerName: "manufactureNo", field: "manufactureNo", width: 140},
        {headerName: "poNumber", field: "poNumber", width: 140},
        {headerName: "serialNo", field: "serialNo", width: 160}
    ];


    var gridOptions = {
        columnDefs: columnDefs,
        pagination: true,
        enableColResize: true,
        onColumnResized: function(params) {
            console.log(params);
        },
        paginationAutoPageSize: true,
        enableFilter: true,
        enableSorting: true,
        refreshCells: true,
        onModelUpdated: modelUpdated

    };
    function getDisplayedRowAtIndex() {
        var rowNode = gridOptions.api.getDisplayedRowAtIndex(0);
        console.log('getDisplayedRowAtIndex(0) => ' + nodeToString(rowNode));
    }

    function getDisplayedRowCount() {
        var count = gridOptions.api.getDisplayedRowCount();
        console.log('getDisplayedRowCount() => ' + count);
    }

    function printAllDisplayedRows() {
        var count = gridOptions.api.getDisplayedRowCount();
        console.log('## printAllDisplayedRows');
        for (var i = 0; i<count; i++) {
            var rowNode = gridOptions.api.getDisplayedRowAtIndex(i);
            console.log('row ' + i + ' is ' + rowNode.data.athlete);
        }
    }

    function printPageDisplayedRows() {
        var rowCount = gridOptions.api.getDisplayedRowCount();
        var lastGridIndex = rowCount - 1;
        var currentPage = gridOptions.api.paginationGetCurrentPage();
        var pageSize = gridOptions.api.paginationGetPageSize();
        var startPageIndex = currentPage * pageSize;
        var endPageIndex = ((currentPage + 1) * pageSize) - 1;

        if (endPageIndex > lastGridIndex) {
            endPageIndex = lastGridIndex;
        }

        console.log('## printPageDisplayedRows');
        for (var i = startPageIndex; i<=endPageIndex; i++) {
            var rowNode = gridOptions.api.getDisplayedRowAtIndex(i);
            console.log('row ' + i + ' is ' + rowNode.data.athlete);
        }
    }

    function nodeToString(rowNode) {
        return rowNode.data.athlete + ' ' + rowNode.data.year;
    }

    // setup the grid after the page has finished loading
    /*document.addEventListener('DOMContentLoaded', function() {
    	console.log('$scope.records.data >> '+ $scope.records.data);
        var gridDiv = document.querySelector('#bestHtml5Grid');
        new agGrid.Grid(gridDiv, gridOptions);

        gridOptions.api.setRowData($scope.records.data);
       
    });*/
    
    $scope.viewAllAssets = function(typeBtn){
//debugger;
    	//alert(typeBtn);
    	$scope.dateVal=[];
    	$scope.dateVal.push(typeBtn);
    	if($scope.itemid=='r1' || $scope.itemid=='r2')
    	{
    		var today = new Date();
    		var ddd1 = today.getDate();
        	var mm1 = today.getMonth() + 1;
        	var y1 = today.getFullYear();

        	var someFormattedDate1 = ddd1 + '/'+ mm1+ '/'+ y1;
        	$scope.dateVal.push(someFormattedDate1);
        	$scope.dateVal.push($scope.itemid);

    	}
    	if($scope.itemid=='r3')
    	{
    	//	debugger;
    		console.log($scope.formData.fromdate+"------------------------"+$scope.formData.todate);
    		var today1 = $scope.formData.fromdate;
    		var ddd = today1.getDate();
        	var mm = today1.getMonth() + 1;
        	var y = today1.getFullYear();

        	var startFormattedDate = ddd + '/'+ mm+ '/'+ y;
        	
        	var today2 = $scope.formData.todate;
    		var ddd2 = today2.getDate();
        	var mm2 = today2.getMonth() + 1;
        	var y2 = today2.getFullYear();

        	var endFormattedDate = ddd2 + '/'+ mm2+ '/'+ y2;
        	console.log(startFormattedDate+"------------------------"+endFormattedDate);
    		$scope.dateVal.push(startFormattedDate);
    		$scope.dateVal.push(endFormattedDate);
    		
    	}
    	//alert($scope.endType);
    	$scope.dateVal.push($scope.endType);
    	/*if(typeBtn=='all')
    		{$scope.dateVal.length = 0;
    		$scope.dateVal.push(typeBtn);
    		$scope.dateVal.push(typeBtn);
    		$scope.dateVal.push(typeBtn);
    		
    		} 
    	*/
    	
    	console.log($scope.dateVal);
    	$http.post('/asset/getlistByDate', $scope.dateVal)
    	.then(function(success) {
    		$scope.records=success;	
    		console.log(success.data);
    		
    		$("#bestHtml5Grid").empty();
        	$("#bestHtml5Grid").load();
    //debugger;
        	
        	 var gridDiv = document.querySelector('#bestHtml5Grid');
            new agGrid.Grid(gridDiv, gridOptions);
        	//onBtBringGridBack();
             gridOptions.api.setRowData($scope.records.data);
             $("#bestHtml5Grid").load();
    	  });
    
    	
    	
    	if(!$scope.showDetails){
    		$scope.showDetails = true;
    		
    	}
    	
    };
    



}
