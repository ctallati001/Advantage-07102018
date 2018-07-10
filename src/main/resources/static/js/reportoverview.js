var app = angular.module('myApp');
app.controller("reportOverviewCtrl", reportOverviewCtrl);
reportOverviewCtrl.$inject = ["$scope", "$rootScope", "$location","$timeout", "$interval", "$filter",'$http'];

function reportOverviewCtrl($scope, $rootScope, $location, $timeout, $interval, $filter,$http) {

   alert("report-overview");
}
