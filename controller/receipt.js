angular.module('studentapp').controller('receipt',function($scope,$http,$filter,$localStorage,$window,$rootScope,apiurl){ 
    // alert("welcome"); 
    var apipath = apiurl.getUrl(); 
    $scope.stdinfo = JSON.parse($window.localStorage.getItem('stdappdetails'));
    console.log($scope.stdinfo);  

    $scope.receipt_loading = function(){   
        var currentLocation = String($window.location.href); 
        const myArray = currentLocation.split("rid=");
        console.log(myArray)
        $http.get(apipath+"/receipt/"+myArray[1]).success((data) => { 
            console.log(data); 
            $scope.fee_details = data;  
            var empty_array = 0;
            for(var i=0;i<$scope.fee_details.length;i++){
                for(var j=0;j<$scope.fee_details[i].feeinfo.length;j++){
                    empty_array += $scope.fee_details[i].feeinfo[j].amount_paid*1; 
                }
                $scope.fee_details[i].total_paid_amount = empty_array; 
            }
            console.log($scope.fee_details)
        }); 
    }
 
 
});