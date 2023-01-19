angular.module('studentapp').controller('failure',function($scope,$http,$filter,$location, $localStorage,$window,$route,$rootScope,apiurl){

    var apiurl = apiurl.getUrl();
    if(!$window.localStorage.getItem('studentdata')){
        window.location.href = 'home.html';
    }
   

   $scope.transactionFailed = function(){
        $http.get('http://10.70.3.116:7575/payumoney/api/transaction/'+$route.current.params.tid).success((data) => {  

            if(data.length==0){

                var obj={
                    "txid" : $route.current.params.tid
                }
               
                    $http.post('http://10.70.3.116:7575/payumoney/api/payment/failed',obj).success((data) => {
                        
                        $scope.failed = true;
                    
                    }); 

            }else{
                alert('Already verified');
                $window.location.href = 'home.html#/dashboard';
            }

        });
    
    
   }

    
});
