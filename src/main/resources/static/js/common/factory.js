var myApp = angular.module('myApp');

myApp.factory('calendarFactory', function(){
	return{
		getWeekStartDate: function dateFromWeekNumber(year, week) {
			var d = moment().year(year).day("Monday").isoWeek(week);
			return d;
		},
		getWeekEndDate: function dateFromWeekNumber(year, week) {
			var d = moment().year(year).day("Sunday").isoWeek(week);
			return d;
		}
	}
});

myApp.factory('store', [ '$window', function($window) {
	return {
		setLocal : function(key, value) {
			try {
				if ($window.Storage) {
					$window.localStorage.setItem(key, value);
					return true;
				} else {
					return false;
				}
			} catch (error) {
				console.error(error, error.message);
			}
		},
		getLocal : function(key) {
			try {
				if ($window.Storage) {
					return $window.localStorage.getItem(key);
				} else {
					return false;
				}
			} catch (error) {
				console.error(error, error.message);
			}
		},
		setSession : function(key, value) {
			try {
				if ($window.Storage) {
					$window.sessionStorage.setItem(key, JSON.stringify(value));
					return true;
				} else {
					return false;
				}
			} catch (error) {
				console.error(error, error.message);
			}
		},
		getSession : function(key) {
			try {
				if ($window.Storage) {
					return JSON.parse($window.sessionStorage.getItem(key));
				} else {
					return false;
				}
			} catch (error) {
				console.error(error, error.message);
			}
		}
	}
} ]);

myApp.factory('bidGroupFactory', function($http, $q) {
	return{
		getBidGroup: function(){
			var deferred = $q.defer();
			$http({
				method : "GET",
				url : "/schedule/bdgrouplist"
			}).then(function success(response) {
				deferred.resolve(response.data);
			}, function error(msg, code) {
				deferred.resolve(msg);
			});
			return deferred.promise;
		},
		saveBidGroup: function(param){
			var deferred = $q.defer();
			$http({
				method : "POST",
				url : "/schedule/addbidgroup",
				data: param
			}).then(function success(response) {
				deferred.resolve(response.data);
			}, function error(msg, code) {
				deferred.resolve(msg);
			});
			return deferred.promise;
		}
	}
});

myApp.factory('sbDataFactory', function($http, $rootScope, $q) {
	//var urlBase = 'data.json';
	var urlBase = '/sb/data';
	var slFactory = {};
	slFactory.getData = function() {
		return $http.get(urlBase);
	};
	slFactory.saveChoice = function(empInfo) {
		return $http({
			method : 'POST',
			url : '/sb/choice/' + $rootScope.userSelectedRow.lineId,
			data : JSON.stringify(empInfo)
		});
	};
	slFactory.saveLines = function(param) {
		var deferred = $q.defer();
		$http({
			method : "POST",
			url : "/sb/saveLines/",
			data: param
		}).then(function success(response) {
			deferred.resolve(response.data);
		}, function error(msg, code) {
			deferred.resolve(msg);
		});
		return deferred.promise;
	};
	slFactory.deleteLines = function(param) {
		var deferred = $q.defer();
		$http({
			method : "POST",
			url : "/sb/deleteLines?bidDtlId="+param,
		}).then(function success(response) {
			deferred.resolve(response.data);
		}, function error(msg, code) {
			deferred.resolve(msg);
		});
		return deferred.promise;
	};
	slFactory.savePreferences = function(param) {
		var deferred = $q.defer();
		$http({
			method : "POST",
			url : "/sb/savePreferences/",
			data: param
		}).then(function success(response) {
			deferred.resolve(response.data);
		}, function error(msg, code) {
			deferred.resolve(msg);
		});
		return deferred.promise;
	};


	return slFactory;
});

myApp.factory('vbDataFactory', function($http, $rootScope) {
	//var urlBase = 'data.json';
	var urlBase = '/vb/data';
	var vbDataFactory = {};
	vbDataFactory.getData = function() {
		return $http.get(urlBase);
	};
	vbDataFactory.saveChoice = function() {
		return $http({
			method : 'POST',
			url : '/vb/choice/' + $rootScope.vbUserSelectedRow.weekDescription,
			data : JSON.stringify($rootScope.profile)
		});
	};
	return vbDataFactory;
});

