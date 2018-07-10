var myApp = angular.module('myApp');
myApp.controller('timerCtrl', timerCtrl);
timerCtrl.$inject = ['$scope', '$timeout', '$rootScope','$location'];

function timerCtrl($scope, $timeout, $rootScope,$location) {
     
     //init timer
    $scope.initTimer = function (){
    	var timer = 300;
        $("#CountDownTimer").TimeCircles({

            "circle_bg_color": "#e3e6e8",
            "animation": "smooth",
            "count_past_zero": false,
            "bg_width": 1.0100,
            "fg_width": 0.067,
            "text_size": 0.24,
            "direction": "Clockwise",
            "time": { 
                "Days": { "show": false }, 
                "Hours": { "show": false }, 
                "Minutes": { "color": "#00b386", "text": "MIN"},
                "Seconds": { "color": "#d61f1f","text": "SEC" }}
            }
        ).addListener(countdownComplete);
    }
    $scope.initTimer(); 
    function countdownComplete(unit, value, total){
            if (total == 0) {
            	if($location.path().indexOf('sbLivebidding') > -1){
                    $rootScope.disableRowSelection = true;
                    //$('#sessionTimeOutModal').modal('show');
                    $location.path('/bidresults');
                    //$('.textDiv_Seconds,.textDiv_Minutes').removeClass('blink_me').addClass('text-danger');            		
            	}
            	if($location.path().indexOf('vbLivebidding') > -1){
                    $rootScope.disableRowSelection = true;
                    //$('#sessionTimeOutModal').modal('show');
                    $location.path('/vbResults');
                    //$('.textDiv_Seconds,.textDiv_Minutes').removeClass('blink_me').addClass('text-danger');            		
            	}
            }else if(total== 60){
                $('.textDiv_Seconds,.textDiv_Minutes').addClass('blink_me');
            }
    };

    $scope.targetMins = 300;
    $scope.counter = 300;
    $scope.defaultMins = defaultMins = 0;
    $scope.onTimeout = function() {
        if ($scope.counter == 0) {
            //$rootScope.disableRowSelection = true;
            //$('#sessionTimeOutModal').modal('show');
            //$rootScope.userSelectedRow.length = 0; //user selected rows in live bid screen
        }
        if ($scope.counter == defaultMins) {
            $scope.counter = defaultMins;
        } else {
            $scope.counter--;
            mytimeout = $timeout($scope.onTimeout, 1000);
        }
    }
    var mytimeout = $timeout($scope.onTimeout, 1000);
}