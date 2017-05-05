angular.module('grader').component('login', {
  templateUrl: 'components/login/login.template.html',
  
  controller: ['$state','$scope', 'LoginService', '$rootScope',
  	function LoginController($state, $scope, LoginService, $rootScope) {
  		var self = this;
      	$scope.username = '';
      	password = '';
      	isValidUser = false;

  		this.authenticate = function(){
  			LoginService.setUsername(this.username);
  			LoginService.setPassword(this.password);
        var authenticatePromise = LoginService.authenticate();
        authenticatePromise.then(function(res) {
          if(res.status=='success')
            this.isValidUser = true;
          $rootScope.tenant = res.tenant;
           console.log("Valid User "+this.isValidUser);
           if(this.isValidUser==true)
            $state.go('grade', {username : $rootScope.tenant.username});
           else
            alert('Error Authenticating User!!');
        });
        authenticatePromise.catch(function(res) {
            alert('Error Authenticating User!!');
        });
  		}
  		
  }]
});
