var myApp = angular.module('myApp');

myApp.controller('sbReportsCtrl', sbReportsCtrl);
sbReportsCtrl.$inject = ['$scope', '$rootScope', '$location', '$window','$timeout', '$http', '$filter', 'store', 'sbdServices'];

function sbReportsCtrl($scope, $rootScope, $location, $window, $timeout, $http, $filter, store, sbdServices) {
	$scope.bidDetailSearch = {};
	var getBidDetails = sbdServices.getBidDetail($scope.bidDetailSearch); 
	getBidDetails.then(function(data){
		$scope.bidDetailLst = data;
	});
	

	$scope.intervalFunction = function() {
		$scope.refresh();
		$timeout(function(){
			$('#collapse').click(function(){
			 		    $(this).text(function(i,old){
			 		        return old=='Show Filters' ?  'Hide Filters' : 'Show Filters';
			 		    });
			 		});
		}, 50);
	};

	$scope.init = function() {
		if(!$rootScope.profile){
			$rootScope.profile = store.getSession('profile');
		}
	};
	
	$scope.downloadReport = function() {
		$window.open("/report/basic", '_blank');
	};
	$scope.init();
}
