var app=angular.module('he',[]).controller("san",["$scope","$http","server","$stateParams","$cookieStore","$cookies",function ($scope,$http,server,$stateParams,$cookieStore,$cookies){

   
$scope.uid=$cookieStore.get('abc');
$scope.updata={"uid":$cookieStore.get('abc')}
  $scope.amend=function(e){
      $scope.xianshi=true;
      //$scope.updata=e
    };
 var arr=[];
      $('.tag').find('span').click(function(){
        $(this).attr('class','label label-warning')
        arr.push($(this).text())
        //$(this).attr('class','label label-default')
      })

$scope.add=function(){

    $http({
      url:server+"/item",
      method:"POST",
      data:{'title':$scope.title,'content':$scope.content,'tag':arr,'uid':$scope.uid}
    }).success(function(e){
     $scope.data.push(e);
     $scope.tid=e.id
     $scope.title=null;
     $scope.content=null;
     //$scope.data=null
      //debugger;
     
    // window.onload()
    });
        $http({
        url:server+"/tag",
        method:"POST",
        data:{'tag':arr,'tid':$scope.tid,'uid':$scope.uid}
      }).success(function(e){
        //debugger;
         window.location.href="index.html#/san";
      })
  $scope.xianshi=false;
  }




$scope.xx=function(e){
    $http({
      url:server+"/item/"+e.id,
      method:"delete"
    }).success(function(){
      $scope.data.splice($scope.data.indexOf(e),1)
    })
 }

$scope.bian=$stateParams
$scope.hui=function(){
      $http({
      url:server+"/item/"+$scope.bian.id,
      method:"put",
      data:$scope.bian
    }).success(function(e){
      debugger;
      window.location.href="index.html#/san";
    })
    }
var kai=0;
$http({
       url:server+"/item/",
       method:"get",
       params:{"$skip":kai,"$limit":5,"uid":$scope.uid}
    }).success(function(e){
      $scope.data=e
      //debugger
    })  
$scope.y=true
$scope.right=function(){ 
    kai+=5; 
    //if(kai==data){kai=0}
    $http({
       url:server+"/item",
       method:"get",
       params:{"$skip":kai,"$limit":5,"uid":$scope.uid}
    }).success(function(e){
      $scope.data=e;
    })
  }


$scope.left=function(){
  if(kai<0){kai=0}
  kai-=5;
  $http({
     url:server+"/item",
     method:"get",
     params:{"$skip":kai,"$limit":5,"uid":$scope.uid}
  }).success(function(e){
    $scope.data=e;
  })
}


$scope.out=function(){
      $http({
         url:server+"/users/logout",
         method:"POST",
       }).success(function(e){
       $cookieStore.remove('usernam');
      $cookieStore.remove("abc");  
         window.location.href="index.html#/yi";
       })
  }









  }])