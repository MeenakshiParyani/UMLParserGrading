angular.module('grader').component('output', {
  templateUrl: 'components/output/output.template.html',
  
  controller: ['$stateParams', '$scope', '$rootScope' , 
  function OutputController($stateParams, $scope, $rootScope) {
  	$scope.image = $rootScope.image;
  	$scope.tenant = $rootScope.tenant;
  	$scope.changeVote = function(newGrade){
	    $scope.grade = newGrade;
  	};
  }


]});
