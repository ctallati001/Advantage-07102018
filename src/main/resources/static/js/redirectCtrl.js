var app = angular.module('myApp');
app.controller("redirectCtrl", redirectCtrl);
redirectCtrl.$inject = ["$scope", "$rootScope", "$location","$timeout", "$interval", "$filter",'$http'];

function redirectCtrl($scope, $rootScope, $location, $timeout, $interval, $filter,$http) {
 
window.location='https://directqa2.dimensiondata.com/seller/direct/access_advantage.asp';


}

   




