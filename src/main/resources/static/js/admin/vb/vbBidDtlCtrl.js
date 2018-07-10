var myApp = angular.module('myApp');

myApp.controller('vbBidDtlCtrl', vbBidDtlCtrl);
vbBidDtlCtrl.$inject = ['$scope', '$rootScope', '$timeout', 'store', '$filter'];

function vbBidDtlCtrl($scope, $rootScope, $timeout, store, $filter) {
	$scope.isWizard = true;
	$rootScope.empStartTime = '';
	
	$scope.changeTab = function(index){
		if(index == 1)
			$rootScope.changeBidDtl($scope.bidDtlId);
		
		if(index==2)
			$rootScope.getEmpDetails($scope.bidGrpId);		
	}
	
	$('#wizard').bootstrapWizard({'nextSelector': '.btn-next', 'previousSelector': '.btn-previous', 
		'onTabShow': function(tab, navigation, index){
				$scope.changeTab(index);
		}});
	
	if($scope.bidDtlId == null || $scope.bidDtlId <= 0){
		$('#wizard').bootstrapWizard('disable', 1);
		$('#wizard').bootstrapWizard('disable', 2);
		$('#wizard').bootstrapWizard('disable', 3);
		$("#next").prop("disabled",true);
	}

	$scope.setRowVal = function(bidDtlId, bidGrpId, start){
		$scope.bidDtlId = bidDtlId;
		$scope.bidGrpId = bidGrpId;
		$rootScope.empStartTime = start;
		$('#wizard').bootstrapWizard('enable', 1);
		$('#wizard').bootstrapWizard('enable', 2);
		$('#wizard').bootstrapWizard('enable', 3);
		$("#next").prop("disabled",false);		
	}
}