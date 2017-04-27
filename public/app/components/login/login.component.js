angular.module('grader').component('login', {
  templateUrl: 'components/login/login.template.html',
  
  controller: ['$state', 'LoginService', 
  	function LoginController($state, LoginService) {
  		LoginService.setUsername($state.username);
  		LoginService.setPassword($state.password);
  		var isValidUser = LoginService.authenticate();
  		if(isValidUser==true)
  			$state.go(grade);
  }]
});
