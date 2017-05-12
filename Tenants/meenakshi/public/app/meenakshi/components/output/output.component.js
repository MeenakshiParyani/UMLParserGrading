angular.module('grader').component('output', {
  templateUrl: 'components/output/output.template.html',
  
  controller: ['$stateParams', '$scope', '$rootScope' ,'$window', '$http',
  function OutputController($stateParams, $scope, $rootScope, $window, $http) {
  	$scope.image = $rootScope.image;
  	$scope.tenant = $rootScope.tenant;
  	$scope.allowGrading = true;
  	

    $scope.onRating = function(rating){
       $scope.allowGrading = false;
       console.log(rating);
       $scope.grade = rating;
       $http.post('/meenakshi/api/grade', {
          tableName : $rootScope.tenant.table_name,
          tenantId : $rootScope.tenant.tenant_id,
          result : rating
        }).then(function(res) {
          return res;
        });
    }
  }


]});
