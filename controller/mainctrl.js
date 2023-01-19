var app = angular.module("AbhyasApp", ['ngRoute','ngStorage','oc.lazyLoad']);

 app.service('apiurl', function () { 
    var apipath = 'http://10.70.3.116:3006/api'; 
      
		return {
			getUrl: function() {
				return apipath;
			}
		} 
    });
     
    
    app.filter('trusted', ['$sce', function ($sce) {
        return function(url) {
            return $sce.trustAsResourceUrl(url);
        };
    }]);

	

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
  

app.filter('capitalize', function() {
  return function(input) {
    return (angular.isString(input) && input.length > 0) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : input;
  }
});

app.factory('Excel',function($window){
	var uri='data:application/vnd.ms-excel;base64,',
		template='<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
		base64=function(s){return $window.btoa(unescape(encodeURIComponent(s)));},
		format=function(s,c){return s.replace(/{(\w+)}/g,function(m,p){return c[p];})};
	return {
		tableToExcel:function(tableId,worksheetName){
			var table=$(tableId),
				ctx={worksheet:worksheetName,table:table.html()},
				href=uri+base64(format(template,ctx));
			return href;
		}
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
		    'modules': [{ // Set modules initially
		        name : 'dashboard', // State1 module
		        files: ['controller/dashboard.js']
		    },
        { // Set modules initially
          name : 'blankpage', 
          files: ['controller/blankpage.js']
      }
          
        
     ]
		});
   }]);
   
app.config(function($routeProvider) {
	$routeProvider
		.when('/dashboard', {
			templateUrl: 'html/dashboard.html',
			controller: 'Dashboard',
      resolve: {
            LazyLoadCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load('dashboard'); // Resolve promise and load before view 
            }]
         }
		})
    .when('/blankpage', {
			templateUrl: 'html/blankpage.html',
			controller: 'blankpage',
      resolve: {
            LazyLoadCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load('blankpage'); // Resolve promise and load before view 
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






   
