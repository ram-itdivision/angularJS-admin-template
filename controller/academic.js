angular.module('studentapp').controller('academic',function($scope,$http,$filter,$localStorage,$window,$rootScope,apiurl){ 
    // console.log("welcoem"); 
    var apipath = apiurl.getUrl(); 
    $scope.stdinfo = JSON.parse($window.localStorage.getItem('stdappdetails'));
    // console.log($scope.stdinfo); 
    $scope.loadingimg=0;
    $scope.adc_loading = function(){  
        $http.get(apipath+"/exams/studentacademicinfo/"+$scope.stdinfo.student_no).success(function (data) { 
            // $http.get(apipath+"/exams/studentacademicinfo/2127170116").success(function (data) { 
            // console.log(data);   
            $scope.stdacademic =data.academicAvgResult; 

            /******* --------Starting of Academic Exams-------- ********/
            var cat_filter = $filter('unique')(data.academicExams,'sub_cat_id');   
            var catfilter_data = []; var finalobject = []; var obj ={}; $scope.lengthvalues =[];
            for(var i=0; i<cat_filter.length;i++){
                catfilter_data[i] = data.academicExams.filter(e=> e.sub_cat_id==cat_filter[i]);   
                //console.log(catfilter_data[i]); 
                for(var j=0;j<catfilter_data[i].length;j++){
                    catfilter_data[i][j].subjectarray = catfilter_data[i][j].subjectnames.split(",");
                    catfilter_data[i][j].marksarray = catfilter_data[i][j].marks.split(",");
                    catfilter_data[i][j].maxmarksarray = catfilter_data[i][j].max_marks.split(",");
                    catfilter_data[i][j].minmarksarray = catfilter_data[i][j].min_marks.split(","); 
                    var marks_calc = 0; var maxmarks_calc = 0;
                    for(var k=0;k<catfilter_data[i][j].marksarray.length;k++){
                        marks_calc += catfilter_data[i][j].marksarray[k]*1;
                    }
                    for(var k=0;k<catfilter_data[i][j].maxmarksarray.length;k++){
                        maxmarks_calc += catfilter_data[i][j].maxmarksarray[k]*1;
                    } 
                    catfilter_data[i][j].tltmarks = marks_calc;
                    catfilter_data[i][j].tltmaxmarks = maxmarks_calc;
                }  
                $scope.lengthvalues[i] = catfilter_data[i].length;
                obj[i] = {
                    "cat_id" :  catfilter_data[i][0].cat_id,
                    "result" : catfilter_data[i]
                } 
                finalobject[i] = obj[i]
            } 
            // console.log(finalobject) 
            $scope.finalresult = finalobject;
            console.log($scope.finalresult)
            /******* --------Ending of Academic Exams-------- ********/

            /******* --------Stating of Average academicGraph-------- ********/
            var percentage_filter = []; var subjectnames_filter = [];
            for(var i=0;i<$scope.stdacademic.length;i++){
                percentage_filter[i] =Math.round(($scope.stdacademic[i].stdavgmarks*1/$scope.stdacademic[i].exammaxmarks*1)*100);
                subjectnames_filter[i] =$scope.stdacademic[i].subject_name;
                // console.log(percentage_filter)
            }
            // console.log(subjectnames_filter) 
            const highest = Math.max(...percentage_filter);
            const lowest = Math.min(...percentage_filter);
            
            function getRandomColor() {
                var letters = '0123456789ABCDEF'.split('');
                var color = '#';
                for (var i = 0; i < 6; i++) {
                    color += letters[Math.floor(Math.random() * 16)];
                }
                return color;
            }

            function getRandomColorEachEmployee(count) {
                var data =[];
                for (var i = 0; i < count; i++) {
                    data.push(getRandomColor());
                }
                return data;
            }
            new Chart("adc_avg_graph", {
                type: "bar",
                data: {
                    labels: subjectnames_filter,
                    datasets: [
                        {
                            fill: false,
                            lineTension: 0,
                            backgroundColor: getRandomColorEachEmployee(subjectnames_filter.length),
                            borderColor: "#fa750ead",
                            data: percentage_filter,
                        }
                    ], 
                },
                options: { 
                    legend: { display: false },
                    scales: {
                        yAxes: [{ 
                            ticks: { min: 0, max: 100,fontSize: 10, lineHeight: 2 }
                        }],
                        xAxes: [{
                            ticks: {
                                fontSize: 9,
                                fontWeight: 'bold'
                            }
                        }],
                    },
                    responsive: true,
                    // maintainAspectRatio: false
                },
            }); 
            /******* --------Ending of Average academicGraph-------- ********/
            $scope.showlist = 0;
            $scope.limitvar = 5; 
            $scope.loadingimg=1;
        }); 
         
    } 

    $scope.listandblock_function=function(val){ 
            $scope.showlist = val;   
    }

    $scope.readmore=function(val,id){
        console.log(val,$scope.lengthvalues);
        for(var i=0; i<$scope.finalresult.length;i++){
            if(id==$scope.finalresult[i].cat_id){  
                    $scope.limitvar += 5; 
                  
            }
        }
         
    } 

});