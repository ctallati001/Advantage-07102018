var myApp = angular.module('myApp');

myApp.controller('adminCtrl', adminCtrl);
adminCtrl.$inject = ['$scope', '$rootScope', '$timeout', 'store', '$filter', 'sbdServices'];

function adminCtrl($scope, $rootScope, $timeout, store, $filter, sbdServices) {	
	
	$scope.init = function(){
		$scope.isWizard = true;
		$('#wizard').bootstrapWizard({'nextSelector': '.btn-next', 'previousSelector': '.btn-previous'
		});

		$('#wizard').bootstrapWizard('disable', 1);
		$('#wizard').bootstrapWizard('disable', 2);
		$("#next").prop("disabled",true);
	}
	
	$scope.setRowVal = function(val){
		$rootScope.selectedRow.val = val;
		$('#wizard').bootstrapWizard('enable', 1);
		$('#wizard').bootstrapWizard('enable', 2);
		$("#next").prop("disabled",false);
		$rootScope.onLoad();
		$rootScope.loadAsnmnt();
	}
	
	$scope.getDtls = function(id){
		$rootScope.selectedRow.val = id;
		$rootScope.onLoad();
	}

	$rootScope.selectedRow = { val: ''};
	$scope.bidDetailSearch = {};
	var getBidDetails = sbdServices.getBidDetail($scope.bidDetailSearch); 
	getBidDetails.then(function(data){
		$scope.bidDetailLst = data;
	});
	
	$scope.getData = function(){
		$rootScope.sbDtl = $scope.sBidDtlId;
		$rootScope.loadAsnmnt();
	}
	
	$timeout(function(){
		if($scope.sbBidDtlId){
			$scope.getData();
		}
	},50);
}
