angular.module('grader').component('output', {
  templateUrl: 'components/output/output.template.html',
  
  controller: ['$stateParams', '$scope', '$rootScope' ,'$window', '$http',
  function OutputController($stateParams, $scope, $rootScope, $window, $http) {
  	$scope.image = $rootScope.image;
  	$scope.tenant = $rootScope.tenant;
  	$scope.allowGrading = true;
  	$scope.changeVote = function(newGrade){
	    $scope.grade = newGrade;
	    $scope.allowGrading = false;
	    $http.post('/meenakshi/api/grade', {
          tableName : $rootScope.tenant.table_name,
	    	  tenantId : $rootScope.tenant.tenant_id,
        	result : newGrade
      	}).then(function(res) {
        	return res;
      	});
  	};

    $scope.onRating = function(rating){
       $scope.allowGrading = false;
       console.log(rating);
       $scope.grade = rating;
    }
  }


]});
