	var app = angular.module('myApp');
	app.controller("assetMgmtCtrl", assetMgmtCtrl);
	assetMgmtCtrl.$inject = ["$scope", "$rootScope", "$location","$timeout", "$interval", "$filter",'$http'];
	
	function assetMgmtCtrl($scope, $rootScope, $location, $timeout, $interval, $filter,$http,ngDialog) {
	
		$scope.isCreateasset = false;
	
		$scope.filterDataList = [];
		$scope.viewRowList = [];
		$scope.filterData = '';
		$scope.filterName = '';
		
		$scope.deleteDataList = [];
		$scope.viewRowFlag =false;
		$scope.viewRow ={
		    	
		    	assetId:'',
		    	manufactureNo:'',
		    	install:'',
		    	endofSale:'',
		    	eolAnnoucement:'',
		    	serialNo:'',
		    	poNumber:'',
		    	installDate:''
		    	
		    };
		
		$scope.am ={
	    	
	    	assetId:'',
	    	manufactureNo:'',
	    	install:'',
	    	endofSale:'',
	    	eolAnnoucement:'',
	    	serialNo:'',
	    	poNumber:'',
	    	installDate:''
	    	
	    };
	    
		
	    $scope.createNewAsset = function(){
	    	$scope.isCreateasset = true;
	    	
	    }; 
	    
	    //To fetch filter data
		$http.post('/asset/getAllFilterTable', $rootScope.profile.userName)
		.then(function(success) {
			$scope.filterDataList = success.data;
			console.log('success >> '+JSON.stringify(success.data));
		  });
		
	
	   
	    
	    
	   
	    var columnDefs = [
	                      
	                      {
	                          headerName: '',
	                          children: [
	                              {
	                                  headerName: "AssetId", field: "assetId",headerCheckboxSelection: true, headerCheckboxSelectionFilteredOnly: true,
	                                  checkboxSelection: true,suppressMovable: true,
	                                  width: 150
	                              },
	                              {
	                                  headerName: "ManufacturePartNumber",field:"manufactureNo", width: 125, suppressSorting: true,suppressMovable: true
	                                  
	                              }
	                              
	                          ]
	                      },
	                      {
	                          headerName: '',
	                          children: [
	                              {headerName: "EOLAnnoucment", field: "eolAnnoucement", width: 180, filter: 'agTextColumnFilter',editable: false},
	                              {headerName: "SerialNo", field: "serialNo", width: 120, filter: 'agTextColumnFilter'},
	                              {headerName: "PoNo", field: "poNumber", width: 120, filter: 'agTextColumnFilter'},
	                              {headerName: "EndOfSale", field: "endofSale", width: 120, filter: 'agTextColumnFilter',
	                            	  	cellFormatter: function(data) {
	                                	    return moment(data.value).format('L');
	                                	}
	                              }
	                              
	                          ]
	                      },
	                      {
	                          headerName: 'Install Details',
	                          children: [
	                              {headerName: "Install", field: "install", width: 120, filter: 'agTextColumnFilter',editable: false},
	                              {headerName: "InstallDate", field: "installDate",type: ['dateColumn', 'nonEditableColumn'], width: 120, filter: 'agDateColumnFilter',cellFormatter: function(data) {
	                              	    return moment(data.value).format('L');
	                              	}
	                              }
	                          ]
	                      }
	                      
	                  ];
	    
	    
	    var gridOptions = {
	            columnDefs: columnDefs,
	            rowSelection: 'multiple',
	            onRowSelected: onRowSelected,
	            enableColResize: true,
	            enableSorting: true,
	            enableFilter: true,
	            defaultColDef: {
	                editable: true,
	                width: 100
	            },groupSelectsChildren: true,
	            suppressRowClickSelection: true,
	            suppressAggFuncInHeader: true,
	            enableRangeSelection: true,
	            suppressRowClickSelection: true,
	            animateRows: true,
	            onModelUpdated: modelUpdated,
	            debug: true
	        };
	
	        var btBringGridBack;
	        var btDestroyGrid;
	
	        // wait for the document to be loaded, otherwise
	        // ag-Grid will not find the div in the document.
	        document.addEventListener("DOMContentLoaded", function () {
	            btBringGridBack = document.querySelector('#btBringGridBack');
	            btDestroyGrid = document.querySelector('#btDestroyGrid');
	
	            // this example is also used in the website landing page, where
	            // we don't display the buttons, so we check for the buttons existance
	            if (btBringGridBack) {
	                btBringGridBack.addEventListener('click', onBtBringGridBack);
	                btDestroyGrid.addEventListener('click', onBtDestroyGrid);
	            }
	
	            addQuickFilterListener();
	            onBtBringGridBack();
	        });
	
	        function onRowSelected(event) {
	          //  window.alert("row now" + JSON.stringify(event.node.data) + " selected = " + event.node.selected);
	           //alert('deleteDataList  >> '+ $scope.deleteDataList);
	            if(event.node.selected == 'false'|| event.node.selected == false){            
	            	var index = $scope.deleteDataList.indexOf(event.node.data.assetId);
	            	if (index > -1) {
	            		$scope.deleteDataList.splice(index, 1);
	            		$scope.viewRowList.splice(index, 1);
	            		
	            	}
	            	//alert('deleteDataList2  >> '+ $scope.deleteDataList);
	            }else{
	            	   $scope.deleteDataList.push(event.node.data.assetId);
	                  // alert('deleteDataList3  >> '+ $scope.deleteDataList);
	                   
	                   $scope.viewRow={};
	                   
	                   $scope.viewRow = {
	           	    	assetId:event.node.data.assetId,
	           	    	manufactureNo:event.node.data.manufactureNo,
	           	    	install:event.node.data.install,
	           	    	endofSale:event.node.data.endofSale,
	           	    	eolAnnoucement:event.node.data.eolAnnoucement,
	           	    	serialNo:event.node.data.serialNo,
	           	    	poNumber:event.node.data.poNumber,
	           	    	installDate:event.node.data.installDate          	    	
	           	    };
	                   
	                   $scope.viewRowList.push($scope.viewRow);
	                  // alert('viewRow  >> '+ JSON.stringify($scope.viewRowList));
	            }
	        }
	        
	        function onBtBringGridBack() {
	            var eGridDiv = document.querySelector('#bestHtml5Grid');
	            new agGrid.Grid(eGridDiv, gridOptions);
	            if (btBringGridBack) {
	                btBringGridBack.disabled = true;
	                btDestroyGrid.disabled = false;
	            }
	            // createRowData is available in data.js
	            gridOptions.api.setRowData($scope.assets );
	       /* 
	            var dobFilterComponent = gridOptions.api.getFilterInstance('InstallDate');
	
	         // get filter model
	         var model1 = dobFilterComponent.getModel();
	
	         // OR set filter model and update
	         dobFilterComponent.setModel1({
	             type:'equals',
	             dateFrom:'2008-08-24'
	         });
	         gridOptions.api.onFilterChanged()
	
	         // NOTE number filter allows for ranges
	         dobFilterComponent.setModel1({
	             type:'inRange',
	             dateFrom:'2008-08-24'
	             dateTo:'2012-08-24'
	         });
	         gridOptions.api.onFilterChanged();
	        
	            */
	        }
	
	        $scope.saveFilterModel=function() {
	        	//ngDialog.open({ template: 'alert.html', className: 'ngdialog-theme-default'});
	        	
	    		
	            var savedFilters = '[]';
	            $scope.assetFilter ='';
	            
	            if($scope.filterName !=''){
	            	
	            	window.savedModel = gridOptions.api.getFilterModel();
	                if (window.savedModel) {
	                      savedFilters = window.savedModel;//Object.keys(window.savedModel);
	                } else {
	                    savedFilters = '-none-';
	                }
	               // $scope.filterData =savedFilters;
	                console.log('savedFilters>>'+JSON.stringify(savedFilters));
	               console.log('$scope.filterName >>'+$scope.filterName);
	               
	            	$scope.assetFilter ={
	            	    	fName: $scope.filterName,
	            	    	userName:$rootScope.profile.userName,
	            	    	filterData:JSON.stringify(savedFilters)
	            	    };
	            	//filterName:'Demo',
	    	    	//filter:JSON.stringify(savedFilters)
	                
	                //document.querySelector('#savedFilters').innerHTML = JSON.stringify(savedFilters);
	                $http.post('/asset/saveFilterTable', $scope.assetFilter)
	            	.then(function(success) {
	            		//$scope.records=success;
	            		console.log('success >>'+success);
	            		
	            		$http.post('/asset/getAllFilterTable', $rootScope.profile.userName)
	            		.then(function(success) {
	            			$scope.filterDataList = success.data;
	            			console.log('success >> '+JSON.stringify(success.data));
	            		  });
	            		
	            	  });
	                
	                $('#myModal').style.display = "none";
	                
	        		alert('Filter Criteria Is saved Successfully!');
	        		//modal.style.display = "none";
	        	}else{
	        		alert('Please Provide Name to the Filter Criteria.');
	        	}
	            
	            
	            
	        }
	        
	        $scope.resetSearch=function()
	        {
	        	gridOptions.api.setFilterModel('');
	    	    gridOptions.api.onFilterChanged();
	        	//onBtBringGridBack();
	        };
	
	        $scope.veiwSelected=function(){
	        	if($scope.viewRowList.length<=0){
	        		alert('Please select the row to view');
	        	}else if($scope.viewRowList.length>1){
	        		alert('Please select only one row to view');
	        	}else{
	        		$scope.viewRow = $scope.viewRowList[0];
	        		$scope.Modal2 = {"display" : "block" };
	        		//alert('lets View >>'+JSON.stringify($scope.viewRow));
	        	}
	        }
	        
	        $scope.closeModel2=function(){		
	               $scope.Modal2 = {"display" : "none" };		
	         }  
	        
	        $scope.deleteSelected=function(){
	        	$http.post('/asset/deleteGridValue', $scope.deleteDataList)
	    		.then(function(success) {
	    			//$scope.filterDataList = success.data;
	    			alert(JSON.stringify(success.data)+' row deleted successfully');
	
	        		$("#bestHtml5Grid").empty();
	            	$("#bestHtml5Grid").load();
	
	    	        	 $http.get('/asset/getlist').then(function(data){
	    	                 $scope.assets = data.data;
	    	                 onBtBringGridBack();
	    	            })
	    			//console.log('success >> '+JSON.stringify(success.data));
	    		  });
	        	//alert('lets Delete >>'+JSON.stringify($scope.deleteDataList));
	        	
	        };
	        $scope.restoreFromHardCoded=function() {
	       		
	            var hardcodedFilter =JSON.parse($scope.searchid) ;//{"manufactureNo":["MRF123456","MRF2323232"]};
	            console.log('hardcodedFilter>>'+$scope.searchid);
	        	
	            //saveAssetFilter($scope.filterData);
	            
	            /*{
	            	      country: ['Ireland', 'United States'],
	            	        age: {type: 'lessThan', filter: '26'},
	            	        athlete: {type: 'startsWith', filter: 'Mich'},
	            	        date: {type: 'lessThan', dateFrom: '2010-01-01'}
	            	    };*/
	            	    gridOptions.api.setFilterModel(hardcodedFilter);
	            	    gridOptions.api.onFilterChanged();
	            	}
	      
	
	        function addQuickFilterListener() {
	            var eInput = document.querySelector('#quickFilterInput');
	            eInput.addEventListener("input", function () {
	                var text = eInput.value;
	                gridOptions.api.setQuickFilter(text);
	            });
	        }
	
	        function modelUpdated() {
	            var model = gridOptions.api.getModel();
	            var totalRows = model.getTopLevelNodes().length;
	            var processedRows = model.getRowCount();
	            var eSpan = document.querySelector('#rowCount');
	            eSpan.innerHTML = processedRows.toLocaleString() + ' / ' + totalRows.toLocaleString();
	        }
	        
	        
	        $scope.loadListOfAssetManage = function() {
	        	 $http.get('/asset/getlist').then(function(data){
	                 $scope.assets = data.data;
	                 onBtBringGridBack();
	            })
	    	};
	        
	        
	      
	        
	        $scope.saveAsset =function(obj){
	        	$http.post('/asset/save/',obj).
	    		then(function(data, status, headers, config) {
	    		if(data) {
	    			$scope.am ={};
	    			$scope.isCreateasset = false;
	    			//$scope.loadListOfAssetManage();
	    			alert("Asset has been sucessfully saved"); 
	    	        }
	            });
	         };
	        
	        $scope.loadListOfAssetManage();
	   
	 
	}
