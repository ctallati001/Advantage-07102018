var myApp = angular.module('myApp', ['ngRoute', 'ds.clock', 'ngTable', 'ui.bootstrap', 'ui.sortable','ngBootbox','ngDialog','ui.select']);

myApp.config(['$routeProvider', '$locationProvider', 
    function($routeProvider, $locationProvider) {
	
        $locationProvider.hashPrefix('');

        $routeProvider.
        when('/login', {
            templateUrl: 'templates/login.html',
            controller: 'loginCtrl'
        	//templateUrl: 'templates/redirectLogin.html',
            //controller: 'redirectCtrl'
        }). 
        when('/internal', {
            //templateUrl: 'templates/login.html',
            //controller: 'loginCtrl'
        	templateUrl: 'templates/redirectLogin.html',
            controller: 'redirectCtrl'
        }).
        when('/home', {
            templateUrl: 'templates/dashboard.html',
            controller: 'mainCtrl'
        }).
        when('/asset-manage', {
            templateUrl: 'templates/asset-manage.html',
            controller: 'assetMgmtCtrl'
        }).
        when('/report-admin', {
            templateUrl: 'templates/reports-admin.html',
            controller: 'reportAdminCtrl'
        }).
        when('/report-overview', {
            templateUrl: 'templates/reports-overview.html',
            controller: 'reportOverviewCtrl'
        }).when('/dd', {
            templateUrl: 'templates/seller.html',
            controller: 'sellerCtrl'
        }).when('/oracle.rbc', {
            templateUrl: 'templates/loginoracle.html',
            controller: 'loginCtrl'
        }).
        when('/user-pref', {
            templateUrl: 'templates/user-pref.html',
            controller: 'userPrefCtrl'
        }).
        otherwise({
            redirectTo: '/login'
        });
        $locationProvider.html5Mode(true);
    }
]);

myApp.run(run);
run.$inject = ['$rootScope', '$location', '$window','store', 'FeatureFlagService','$http'];

