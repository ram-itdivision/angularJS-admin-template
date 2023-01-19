angular.module('studentapp').controller('attendance',function($scope,$http,$filter,$localStorage,$window,$rootScope,apiurl){ 
    // console.log("welcoem"); 
    var apipath = apiurl.getUrl(); 
    $scope.stdinfo = JSON.parse($window.localStorage.getItem('stdappdetails'));
    // console.log($scope.stdinfo);  
    $scope.loadingimg=0;
    $scope.onloading = function(){  
        $http.get(apipath+"/exams/studentacademicinfo/"+$scope.stdinfo.student_no).success(function (data) { 
            // console.log(data);   
            $scope.stdpresentdt = data.secattedance;
            $scope.stdabsentdt = data.stdattendance; 
            $scope.loadingimg=1;
            var filteruniquemonths = $filter('unique')($scope.stdpresentdt,'monthname'); 
            // var filterpresent = getSumElements($scope.stdpresentdt,'presentdays'); 
            // var filterworking = getSumElements($scope.stdpresentdt,'workingdays'); 
            var integerarray = [];
            for(var i=0; i<$scope.stdpresentdt.length; i++){
                integerarray[i] = parseInt(($scope.stdpresentdt[i].presentdays*1 / $scope.stdpresentdt[i].workingdays*1)*100);
            }
            // console.log(integerarray);

            const highest = Math.max(...integerarray);
            const lowest = Math.min(...integerarray);
            // console.log(highest, lowest)
            // Chart.defaults.font.size = 8;
            new Chart("attendancegraph", {
                type: "line",
                data: {
                    labels: filteruniquemonths,
                    datasets: [
                        {
                            fill: false,
                            lineTension: 0,
                            backgroundColor: '#F96E07',
                            borderColor: "#fa750ead",
                            data: integerarray,
                        }
                    ], 
                },
                options: { 
                    legend: { display: false },
                    scales: {
                        yAxes: [{ 
                            ticks: { min: lowest, max: 100,fontSize: 10 }
                        }],
                        xAxes: [{
                            ticks: {
                                fontSize: 10,
                                fontWeight: 'bold'
                            }
                        }],
                    },
                    responsive: true,
                    // maintainAspectRatio: false
                },
            });
        });  
    } 
});