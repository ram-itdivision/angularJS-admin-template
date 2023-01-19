angular.module('studentapp').controller('finance',function($scope,$http,$filter,$localStorage,$window,$rootScope,apiurl){ 
    // console.log("welcome"); 
    var apipath = apiurl.getUrl(); 
    $scope.stdinfo = JSON.parse($window.localStorage.getItem('stdappdetails'));
    // console.log($scope.stdinfo);
    $scope.loadingimg=0;
    $scope.finance_loading = function(){ 
        $scope.showform=1;
        var obj = {
            "year" : $scope.stdinfo.year_id,
            "student" : $scope.stdinfo.std_id
        }
        // console.log(obj);
        $http.post(apipath+"/finance/studentfinanceinfo", obj).success(function (data) { 
            console.log(data);
            $scope.payment_details = data.paymentinfo;
            $scope.termwise_feedt = data.feeinfo;
            var term_filter = $filter('unique')($scope.termwise_feedt,'term_number');
            // console.log(term_filter);
            $scope.terms_details = [];
            for(var i=0;i<term_filter.length;i++){
                $scope.terms_details[i] = $scope.termwise_feedt.filter(e=> e.term_number== term_filter[i]);
            }
            //  var total_termfees = 0; var total_termdue = 0;
            for(var i=0;i<$scope.terms_details.length;i++){ 
                var total_termfees = 0; var total_termdue = 0; var f_termid=0;
                var f_name=''; var f_stdid=0; var f_fullname='';
                for(var j=0;j<$scope.terms_details[i].length;j++){ 
                    f_fullname = $scope.terms_details[i][j].fee_name;
                    f_name = $scope.terms_details[i][j].fee_shortcode;
                    f_termid = $scope.terms_details[i][j].fee_id;
                    f_stdid = $scope.terms_details[i][j].std_id;
                    total_termfees += $scope.terms_details[i][j].term_amount; 
                    total_termdue += $scope.terms_details[i][j].term_due_amount; 
                }
                 
                $scope.terms_details[i].std_tlttermfees = total_termfees;
                $scope.terms_details[i].std_tlttermdue = total_termdue;
                $scope.terms_details[i].std_feesfullname = f_fullname;
                $scope.terms_details[i].std_feesname = f_name;
                $scope.terms_details[i].std_termid = f_termid;
                $scope.terms_details[i].std_id = f_stdid;
            } 
            console.log($scope.terms_details);

            $scope.loadingimg=1;
        }); 
    }

    $scope.showform=1; 
    document.getElementById("alter_mbl").disabled = true; 
    $scope.fee_pay_now = function(t_details){
        $scope.error_msg = '';
        $scope.showform=2;
        console.log(t_details);
        $scope.obj_details = t_details;
    }

    $scope.paychange = function(alter_mobile){
        if(alter_mobile==undefined || alter_mobile=='' || alter_mobile.length!=10){
            document.getElementById("alter_mbl").disabled = true; 
            $scope.error_msg = "Please Enter Valid Mobile Number";
        }else{
            $scope.error_msg='';
            document.getElementById("alter_mbl").disabled = false;  
        }
    }
    
    $scope.paynow = function(alter_mobile){  
        var obj={
            "amount": $scope.obj_details.std_tlttermdue,
            "email": $scope.stdinfo.email,
            "phone": $scope.stdinfo.mobile_no,
            "productinfo": $scope.obj_details.std_feesfullname,
            "firstname": $scope.stdinfo.student_name,
            "lastname" : $scope.stdinfo.father_name,
            "suc" : $scope.stdinfo.student_no,
            "projectId" : "Analysis",
            "alternative_no" : alter_mobile
            } 
        console.log(obj); 
        // $http.post(apiurl+"/api/payment/paymentnow",obj).success((data) => {  
        $http.post("http://10.70.3.116:7575/api/payment/paymentnow",obj).success((data) => { 
            console.log(data);
            $window.location.href = data.paymenturl; 
        }); 
    }
    
    $scope.verify_receipt = function(rcp_no){
        var stob = btoa(rcp_no);
        // console.log(stob);
        // console.log("home.html/receipt?rid="+stob+"");
        window.location.href="home.html#/receipt?rid="+stob;
    }
});