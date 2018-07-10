var myApp = angular.module('myApp');

myApp.controller("profileCtrl", profileCtrl);
profileCtrl.$inject = ['$scope', '$rootScope', 'store', 'empInfoFactory'];

function profileCtrl($scope, $rootScope, store, empInfoFactory) {
	$scope.profile={};
	$scope.editButton = true;

	$scope.getData=function(){
		var empinfo = empInfoFactory.getEmpInfo($rootScope.profile.aaID);
		empinfo.then(function(res) {
			$scope.profile=res;
		});

	}

	$scope.getData();


	$scope.editSecondaryContact = function(){
		$scope.editButton = false;
	};


	$scope.onClear=function(){
		$scope.obj={};  
	}
	$scope.onUpdate=function(obj){
		$scope.temvar='';
		$('.mobile').empty();
		$('.email').empty();
		var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
		if(!obj.secondaryEmail){
			$('.email').append("Email Id is required");
			$scope.temvar='show';
		}else if(!re.test(obj.secondaryEmail)){
			$('.email').append("Enter valid email address");
			$scope.temvar='show';
		}
		else if(!obj.secondaryMobileNo){
			$('.mobile').append("Mobile No is required");
			$scope.temvar='show';
		}else if (!/^\d{10}$/.test(obj.secondaryMobileNo)){
			$('.mobile').append("Enter Valid Mobile No");
		}else{

			var savemepinfo = empInfoFactory.saveEmpInfo(obj);
			savemepinfo.then(function(res) {
				$scope.profile=res;
				$scope.showNotification('successfully updated');
				 
			});
		}
	}
	
	$('.toast-close-button').click(function(){
		$('#toast-container').hide();
		
	});

	$scope.showNotification = function(msg){
	    $('.toast-message').text(msg);
	    $('#toast-container').fadeIn(1000).fadeOut(60000);
	  
	}
	

	$scope.getBuddiesInfo = function(){
		$scope.employeeId = $rootScope.profile.empId;
		var empinfo = empInfoFactory.getBuddyInfo($scope.employeeId);
		empinfo.then(function(response) {
			$scope.buddies = response;
		});
	}

	$scope.getBuddiesInfo();

}

