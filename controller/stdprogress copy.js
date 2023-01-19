angular.module('studentapp').controller('stdprogress',function($scope,$http,$filter,$localStorage,$window,$rootScope,apiurl){ 
    console.log("welcoem");
    var currentLocation = String(window.location);
    $scope.tablevalue = currentLocation.split("=");  
    $http.get("http://10.60.1.9:3006/api/exams/studentacademicinfo/2127170116").success(function (data) { 
            console.log(data);  
            $scope.std = data; 
            if($scope.tablevalue[1]=='attendance'){ 
                $scope.stdpresentdt =$scope.std.secattedance;
                $scope.stdabsentdt =$scope.std.stdattendance;
            }
            else if($scope.tablevalue[1]=='acadamic'){ 
                $scope.stdacademic =$scope.std.academicAvgResult;
            }
            else if($scope.tablevalue[1]=='competative'){
                $scope.stdcompetative =$scope.std.compAvgResult; 
            }
            else{
                console.log("no selection");
            }
        });
    console.log($scope.tablevalue)
});