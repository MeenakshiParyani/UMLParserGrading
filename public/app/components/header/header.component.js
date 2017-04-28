angular.module('grader').component('header', {
  templateUrl: 'components/header/header.template.html',

  controller: ['$scope', '$state', 'LoginService',
    function HeaderController($scope, $state, LoginService) {
      var self = this;
      tenantName = '';

      this.getTenantName = function(){
        var getTenantName = LoginService.getTenantname();
        getTenantName.then(function(tenantName) {
           this.tenantName = tenantName;
           $scope.tenantName = this.tenantName;
           console.log("tenantName "+this.tenantName);
        });
      }

    }
  ]
});