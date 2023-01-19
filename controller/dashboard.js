angular.module('AbhyasApp').controller('Dashboard',function($scope,$http,$sce,$filter, $localStorage,$window,$route,$rootScope,apiurl){

	var apipath = apiurl.getUrl(); 
	$scope.userdata = $window.localStorage.getItem('admindata'); 
	

	//  $http.get(apipath+'/videos').success(function(data){
	//  	$scope.videos=data;
	 	
	//  })

	console.log('Dashboard');
	$scope.logout = function(){
		$window.localStorage.clear();
		$window.location = 'index.html'

	}
	

	

});