myApp.factory('FeatureFlagService', function($http, $rootScope) {
	return {
		initialize : function() {
			var featureEndpoint = 'feature/flags';
			$http.get(featureEndpoint).then(function(response) {
				$rootScope.featureFlags = response.data;
			}, function errorCallback(response){
		        console.log(response); 
			}); 
		}
	};
});
myApp.factory('bdServices', function($http, $q){
	var bidDtlId = '';

	var setBidDtlId = function(id) {
		bidDtlId = id;
	};

	var getBidDtlId = function(){
		return bidDtlId;
	};
	return{
		setBidDtlId: setBidDtlId,
		getBidDtlId: getBidDtlId,
		getBidDetail: function(param){
			var deferred = $q.defer();
			$http({
				method : "POST",
				url : "/vbd/bidDetail",
				data: param
			}).then(function success(response) {
				deferred.resolve(response.data);
			}, function error(msg, code) {
				deferred.resolve(msg);
			});
			return deferred.promise;
		},
		saveBidDetail: function(param){
			var deferred = $q.defer();
			$http({
				method : "POST",
				url : "/vbd/saveBidDetail",
				data: param
			}).then(function success(response) {
				deferred.resolve(response.data);
			}, function error(msg, code) {
				deferred.resolve(msg);
			});
			return deferred.promise;
		},
		deleteBidDetail: function(param){
			var deferred = $q.defer();
			$http({
				method : "POST",
				url : "/vbd/deleteBidDetail",
				data : param
			}).then(function success(response) {
				deferred.resolve(response.data);
			}, function error(msg, code) {
				deferred.resolve(msg);
			});
			return deferred.promise;
		}
	}
});

myApp.factory('sbdServices', function($http, $q){
	var bidDtlId = '';

	var setBidDtlId = function(id) {
		bidDtlId = id;
	};

	var getBidDtlId = function(){
		return bidDtlId;
	};

	return{
		setBidDtlId: setBidDtlId,
		getBidDtlId: getBidDtlId,
		getBidDetail: function(param){
			var deferred = $q.defer();
			$http({
				method : "POST",
				url : "/sbd/bidDetail",
				data: param
			}).then(function success(response) {
				deferred.resolve(response.data);
			}, function error(msg, code) {
				deferred.resolve(msg);
			});
			return deferred.promise;
		},
		saveBidDetail: function(param){
			var deferred = $q.defer();
			$http({
				method : "POST",
				url : "/sbd/saveBidDetail",
				data: param
			}).then(function success(response) {
				deferred.resolve(response.data);
			}, function error(msg, code) {
				deferred.resolve(msg);
			});
			return deferred.promise;
		},
		deleteBidDetail: function(param){
			var deferred = $q.defer();
			$http({
				method : "POST",
				url : "/sbd/deleteBidDetail",
				data : param
			}).then(function success(response) {
				deferred.resolve(response.data);
			}, function error(msg, code) {
				deferred.resolve(msg);
			});
			return deferred.promise;
		},//new code for service Save Record 
		saveRecord: function(param){
			var deferred = $q.defer();
			$http({
				method : "POST",
				url : "/vbc/save",
				data : param
			}).then(function success(response) {
				deferred.resolve(response.data);
			}, function error(msg, code) {
				deferred.resolve(msg);
			});
			return deferred.promise;
		}
		
		
	}
});

