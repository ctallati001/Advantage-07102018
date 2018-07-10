var myApp = angular.module('myApp');

/*myApp.directive('trackLink', function() {
	return {
		restrict: 'A',
		scope: {
            gaTrack: "&"
        },
		link : function(scope, el, attrs) {
			el.click(function() {
				var path = el[0].hash;
				var title = el[0].outerText;
				scope.$parent.gaTrack(path,title);
            })
		}
	};
});*/

myApp.directive('customTooltip', function($parse, $compile) {
    return {
        restrict: 'A',
        priority: 1,
        terminal: true,
        link: function(scope, element, attrs) {
            var text = $parse(attrs.customTooltip)(scope);

            if (text != undefined && text !='null' && text != null) {
                // add tooltip only if text contains world
                element.attr('uib-popover', text);
                element.attr('popover-trigger', "'mouseenter'");
            }
            $compile(element, null, 1)(scope);
        }
    }
})


myApp.directive('loading', function() {
    return {
        restrict: 'E',
        replace: true,
        template: '<div class="loading"><img src="http://www.nasa.gov/multimedia/videogallery/ajax-loader.gif" width="20" height="20" />LOADING...</div>',
        link: function(scope, element, attr) {
            scope.$watch('loading', function(val) {
                if (val)
                    $(element).show();
                else
                    $(element).hide();
            });
        }
    }
})


//cell coloring based on the shift start time
myApp.directive('cellColor', function($rootScope) {
    return {
        template: '',
        scope: {
            shiftTime: '=cellColor'
        },
        link: function(scope, element, attr, ctrl) {
            var colorCode = '';
            if (scope.shiftTime == '')
                colorCode = '';
            else if (scope.shiftTime >= 0 && scope.shiftTime <= 759)
                colorCode = 'yellow-bg';
            else if (scope.shiftTime >= 800 && scope.shiftTime <= 1559)
                colorCode = 'lazur-bg';
            else if (scope.shiftTime >= 1600 && scope.shiftTime <= 2400)
                colorCode = 'navy-bg';
            element.addClass(colorCode);
        }
    };
});


myApp.directive('csSelect', function($rootScope) {
    return {
        template: '',
        scope: {
            row: '=csSelect'
        },
        link: function(scope, element, attr, ctrl) {

            element.bind('click', function(evt) {
                if (scope.row.remainingSlots > 0 && !element.hasClass('rowSelectFlag')) {
                    element.addClass('rowSelectFlag');
                    element.parent().parent().addClass('rowSelected')
                    if(scope.row.vacationNum){
                    	$rootScope.vbUserSelectedRow = scope.row;
                    }else{
                    	$rootScope.userSelectedRow = scope.row;
                    }
                } else {
                    element.removeClass('rowSelectFlag');
                    element.parent().parent().removeClass('rowSelected');
                    if(scope.row.vacationNum){
                        if ($rootScope.vbUserSelectedRow.label == scope.row.label)
                            $rootScope.vbUserSelectedRow = null;
                    }else{
                        if ($rootScope.userSelectedRow.label == scope.row.label)
                            $rootScope.userSelectedRow = null;
                    }
                }
            });
        }
    };
});

myApp.directive('numberBox', function(){
	return    {
		restrict:'E',
		scope:{
			min: '=',
			max:'=',
			ngModel:'='
		},
		template: '<div class="input-group">' + 
		'<span class="input-group-addon number-addon" ng-class="{disabled: ngModel >= max}" ng-click="ngModel = ngModel + 1">+</span>' + 
		'<input type="text" ng-model="ngModel" class="form-control number-control"></input>' +
		'<span class="input-group-addon number-addon" ng-class="{disabled: ngModel <= min || !ngModel}" ng-click="ngModel = ngModel - 1">-</span>' + 
		'</div>'
	}
});

myApp.directive('secure', function($rootScope) {
    return function(scope, element, attrs) {
    	element.hide();
    	var featureName = attrs.id;
    	var roleName = attrs.id + "_role_" + $rootScope.profile.role;
    	var userName = attrs.id + "_user_" + $rootScope.profile.login;
    	var featureEnabled = $rootScope.featureFlags[featureName] ? $rootScope.featureFlags[featureName] == 'true':'true';
    	var roleEnabled = $rootScope.featureFlags[roleName] ? $rootScope.featureFlags[roleName] == 'true':'true';
    	var userEnabled = $rootScope.featureFlags[userName] ? $rootScope.featureFlags[userName] == 'true':'true';
    	
        if(featureEnabled && roleEnabled && userEnabled) {
            element.show();
        } else {
            element.hide();
        }
    }
});