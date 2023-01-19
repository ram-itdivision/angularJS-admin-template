angular.module('studentapp').controller('success',function($scope,$http,$filter,$location, $localStorage,$window,$route,$rootScope,apiurl){

    var apiurl = apiurl.getUrl();
    if(!$window.localStorage.getItem('stdappdetails')){
        window.location.href = 'home.html';
    }
    
    
   
    $scope.getInvoice = function(){
        alert('wait');
        $scope.paymentimg = 1;

      
    }

    
});
