angular.module('grader').component('header', {
  templateUrl: 'components/header/header.template.html',

  controller: ['$scope', '$stateParams', 'LoginService', '$rootScope', '$window',
    function HeaderController($scope, $stateParams, LoginService, $rootScope, $window) {
      var self = this;
      tenantName = '';
      $rootScope.headerText = "UML Parser Grading"
      $scope.headerText = $rootScope.headerText;
      $scope.tenant = $rootScope.tenant;
      $scope.$watch('tenant', function() {
        $scope.headerText = $rootScope.headerText;
      });

      $scope.logout = function(){
        var hostURL = 'http://UMLParserLB-2097741976.us-west-2.elb.amazonaws.com:3000';
        $window.location.href = hostURL ;
      }
    }
  ]
});