function run($rootScope, $location, $window, store,  FeatureFlagService,$http) {
	window.ga = window.ga || function () { (ga.q = ga.q || []).push(arguments) }; ga.l = +new Date;
	ga('create', 'UA-94006817-1', 'none');
	
	console.log('$rootScope.profile >>'+$rootScope.profile);
	$rootScope.vRoot = $location.path();
	console.log("-----------------------"+$location.path());

	if($location.path()==="/internal")
	{
		$location.path("/internal");//.search('jsessionID', store.getSession('profile').token);
	}
	else if($location.path()==="/seller/dd")
	{
		$location.path("/dd");//.search('jsessionID', store.getSession('profile').token);
	}
	else if( $location.path()==="/seller/s")
	{
		$rootScope.profile=store.getSession('profile');
		console.log('$rootScope.profile22 >>'+$rootScope.profile);
		if($rootScope.profile!=undefined  )
		{
			$rootScope.profile=store.getSession('profile');
			store.setSession('profile', $rootScope.profile);
			$location.path("/home").search('jsessionID', store.getSession('profile').token);
		}
		else
		{
			$location.path("/login");
		}
	}
	else if($location.path()==="/tokenCheck")
	{
		$http.get('/tokenCheck').then(function(success) {
			var DDLoginRequest = success.data;
			console.log("----------------------"+JSON.stringify(DDLoginRequest));  
			if(DDLoginRequest.token != ""){
				  var obj = new Object();
		    	  obj.firstName = DDLoginRequest.firstName;
		    	  obj.lastName 	= DDLoginRequest.lastName;
		    	  obj.userName	= DDLoginRequest.firstName +" " +DDLoginRequest.lastName;
		    	  obj.userType 	= DDLoginRequest.userType;
		    	  obj.token 	= DDLoginRequest.token;
		    	  
		    	  $rootScope.profile = obj;
	        	  store.setSession('profile', $rootScope.profile);

		    	  if(obj.userType==="Client")
		    	  {
		    		  $location.path("/home").search('jsessionID', DDLoginRequest.token);
		    	  }
		    	  else if(obj.userType==="Internal")
		    	  {
		    		  $location.path("/dd").search('jsessionID', DDLoginRequest.token);
		    	  }
		    	  $scope.$apply();	
			}
 		}).catch(function onError(response) {
    			console.log(response);
    	});
	}
	else
	{
		$rootScope.profile = store.getSession('profile');
		$rootScope.$on('$routeChangeStart', function (event, next, current) {
		if (!$rootScope.profile) {
	        if (next.templateUrl &&  next.templateUrl.indexOf("login.html") !== -1) {
				$rootScope.selection = 'signin';
				$rootScope.profile = null;
				store.setSession('profile', null);
	        }else {
	        	if($location.path() !== '/signout' && $location.path() != ""){
		        	$http.get('/profile').then(function(response) {
		        		$rootScope.selection = 'default';
		        		var profile = response.data;
		        		store.setSession('profile', profile);
		            	$rootScope.profile = profile;
		               // $location.path('/landing');
		                $location.path("/home").search('jsessionID', profile.session.sessionId);
		                
		                $window.ga('set', 'userId', profile.name);
		        	
		        	}).catch(function onError(response) {
		        		$rootScope.selection = 'signin';
		        		$rootScope.profile = null;
		        		store.setSession('profile', null);
		        		$location.path( "/login");
		        	});
	        	}else{
	        		$rootScope.selection = 'signin';
	        		$location.path( "/login");
	        	}
	        }
	     }else{
	    	  if (next.templateUrl &&  next.templateUrl.indexOf("login.html") !== -1) {
					$rootScope.selection = 'signin';
					$rootScope.profile = null;
					store.setSession('profile', null);
		        }else if($location.path()==='/login' || $location.path()==='/signout'){
		        	$rootScope.selection = 'signin';
		        	$rootScope.profile = null;
					store.setSession('profile', null);
					$location.path("/login");
		        }
	      }
		var currentLocationPath = $location.path();
		$window.ga('send', 'pageview', currentLocationPath);
		$rootScope.selection = (currentLocationPath == '/login') ? 'signin' : 'default';
    });
	$rootScope.nobidding=false;
	$rootScope.sbUserPreference=[];
	
	}
	FeatureFlagService.initialize();
	console.log("Initalized"); 
}
myApp.directive('myDatePicker', function () {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function (scope, element, attrs, ngModelController) {
  
            // Private variables
            var datepickerFormat = 'm/d/yyyy',
                momentFormat = 'M/D/YYYY',
                datepicker,
                elPicker;
  
            // Init date picker and get objects http://bootstrap-datepicker.readthedocs.org/en/release/index.html
            datepicker = element.datepicker({
                autoclose: true,
                keyboardNavigation: false,
                todayHighlight: true,
                format: datepickerFormat
            });
            elPicker = datepicker.data('datepicker').picker;
  
            // Adjust offset on show
            datepicker.on('show', function (evt) {
                elPicker.css('left', parseInt(elPicker.css('left')) + +attrs.offsetX);
                elPicker.css('top', parseInt(elPicker.css('top')) + +attrs.offsetY);
            });
  
            // Only watch and format if ng-model is present https://docs.angularjs.org/api/ng/type/ngModel.NgModelController
            if (ngModelController) {
                // So we can maintain time
                var lastModelValueMoment;
  
                ngModelController.$formatters.push(function (modelValue) {
                    //
                    // Date -> String
                    //
  
                    // Get view value (String) from model value (Date)
                    var viewValue,
                        m = moment(modelValue);
                    if (modelValue && m.isValid()) {
                        // Valid date obj in model
                        lastModelValueMoment = m.clone(); // Save date (so we can restore time later)
                        viewValue = m.format(momentFormat);
                    } else {
                        // Invalid date obj in model
                        lastModelValueMoment = undefined;
                        viewValue = undefined;
                    }
  
                    // Update picker
                    element.datepicker('update', viewValue);
  
                    // Update view
                    return viewValue;
                });
  
                ngModelController.$parsers.push(function (viewValue) {
                    //
                    // String -> Date
                    //
  
                    // Get model value (Date) from view value (String)
                    var modelValue,
                        m = moment(viewValue, momentFormat, true);
                    if (viewValue && m.isValid()) {
                        // Valid date string in view
                        if (lastModelValueMoment) { // Restore time
                            m.hour(lastModelValueMoment.hour());
                            m.minute(lastModelValueMoment.minute());
                            m.second(lastModelValueMoment.second());
                            m.millisecond(lastModelValueMoment.millisecond());
                        }
                        modelValue = m.toDate();
                    } else {
                        // Invalid date string in view
                        modelValue = undefined;
                    }
  
                    // Update model
                    return modelValue;
                });
  
                datepicker.on('changeDate', function (evt) {
                    // Only update if it's NOT an <input> (if it's an <input> the datepicker plugin trys to cast the val to a Date)
                    if (evt.target.tagName !== 'INPUT') {
                        ngModelController.$setViewValue(moment(evt.date).format(momentFormat)); // $seViewValue basically calls the $parser above so we need to pass a string date value in
                        ngModelController.$render();
                    }
                });
            }
  
        }
    };
});


