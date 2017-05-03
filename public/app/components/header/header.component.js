angular.module('grader').component('header', {
  templateUrl: 'components/header/header.template.html',

  controller: ['$scope', '$state', 'LoginService', '$rootScope',
    function HeaderController($scope, $state, LoginService, $rootScope) {
      var self = this;
      tenantName = '';
      $rootScope.headerText = "UML Parser Grading"
      $scope.headerText = $rootScope.headerText;
      $rootScope.$watch('headerText', function() {
        $scope.headerText = $rootScope.headerText;
      });

    }
  ]
});