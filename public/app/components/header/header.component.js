angular.module('grader').component('header', {
  templateUrl: 'components/header/header.template.html',

  controller: ['$scope', '$stateParams', 'LoginService', '$rootScope',
    function HeaderController($scope, $stateParams, LoginService, $rootScope) {
      var self = this;
      tenantName = '';
      $rootScope.headerText = "UML Parser Grading"
      $scope.headerText = $rootScope.headerText;
      $scope.tenant = $rootScope.tenant;
      $scope.$watch('tenant', function() {
        $scope.headerText = $rootScope.headerText;
      });

    }
  ]
});