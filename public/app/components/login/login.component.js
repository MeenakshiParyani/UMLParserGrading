angular.module('grader').component('login', {
  templateUrl: 'components/login/login.template.html',
  
  controller: ['$state','$scope', 'LoginService', 
  	function LoginController($state, $scope, LoginService) {
  		var self = this;
      	username = '';
      	password = '';
      	isValidUser = false;
  		

  		this.authenticate = function(){
  			LoginService.setUsername(this.username);
  			LoginService.setPassword(this.password);
        var authenticatePromise = LoginService.authenticate();
        authenticatePromise.then(function(result) { 
           this.isValidUser = result;
           console.log("Valid User "+this.isValidUser);
           if(this.isValidUser==true)
            $state.go('grade');
           else
            console.log('Error Authenticating User!!');
        });
	  		
	  		
  		}
  		
  }]
});
