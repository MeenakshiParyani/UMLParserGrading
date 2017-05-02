angular.module('grader').component('output', {
  templateUrl: 'components/output/output.template.html',
  
  controller: ['$stateParams', '$scope', '$rootScope' , 
  function OutputController($stateParams, $scope, $rootScope) {
  	$scope.image = $rootScope.image;

  	$scope.changeVote = function(vote, flag){
	    $scope.vote = vote==flag?'None':flag;
	    alert($scope.vote);
  };
  }


]});
