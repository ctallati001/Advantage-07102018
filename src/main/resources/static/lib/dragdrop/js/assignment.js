/* global angular */

'use strict';

angular.module('myApp')
  /**
   * Models Manager
   * @return {ModelsManager}
   */
  .service('ModelsManager', function (Basket) {
    return {
      baskets: {},
      /**
       * Add basket
       * @param {string} id   [description]
       * @param {Object} args [description]
       */
      addBasket: function (id, args) {
        var self = this;
        var model;
        if (id instanceof Basket) {
          model = id;
        } else {
          model = new Basket(id, args);
        }
        this.baskets[model.id] = model;
        return model;
      }
    };
  })
  .factory('Basket', function (Utils) {

    /**
     * @constructor
     * @param {[type]} data [description]
     */
    function Basket(id, args) {
      this['id'] = id || Utils.getRandomId(7);
      if (args) {
        this.setArgs(args);
      }
      this.subject = 'Employee';
    }

    Basket.prototype = {
      setArgs: function (args) {
        angular.extend(this, args);
      }
    };
    return Basket;
  })
  
  .service('HelperDnd', function (Utils) {

	    var isDraggingFrom = 0;
	    var draggingOriginList = [];

	    return {
	      dragstart: function (model, list, index) {
	        console.log('drag', model.id, index);
	        draggingOriginList = list;
	        isDraggingFrom = index;
	      },
	      moved: function (model, list, index) {
	        console.log('moved', model.id, index);
	        list.splice(index, 1);
	        return model;
	      },
	      /**
	       * Drop (`dnd` related method)
	       *
	       * @param  {[type]} event [description]
	       * @param  {[type]} index [description]
	       * @param  {[type]} model [description]
	       * @param  {[type]} list  [description]
	       * @return {[type]}       [description]
	       */
	      drop: function (event, index, model, list) {
	    	  
	        // @see https://github.com/marceljuenemann/angular-drag-and-drop-lists/issues/54
	    	if(event && event.currentTarget.className != 'tree dndDragover'){
	    		//return;
	    	}
	        if (index < 0) {
	          return;
	        }
	        var isDraggingTo = index;
	        if(!list){
	        	list = [];
	        }
	        var result = Utils.findById(list, model.id);

	        // if we are dropping the model in the same list, just reordering it
	        if (result) {
	          // first remove the model
	          Utils.removeByID(list, model.id);

	          // if it has been moved down from the first position fix the dnd bug
	          // @see https://github.com/marceljuenemann/angular-drag-and-drop-lists/issues/54
	          if (isDraggingTo > isDraggingFrom && isDraggingFrom === 0) {
	            isDraggingTo--;
	          }

	          // insert the model in the new position
	          list.splice(isDraggingTo, 0, model);
	          console.log('dropped down', model.id, isDraggingTo);

	        // if the list array is still empty or the model is coming from another list
	        } else {
	          // first remove the model
	          if (angular.isArray(draggingOriginList)) {
	            Utils.removeByID(draggingOriginList, model.id);
	          }
	          // if the destination list is not empty insert the model at the right position
	          if (list.length) {
	            list.splice(isDraggingTo, 0, model);
	          // if the destination list is empty just push it
	          } else {
	            list.push(model);
	          }
	        }
	        // console.log('drop', index, model, list);
	        // return model;
	      },
	      dragover: function(event, index) {
	        return index > 0;
	      }
	    };
	  })
  
  
  .controller('amtCtrl', function ($scope, $rootScope, ModelsManager, Utils, HelperDnd, dataFactory, NgTableParams) {

	    $scope.tree = [];
	    $scope.dataArray = [];

	    $scope.tree.push({id: "1", subject: "Employee", name: "Aaron Schwartz"});
	    $scope.tree.push({id: "2", subject: "Employee", name: "Laura Ishmael"});
	    $scope.tree.push({id: "3", subject: "Employee", name: "Jon Clegg"});
	    $scope.tree.push({id: "4", subject: "Employee", name: "Josh A"});
	    $scope.tree.push({id: "5", subject: "Employee", name: "Peter Don"});
	    
	    $scope.addBasket = function () {
	    	var basket = ModelsManager.addBasket();
	    	$scope.tree.push(basket);
	    };

	    function timeRangeFilter(data, filterValues /*, comparator*/ ) {
	        return data.filter(function(item) {
	            var startFrom = filterValues.startTimeFrom == null ? 0 : filterValues.startTimeFrom;
	            var endFrom = filterValues.endTimeFrom == null ? 0 : filterValues.endTimeFrom;
	            var startTo = filterValues.startTimeTo == null ? 23.59 : filterValues.startTimeTo;
	            var endTo = filterValues.endTimeTo == null ? 23.59 : filterValues.endTimeTo;
	            var day = filterValues.day == null ? "Mon" : filterValues.day;
	            return (startFrom <= item[day].shiftStart && startTo >= item[day].shiftStart) && (endFrom <= item[day].shiftEnd && endTo >= item[day].shiftEnd);
	        });
	    }
	    
	    dataFactory.getData()
        .then(function(response) {
            if ((typeof($rootScope.uPreferences) != 'undefined' && $rootScope.uPreferences.length > 0)) {
                $rootScope.records.scheduleLines = $rootScope.uPreferences;
            } else {
                $rootScope.records = response.data;
                    $scope.oldrecords = $rootScope.records;
                    for(var i = 0; i < $rootScope.records.scheduleLines.length; i++) {
                    	var record = $rootScope.records.scheduleLines[i];
                    	$scope.dataArray[record.lineId] = [];
                    }
                    $scope.dataArray['7001']={id: "6", subject: "Employee", name: "User"};
                    $scope.tableParams = new NgTableParams({
                        count: 15, // count per page
                        // initial sort order
                        sorting: {
                            preference: "asc"
                        }
                    }, {
                        counts: [], // hide page counts control
                        total: 1, // value less than count hide pagination
                        filterOptions: {
                            filterFn: timeRangeFilter
                        },
                        filterLayout: "horizontal",
                        dataset: $rootScope.records.scheduleLines
                    });
                    $scope.tableParams.filter().day = "Mon";
            }}, function(error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
            
	    $scope.helperDnd = HelperDnd;

	    /**
	     * Remove customize component
	     *
	     * @param  {Object} scope The ui-tree scope.
	     * @param  {Object} model The customize component model to delete.
	     * @return {void}
	     */
	    $scope.removeMe = function (scope, model, list) {
	      Utils.removeByID(list, model.id);
	    };
	    
	    $scope.loadArray = function (record) {
	    	return $scope.dataArray[record.lineId];
	    };

	    /**
	     * Collapse all models in the tree.
	     *
	     * @return {void}
	     */
	    $scope.collapseAll = function () {
	      $scope.$broadcast('collapseAll');
	    };

	    /**
	     * Expand all customize components in the tree, using the ui-tree API.
	     *
	     * @return {void}
	     */
	    $scope.expandAll = function () {
	      $scope.$broadcast('expandAll');
	    };

	    /**
	     * Move up or down a specific customize component
	     *
	     * @param  {Object} model  The model to move.
	     * @param  {array}  list   Array in which the model is contained.
	     * @param  {string} upOrDown Either `'up'` or `'down'`.
	     * @return {void}
	     */
	    $scope.move = function (model, list, upOrDown) {
	      Utils.moveByID(upOrDown, list, model.id);
	    };
	  })
	  
	  .service('Utils', function () {
    return {
      /**
       * Get random id
       *
       * @link http://stackoverflow.com/a/1349426/1938970
       * @param  {int} length The length of the id to create.
       * @return {String}     The generated random id.
       */
      getRandomId: function (length) {
        var text = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-';
        for ( var i=0; i < length; i++ )
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
      },
      /**
       * Find object by id in given array of objects, (each array
       * element object must have an id property).
       *
       * @param  {Array}  array                 The array containing the object.
       * @param  {String} id                    The id of the object to find.
       * @return {Object.<Object, int>|boolean} An object containg the found object and
       *                                        its position in the given array, or false
       *                                        if the object is not in the array.
       */
      findById: function (array, id) {
    	  if(!array){
    		  return false;
    	  }
        var i = 0;
        while (i < array.length) {
          if (array[i].id === id) {
            return {
              obj: array[i],
              pos: i
            };
          }
          i++;
        }
        // throw new Error('Object with id ' + id + ' not found in array');
        return false;
      },
      /**
       * Remove object (by given id) from array.
       *
       * @param  {Array}  array    The array containing the object to move.
       * @param  {String} objectId The id of the object to move.
       * @return {Array}           The cleaned array.
       */
      removeByID: function (array, objectId) {
        var result = this.findById(array, objectId);
        if (!result) {
          return;
        }
        var index = result.pos;
        array.splice(index, 1);
        return array;
      }
    };
  })
;