myApp.directive('excelExport',
	    function () {
    return {
      restrict: 'A',
      scope: {
      	fileName: "@",
          data: "&exportData"
      },
      replace: true,
      template: '<button class="btn btn-primary btn-ef btn-ef-3 btn-ef-3c mb-10" ng-click="download()">Export to Excel <i class="fa fa-download"></i></button>',
      link: function (scope, element) {
      	
      	scope.download = function() {

      		function datenum(v, date1904) {
          		if(date1904) v+=1462;
          		var epoch = Date.parse(v);
          		return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
          	};
          	
          	function getSheet(data, opts) {
          		var ws = {};
          		var range = {s: {c:10000000, r:10000000}, e: {c:0, r:0 }};
          		for(var R = 0; R != data.length; ++R) {
          			for(var C = 0; C != data[R].length; ++C) {
          				if(range.s.r > R) range.s.r = R;
          				if(range.s.c > C) range.s.c = C;
          				if(range.e.r < R) range.e.r = R;
          				if(range.e.c < C) range.e.c = C;
          				var cell = {v: data[R][C] };
          				if(cell.v == null) continue;
          				var cell_ref = XLSX.utils.encode_cell({c:C,r:R});
          				
          				if(typeof cell.v === 'number') cell.t = 'n';
          				else if(typeof cell.v === 'boolean') cell.t = 'b';
          				else if(cell.v instanceof Date) {
          					cell.t = 'n'; cell.z = XLSX.SSF._table[14];
          					cell.v = datenum(cell.v);
          				}
          				else cell.t = 's';
          				
          				ws[cell_ref] = cell;
          			}
          		}
          		if(range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
          		return ws;
          	};
          	
          	function Workbook() {
          		if(!(this instanceof Workbook)) return new Workbook();
          		this.SheetNames = [];
          		this.Sheets = {};
          	}
          	 
          	var wb = new Workbook(), ws = getSheet(scope.data());
          	/* add worksheet to workbook */
          	wb.SheetNames.push(scope.fileName);
          	wb.Sheets[scope.fileName] = ws;
          	var wbout = XLSX.write(wb, {bookType:'xlsx', bookSST:true, type: 'binary'});

          	function s2ab(s) {
          		var buf = new ArrayBuffer(s.length);
          		var view = new Uint8Array(buf);
          		for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
          		return buf;
          	}
          	
      		saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), scope.fileName+'.xlsx');
      		
      	};
      
      }
    };
  }
);


