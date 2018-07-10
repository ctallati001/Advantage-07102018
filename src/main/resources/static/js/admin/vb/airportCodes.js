(function() {

  'use strict';

  angular
    .module('myApp')
    .controller('airportCtrl', airportCtrl);


  airportCtrl.$inject = ['$scope', '$rootScope', '$timeout','store', '$http','$filter', 'NgTableParams','$window'];

  function airportCtrl($scope, $rootScope,$timeout, store, $http,$filter, NgTableParams,$window) {

    var vm = this;
    $scope.saveEnable = true;
    $scope.updateEnable = false;
    $scope.airport = {
    		 id:0,
			 code : '',
			 startDate: null,
			 endDate: null
	 };

    $scope.init = function() {
      if (!$rootScope.profile) {
        $rootScope.profile = store.getSession('profile');
      }
      $scope.dateFormattingPattern();
    };
    

	$scope.getAirportsDetails = function(id){
	   $('.trailTbl').DataTable().clear().destroy();
	   $http.get("/admin/airportDetails").then(function(res){
	   $scope.airports = res.data;
			if($scope.airports.length >0 ){
				$timeout(function(){
					$('.trailTbl').DataTable({
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
		    });
		 };
		 
		 //Save Airport information data 
		    $scope.onSave = function() {
			 var startDate = new Date($scope.airport.startDate);
			 var endDate = new Date($scope.airport.endDate);
			 $scope.airport.endDate = endDate;
			 $scope.airport.startDate = startDate;
			 
		      $http.post("/admin/airportDetails", $scope.airport).then(function(res){
		    	  $scope.sweetAlertForSaveAndUpdate(res.data.status);
		    	  $scope.getAirportsDetails();
		    	  $scope.airport = {};
		      });
		    };
		   
		   //Clear Input field of Airport 
		   $scope.onClear = function(){
			   $scope.airport = {};
			   $scope.saveEnable = true;
		       $scope.updateEnable = false;
			   
		   };
    
		   //Update Airport record 
		    $scope.updateRecord = function() {
		        $scope.saveEnable = true;
		        $scope.updateEnable = false;
		        $scope.onSave();
		    };
		  
		   //Update the Airport Information
		   $scope.editAirport = function(idx){
			      $scope.saveEnable = false;
			      $scope.updateEnable = true;
			      $scope.dateFormattingPattern();
			      $scope.airport = {
			    		    id: $scope.airports[idx].id,
							code : $scope.airports[idx].code,
							startDate: $filter('date')($scope.airports[idx].startDate,'MM-dd-yyyy'),
					        endDate: $filter('date')($scope.airports[idx].endDate,'MM-dd-yyyy'),
					};
			     
		   };
		   
		   //Delete the Airport Info
		   $scope.deleteAirport = function(id){
			   swal({
		            title: "Are you sure?",
		            text: "Your will not be able to recover this Airport",
		            type: "warning",
		            showCancelButton: true,
		            confirmButtonColor: "#DD6B55",
		            confirmButtonText: "Yes, delete it!",
		            cancelButtonText: "No, cancel plz!",
		            closeOnConfirm: false,
		            closeOnCancel: true },
		        function (isConfirm) {
		            if (isConfirm) {
		            	 $http.delete("/admin/airportDetails/"+id).then(function(res){
		   		      	  $scope.getAirportsDetails();
		   		        });
		            	swal("Deleted!", "Your item has been deleted.", "success");
		              }
		         });
		   };
		  
	
    $scope.sweetAlertForSaveAndUpdate =  function (message) {
        swal({
            title: message,
            type: "success"
        });

    };
    //Format date with new date 
    $scope.formatDate = function(date){
	    var dateOut = new Date(date);
	    return dateOut;
	 };
	
	 $scope.dateFormattingPattern = function(){
		 $('#date_3 .input-group.date').datepicker({
				defaultViewDate : $scope.airport.startDate,
				todayBtn: "linked",
				keyboardNavigation: false,
				forceParse: false,
				autoclose: true,
				todayHighlight: true,
				calendarWeeks: true,
				format: 'mm-dd-yyyy'
			});
			if($scope.airport.startDate != null && $scope.airport.startDate != 'undefined' && $scope.airport.startDate != ''){
				$('#date_3 .input-group.date').data("datepicker")._setDate($scope.airport.startDate);
			}
			$('#date_4 .input-group.date').datepicker({
				defaultViewDate : $scope.airport.endDate,
				todayBtn: "linked",
				keyboardNavigation: false,
				forceParse: false,
				autoclose: true,
				todayHighlight: true,
				calendarWeeks: true,
				format: 'mm-dd-yyyy'
			});
			if($scope.airport.endDate != null && $scope.airport.endDate != 'undefined' && $scope.airport.endDate != ''){
				$('#date_4 .input-group.date').data("datepicker")._setDate($scope.airport.endDate);
			}
	  }
    
    $scope.getAirportsDetails();    
    
  }
})()
