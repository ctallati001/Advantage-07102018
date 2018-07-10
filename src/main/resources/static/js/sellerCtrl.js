var myApp = angular.module('myApp');
myApp.factory('ScoreDataService', ['$http','$q',  function($http) {
    
    var factory = {
         getScoreData: function (score) {  
             console.log(score);
             var data = $http({method: 'GET', url: score});
             
         
             console.log(data);
             return data;
         }
    }       
     return factory;
}]);
myApp.controller('sellerCtrl', sellerCtrl);
sellerCtrl.$inject = ['$scope', '$rootScope', '$location', '$timeout','$filter', '$window','$http','ScoreDataService'];
function sellerCtrl($scope, $rootScope, $location, $timeout, $filter,$window, $http ,ScoreDataService, store) {
	console.log('$rootScope.profile22222222222222 >>'+$rootScope.profile);
	
	
	$scope.getAccountLink =  function(score){
		window.location =score ;

	   /*  ScoreDataService.getScoreData(score).then(function (result) {
             $scope.ScoreData = result;          
         }, function (result) {
             alert("Error: No data returned");
         });*/

    };


  $scope.accountLst = [
      { id: '/seller/s', name: 'oracle.rbc' },
      { id: '/seller/s', name: 'JPOracle' },
      { id: '/seller/s', name: 'SGOracle' },
      { id: '/seller/s', name: 'CHOracle' },
      { id: '/seller/s', name: 'INOracle' }
      
      ];
	
}