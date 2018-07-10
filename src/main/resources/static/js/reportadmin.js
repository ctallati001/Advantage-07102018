var app = angular.module('myApp');
app.controller("reportAdminCtrl", reportAdminCtrl);
reportAdminCtrl.$inject = ["$scope", "$rootScope", "$location","$timeout", "$interval", "$filter",'$http'];

function reportAdminCtrl($scope, $rootScope, $location, $timeout, $interval, $filter,$http) {

   alert("report-admin");
}
