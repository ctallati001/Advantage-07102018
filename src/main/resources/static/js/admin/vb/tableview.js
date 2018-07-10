(function() {

	'use strict';

	angular
	.module('myApp')
	.controller('tableviewCtrl', tableviewCtrl);
	
	tableviewCtrl.$inject = ['$scope', '$rootScope', '$http', '$timeout', 'vbWeeklyAllotmentFactory'];
	
	 function tableviewCtrl($scope, $rootScope, $http, $timeout,vbWeeklyAllotmentFactory) {
		 
			 $('.dataTables-example').DataTable().clear().destroy();

		 
			 $.fn.dataTable.ext.order['dom-text'] = function  ( settings, col )
			 {
			     return this.api().column( col, {order:'index'} ).nodes().map( function ( td, i ) {
			         return $('input', td).val();
			     } );
			 }
			 
		
		
			 var weeklyAllotments = vbWeeklyAllotmentFactory.getWeeklyAllotment(1);
			 weeklyAllotments.then(function(data){
				 $scope.weeklyAllotments = data;
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
				 }, 30);
			 });
		// }
		// $scope.getWeeklyAllotment(0);
		
	 }	
	    })()