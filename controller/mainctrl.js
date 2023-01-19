var app = angular.module("studentapp", ['ngRoute','ngStorage','oc.lazyLoad']);

app.service('apiurl', function () { 
    var apipath = 'http://10.70.3.116:3006/api';  
    return {
      getUrl: function() {
        return apipath;
      }
    }
   
});   
 

  app.filter('unique', function() {
   return function(collection, keyname) {
      var output = []; 
        angular.forEach(collection, function(item) {
			if(output.indexOf(item[keyname]) === -1) 
				output.push(item[keyname]);
      });
      return output;
   };
});
  
  app.filter('sumByColumn', function () {
      return function (collection, column) {
        var total = 0;

        collection.forEach(function (item) {
          total += parseInt(item[column]);
        });

        return total;
      };
    }); 
app.config([ "$ocLazyLoadProvider", function($ocLazyLoadProvider) {
		$ocLazyLoadProvider.config({
		    'debug': true, // For debugging 'true/false'
		    'events': true, // For Event 'true/false'
		    'modules': [
                    { // Set modules initially
                      name : 'dashboard', // State1 module
                      files: ['controller/dashboard.js']
                    },
                    { // Set modules initially
                      name : 'attendance', // State1 module
                      files: ['controller/attendance.js']
                    },
                    { // Set modules initially
                      name : 'academic', // State1 module
                      files: ['controller/academic.js']
                    },
                    { // Set modules initially
                      name : 'competative', // State1 module
                      files: ['controller/competative.js']
                    },
                    { // Set modules initially
                      name : 'finance', // State1 module
                      files: ['controller/finance.js']
                    },
                    { // Set modules initially
                      name : 'failure', // State1 module
                      files: ['controller/failure.js']
                    },
                    { // Set modules initially
                      name : 'success', // State1 module
                      files: ['controller/success.js']
                    },
                    { // Set modules initially
                      name : 'receipt', // State1 module
                      files: ['controller/receipt.js']
                    }
                  ]
		});
   }]);
app.config(function($routeProvider) {
	$routeProvider 
		.when('/dashboard', {
			templateUrl: 'html/dashboard.html',
			controller: 'dashboard',
      resolve: {
            LazyLoadCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load('dashboard'); // Resolve promise and load before view 
            }]
         }
		})  
		.when('/attendance', {
			templateUrl: 'html/attendance.html',
			controller: 'attendance',
      resolve: {
            LazyLoadCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load('attendance'); // Resolve promise and load before view 
            }]
         }
		}) 
		.when('/academic', {
			templateUrl: 'html/academic.html',
			controller: 'academic',
      resolve: {
            LazyLoadCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load('academic'); // Resolve promise and load before view 
            }]
         }
		}) 
		.when('/competative', {
			templateUrl: 'html/competative.html',
			controller: 'competative',
      resolve: {
            LazyLoadCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load('competative'); // Resolve promise and load before view 
            }]
         }
		}) 
		.when('/finance', {
			templateUrl: 'html/finance.html',
			controller: 'finance',
      resolve: {
            LazyLoadCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load('finance'); // Resolve promise and load before view 
            }]
         }
		}) 
		.when('/failure', {
			templateUrl: 'html/failure.html',
			controller: 'failure',
      resolve: {
            LazyLoadCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load('failure'); // Resolve promise and load before view 
            }]
         }
		}) 
		.when('/success', {
			templateUrl: 'html/success.html',
			controller: 'success',
      resolve: {
            LazyLoadCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load('success'); // Resolve promise and load before view 
            }]
         }
		}) 
		.when('/receipt', {
			templateUrl: 'html/receipt.html',
			controller: 'receipt',
      resolve: {
            LazyLoadCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load('receipt'); // Resolve promise and load before view 
            }]
         }
		}) 
		.otherwise({
			redirectTo: '/dashboard'
		});
}).run(['$rootScope', '$location', function($rootScope, $location){
   var path = function() { return $location.path();};
   $rootScope.$watch(path, function(newVal, oldVal){
     $rootScope.activetab = newVal;
   });
   }]);