myApp.factory('vbPreferenceFactory', function($http, $q){
	return{
		getPreferences: function(param){
			var deferred = $q.defer();
			$http({
				method : "GET",
				url : "/vp/vbpreference"
			}).then(function success(response) {
				deferred.resolve(response.data);
			}, function error(msg, code) {
				deferred.resolve(msg);
			});
			return deferred.promise;
		},
		getPreferencesDays: function(param1, param2){
			var deferred = $q.defer();
			$http({
				method : "GET",
				url : "/vp/vbpreferencedays?weekNum="+param1+"&offDays="+param2
			}).then(function success(response) {
				deferred.resolve(response.data);
			}, function error(msg, code) {
				deferred.resolve(msg);
			});
			return deferred.promise;
		},
		savePreference: function(param){
			var deferred = $q.defer();
			$http({
				method : "POST",
				url : "/vp/savevbpreference",
				data: param
			}).then(function success(response) {
				deferred.resolve(response.data);
			}, function error(msg, code) {
				deferred.resolve(msg);
			});
			return deferred.promise;
		},
		deletePreferences: function(){
			var deferred = $q.defer();
			$http({
				method : "POST",
				url : "/vp/deletevbpreferences"
			}).then(function success(response) {
				deferred.resolve(response.data);
			}, function error(msg, code) {
				deferred.resolve(msg);
			});
			return deferred.promise;
		},
		deletePreference: function(param){
			var deferred = $q.defer();
			$http({
				method : "POST",
				url : "/vp/deletevbpreference?vacId="+param
			}).then(function success(response) {
				deferred.resolve(response.data);
			}, function error(msg, code) {
				deferred.resolve(msg);
			});
			return deferred.promise;
		}
	}
});

myApp.factory('vbWeeklyAllotmentFactory', function($http, $q){
	return{
		getWeeklyAllotment: function(param){
			var deferred = $q.defer();
			$http({
				method : "GET",
				url : "/weeklyAllotment/weeklyallotments?bidDtlId="+param
			}).then(function success(response) {
				deferred.resolve(response.data);
			}, function error(msg, code) {
				deferred.resolve(msg);
			});
			return deferred.promise;
		},
		saveWeeklyAllotment: function(param){
			var deferred = $q.defer();
			$http({
				method : "POST",
				url : "/weeklyAllotment/saveWeeklyAllotment",
				data: param
			}).then(function success(response) {
				deferred.resolve(response.data);
			}, function error(msg, code) {
				deferred.resolve(msg);
			});
			return deferred.promise;
		}
	}
});

/**
 * Factory for Buddy Request 
 * Separated From Controller to Service and factory
 */

myApp.factory('buddyRequestService', function($http, $q){
	return{
		getAllBiddingDetails: function(param){
			var deferred = $q.defer();
			$http({
				method : "GET",
				url : "/buddy/biddingall/"+param
			}).then(function success(response) {
				deferred.resolve(response.data);
			}, function error(msg, code) {
				deferred.resolve(msg);
			});
			return deferred.promise;
		},
	     
		getSearchedParamBasedBuddies: function(param){
			var deferred = $q.defer();
			$http({
				method : "POST",
				url : "/buddy/search",
				data: param
			}).then(function success(response) {
				deferred.resolve(response.data);
			}, function error(msg, code) {
				deferred.resolve(msg);
			});
			return deferred.promise;
		},
		
		saveBuddyInfo: function(param){
			var deferred = $q.defer();
			$http({
				method : "POST",
				url : "/buddy/save",
				data: param
			}).then(function success(response) {
				deferred.resolve(response.data);
			}, function error(msg, code) {
				deferred.resolve(msg);
			});
			return deferred.promise;
		}
	}
});

//End Here 

/**
 * Factory for schedule BidGroup
 * Separated From Controller to Service and factory
 */

