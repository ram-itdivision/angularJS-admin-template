angular.module('studentapp').controller('dashboard',function($scope,$http,$filter,$localStorage,$window,$rootScope,apiurl){
    var apipath = apiurl.getUrl();  
    $scope.stdinfo = JSON.parse($window.localStorage.getItem('stdappdetails'));
    console.log($scope.stdinfo);
      $scope.logout = function(){ 
         window.localStorage.removeItem('stdappdetails');
         window.location.href = 'index.html'; 
      }
      
      $scope.onloading = function(){
         if(!$window.localStorage.getItem('stdappdetails')){
            window.location.href = 'index.html'; 
         } 
         else{   
            $(document).ready(function () {
               $(".g-scrolling-carousel .items").gScrollingCarousel(); 
            }); 
            $scope.pageredirect = function(attr){  
               if(attr=='attendance'){
                  window.location.href = "#/attendance"; 
               }else if(attr=='acadamic'){
                  window.location.href = "#/academic"; 
               }else if(attr=='competative'){
                  window.location.href = "#/competative"; 
               }else if(attr=='finance'){
                  window.location.href = "#/finance"; 
               }
               else{
                  window.location.href = "#/dashboard"; 
               }
            } 
            
            $http.get(apipath+"/exams/studentacademicinfo/"+$scope.stdinfo.student_no).success(function (data) { 
               console.log(data);
               $scope.std_attendance = data.secattedance;
               $scope.std_academic =data.academicAvgResult; 
               $scope.std_competative =data.compAvgResult; 
   
               // Attendance Percentage
               var attendance_pre = getSumElements($scope.std_attendance,'presentdays'); 
               var attendance_wrk = getSumElements($scope.std_attendance,'workingdays'); 
               $scope.total_atten = (attendance_pre*1/ attendance_wrk*1) *100; 
   
               // academic Percentage 
               var academic_pre = getSumElements($scope.std_academic,'stdavgmarks'); 
               var academic_wrk = getSumElements($scope.std_academic,'exammaxmarks'); 
               $scope.total_adc = (academic_pre*1/ academic_wrk*1) *100; 
   
               // academic Percentage 
               var competative_pre = getSumElements($scope.std_competative,'stdavgmarks'); 
               var competative_wrk = getSumElements($scope.std_competative,'exammaxmarks'); 
               $scope.total_cmp = (competative_pre*1/ competative_wrk*1) *100; 
            });
   
            var obj = {
               "year" : $scope.stdinfo.year_id,
               "student" : $scope.stdinfo.std_id
           }
           console.log(obj);
           $http.post(apipath+"/finance/studentfinanceinfo", obj).success(function (data) { 
               console.log(data);
               $scope.payment_details = data.paymentinfo;
               $scope.std_feedetails = data.feeinfo;
               $scope.total_fees = getSumElements($scope.std_feedetails,'term_due_amount'); 
   
           });
   
         }
      }

      function getSumElements(obj, field) {
         //console.log(obj);
         var total = 0;
         for (var i in obj)
             total += Number(obj[i][field]);
         return total;
      }
});