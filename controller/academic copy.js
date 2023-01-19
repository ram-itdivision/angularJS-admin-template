angular.module('studentapp').controller('academic',function($scope,$http,$filter,$localStorage,$window,$rootScope,apiurl){ 
    // console.log("welcoem"); 
    var apipath = apiurl.getUrl(); 
    $scope.loadingimg=0;
    $scope.adc_loading = function(){
        $http.get(apipath+"/exams/studentacademicinfo/2127170476").success(function (data) { 
            //console.log(data);   
            $scope.stdacademic =data.academicAvgResult; 
            var cat_filter = $filter('unique')(data.academicExams,'cat_id');  

            var catfilter_data = []; var total_secrank=0; var total_per=0;var obj ={};
            var finalobject = []
            for(var i=0; i<cat_filter.length;i++){
                catfilter_data[i] = data.academicExams.filter(e=> e.cat_id==cat_filter[i]);   
                //console.log(catfilter_data[i]); 
                for(var j=0;j<catfilter_data[i].length;j++){
                    catfilter_data[i][j].subjectarray = catfilter_data[i][j].subjectnames.split(",");
                    catfilter_data[i][j].marksarray = catfilter_data[i][j].marks.split(",");
                    catfilter_data[i][j].maxmarksarray = catfilter_data[i][j].max_marks.split(",");
                    catfilter_data[i][j].minmarksarray = catfilter_data[i][j].min_marks.split(",");
                }

                //console.log(subjectarray)

                obj[i] = {
                    "cat_id" :  catfilter_data[i][0].cat_id,
                    "result" : catfilter_data[i]
                }

                finalobject[i] = obj[i]
            }

            console.log(finalobject)

             $scope.finalresult = finalobject;
            $scope.loadingimg=1;
        }); 
    }

    function getSumElements(obj, field) {
        // console.log(obj);
        var total = 0;
        for (var i in obj){
            // console.log(Number(obj[i][field])); 
            if(isNaN(Number(obj[i][field]))){
                total +=0;
            }
            else{ 
                total += Number(obj[i][field])*1;
            }
        } 
        // console.log(total)
        return total;
    }
    
});