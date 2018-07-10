(function() {

  'use strict';

  angular
    .module('myApp')
    .controller('datreportCtrl', datreportCtrl);


  datreportCtrl.$inject = ['$scope', '$rootScope', '$http', 'bdServices'];

  function datreportCtrl($scope, $rootScope, $http, bdServices) {
	  
	  $scope.bidDetailSearch = {};
		var getBidDetails = bdServices.getBidDetail($scope.bidDetailSearch); 
		getBidDetails.then(function(data){
			$scope.bidDetailLst = data;
		});
	  $scope.object=[];
	  $scope.onSubmit=function(val){
		  $scope.object=[];
		 for(var i=0;i<$scope.items.length;i++){
			 if($scope.items[i].name==val){
				 $scope.object.push($scope.items[i]); 
			 }
		 }
		 testingData($scope.object);
	  }
	  
	  $scope.items=[{
		  'id':1,
		  'name':'2017 ABQ-ABQ FT',
		  'employeeName':'Qaiser',
		  'estimatedaccrual':'165',
		  'biddingweek':'4',
		  'datHours':'5'
		  },{
		  'id':2,
		  'name':'2017 ABQ-ABQ FT',
		  'employeeName':'John',
		  'estimatedaccrual':'100',
		  'biddingweek':'2',
		  'datHours':'20'
		  },{
		  'id':3,
		  'name':'2017 ABQ-ABQ FT',
		  'employeeName':'javed',
		  'estimatedaccrual':'88',
		  'biddingweek':'2',
		  'datHours':'8'
		  },{
		  'id':4,
		  'name':'2017 ABQ-ABQ FT',
		  'employeeName':'Jen',
		  'estimatedaccrual':'130',
		  'biddingweek':'3',
		  'datHours':'10'
		  },{
		  'id':5,
		  'name':'2017 ABQ-ABQ FT',
		  'employeeName':'Mickey',
		  'estimatedaccrual':'170',
		  'biddingweek':'4',
		  'datHours':'10'
		  },{
		  'id':6,
		  'name':'2017 BOS-BOS FT',
		  'employeeName':'Stefan',
		  'estimatedaccrual':'65',
		  'biddingweek':'1',
		  'datHours':'25'
		  },{
		  'id':7,
		  'name':'2017 BOS-BOS FT',
		  'employeeName':'Taylor',
		  'estimatedaccrual':'50',
		  'biddingweek':'1',
		  'datHours':'10'
		  },{
		  'id':8,
		  'name':'2017 BOS-BOS FT',
		  'employeeName':'Lopez',
		  'estimatedaccrual':'150',
		  'biddingweek':'3',
		  'datHours':'30'
		  },{
		  'id':9,
		  'name':'2017 BOS-BOS FT',
		  'employeeName':'Jennifer',
		  'estimatedaccrual':'135',
		  'biddingweek':'3',
		  'datHours':'15'	  
		  },{
		  'id':10,
		  'name':'2017 BOS-BOS FT',
	      'employeeName':'Steven',
		  'estimatedaccrual':'165',
		  'biddingweek':'4',
		  'datHours':'5'	  
		  },{
		  'id':11,
		  'name':'2017 RDU FS',
		  'employeeName':'Thomas',
		  'estimatedaccrual':'100',
		  'biddingweek':'2',
		  'datHours':'20'	  
		  },{
	      'id':12,
		  'name':'2017 RDU PS CLUB',
		  'employeeName':'James',
		  'estimatedaccrual':'130',
		  'biddingweek':'3',
		  'datHours':'10'	  
		  },{
		 'id':13,
	     'name':'2017 RDU PS CLUB',
		 'employeeName':'Johnson',
		 'estimatedaccrual':'65',
		 'biddingweek':'1',
		 'datHours':'25'	  
		 },{
	     'id':14,
		 'name':'2017 LAS FS FT',
		 'employeeName':'Robert',
		 'estimatedaccrual':'150',
		 'biddingweek':'3',
		 'datHours':'30'	  
		 },{
	     'id':15,
		 'name':'2017 LAS FS FT',
		 'employeeName':'Henry',
		 'estimatedaccrual':'180',
		 'biddingweek':'4',
		 'datHours':'20'	  
		 },{
		 'id':16,
		 'name':'2017 LAS FS FT',
		 'employeeName':'George',
	     'estimatedaccrual':'130',
		 'biddingweek':'3',
		 'datHours':'10'	  
		 }];
	 testingData($scope.items);

	  function testingData(obj){
	    	$('.exampleid').empty();
	    	var html='';
	    	 html="<table class='table table-striped table-bordered table-hover dataTables-example'>"
	                        +"<thead>"
	                        +"<tr>"
	                            +"<th class='onload'>Employee Name</th>"
	                            +"<th>Estimated Accrual</th>"
	                            +"<th>Bidding weeks elected</th>"
	                            +"<th>Dat Hours</th>"
	                       +" </tr>"
	                        +"</thead>"
	                        +"<tbody>";
	    	
	    	for(var i=0;i<obj.length;i++){
	    		html+="<tr><td>"
	    				+obj[i].employeeName+"</td><td>"+obj[i].estimatedaccrual+"</td><td>"+obj[i].biddingweek+"</td><td>"+obj[i].datHours+"</td>"
	    				
	                       +"</tr>";
	    		
	    		
	    		
	    	}
	    	html+="</tbody></table>";
	    	//jQuery('.exampleid div').html('');
	    		$('.exampleid').append(html);
	    		
				
			
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
	    		 
	    	
	    };
  }
})()