myApp.factory('scheduleBidGroupFactory', function($http, $q){
	return{
		getDetails: function(){
			var deferred = $q.defer();
			$http({
				method : "GET",
				url : "/schedule/bdgrouplist"
			}).then(function success(response) {
				deferred.resolve(response.data);
			}, function error(msg, code) {
				deferred.resolve(msg);
			});
			return deferred.promise;
			
		},getAllBidGroupDetails: function(){
			var deferred = $q.defer();
			$http({
				method : "GET",
				url : "/schedule/bdgrouplist"
			}).then(function success(response) {
				deferred.resolve(response.data);
			}, function error(msg, code) {
				deferred.resolve(msg);
			});
			return deferred.promise;
		},getAutoFillAaid: function(){
			var deferred = $q.defer();
			$http({
				method : "GET",
				url : "/schedule/getall/aaids"
			}).then(function success(response) {
				deferred.resolve(response.data);
			}, function error(msg, code) {
				deferred.resolve(msg);
			});
			return deferred.promise;
		},
		getListOfBidGroupEmployee: function(param){
			var deferred = $q.defer();
			$http({
				method : "POST",
				url : "/schedule/getall",
				data: param
			}).then(function success(response) {
				deferred.resolve(response.data);
			}, function error(msg, code) {
				deferred.resolve(msg);
			});
			return deferred.promise;
		},
		
		addEmpTOBidGroup: function(param){
			var deferred = $q.defer();
			$http({
				method : "POST",
				url : "/schedule/addemp",
				data: param
			}).then(function success(response) {
				deferred.resolve(response.data);
			}, function error(msg, code) {
				deferred.resolve(msg);
			});
			return deferred.promise;
		},
		save: function(param){
			var deferred = $q.defer();
			$http({
				method : "POST",
				url : "/schedule/addbidgroup",
				data: param
			}).then(function success(response) {
				deferred.resolve(response.data);
			}, function error(msg, code) {
				deferred.resolve(msg);
			});
			return deferred.promise;
		},
		deleteSBGroup: function(param){
			var deferred = $q.defer();
			$http({
				method : "POST",
				url : "/schedule/delete",
				data: param
			}).then(function success(response) {
				deferred.resolve(response.data);
			}, function error(msg, code) {
				deferred.resolve(msg);
			});
			return deferred.promise;
		},
		deleteScheduleBid: function(param){
			var deferred = $q.defer();
			$http({
				method : "POST",
				url : "/schedule/del/bidgroup",
				data: param
			}).then(function success(response) {
				deferred.resolve(response.data);
			}, function error(msg, code) {
				deferred.resolve(msg);
			});
			return deferred.promise;
		}
	}
});

//End Here 

myApp.factory('empInfoFactory', function($http, $q){
	return{
		getEmpInfo: function(param){
			var deferred = $q.defer();
			$http({
				method : "GET",
				url : "/profile/empInfoFilter/"+param
			}).then(function success(response) {
				deferred.resolve(response.data);
			}, function error(msg, code) {
				deferred.resolve(msg);
			});
			return deferred.promise;
		},
		saveEmpInfo: function(param){
			var deferred = $q.defer();
			$http({
				method : "POST",
				url : "/profile/updateEmpInfo",
				data: param
			}).then(function success(response) {
				deferred.resolve(response.data);
			}, function error(msg, code) {
				deferred.resolve(msg);
			});
			return deferred.promise;
		},
		getBuddyInfo: function(param){
			var deferred = $q.defer();
			$http({
				method : "GET",
				url : "/buddy/getallbuddies/"+param
			}).then(function success(response) {
				deferred.resolve(response.data);
			}, function error(msg, code) {
				deferred.resolve(msg);
			});
			return deferred.promise;
		}
	}
});

myApp.factory('dialogBoxService', [function() {
    var dialogType = {alert:1, confirm:2, prompt:3, custom:999};
    var show = function (type, title, message, footer, callback) {
        var options = {
            title: title,
            message: message
        };
        switch (type) {
            case dialogType.confirm:
                options.buttons = {
                    cancel: {
                        label: "Cancel",
                        className: "btn-sm btn-default",
                        callback: function(result) {
                            callback(false);
                        }
                    },
                    main: {
                        label: "OK",
                        className: "btn-sm btn-primary",
                        callback: function (result) {
                            callback(true);
                        }
                    }
                };
                break;
            case dialogType.alert:
            default:
                options.buttons = {
                    main: {
                        label: "OK",
                        className: "btn-sm btn-primary"
                    }
                };
                break;
        }
        bootbox.dialog(options);
    };
    return {
        dialogType: dialogType,
        show: show
    };
}]);
