var app = angular.module('myApp');
app.controller("sellerCtrl", sellerCtrl);
sellerCtrl.$inject = ["$scope", "$rootScope", "$location","$timeout", "$interval", "$filter",'$http'];

function sellerCtrl($scope, $rootScope, $location, $timeout, $interval, $filter,$http) {
	
	alert('working');
	$location.path('/dd').search('jsessionID', 'hjdjkdhdjdjkdkdkd');
	
}