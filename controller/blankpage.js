angular.module('AbhyasApp').controller('blankpage',function($scope,$http,$sce,$filter, $localStorage,$window,$route,$rootScope,apiurl,Excel){

	var apipath = apiurl.getUrl(); 
	$scope.userdata = $window.localStorage.getItem('admindata'); 
	

	 $http.get(apipath+'/master/institute').success(function(data){
		console.log(data);
	 	$scope.datalist=data;
		 $(function () {
			$('#datalistid').DataTable();
		});
	 	
	 });
	 $scope.getStudents = function(qr){
        $scope.form=1;
        }

	console.log('Dashboard');
	$scope.logout = function(){
		$window.localStorage.clear();
		$window.location = 'index.html'

	} 

	$scope.exportToExcel=function(tableId){ // ex: '#my-table'
        var exportHref=Excel.tableToExcel(tableId,'WireWorkbenchDataExport'); 
         location.href=exportHref;  // trigger download
    }

	$scope.printfunction =() => {
        var divToPrint = document.getElementById('datalistid');
        newWin = window.open("");
        newWin.document.write(divToPrint.outerHTML);
        newWin.print();
        newWin.close();
    } 
});
