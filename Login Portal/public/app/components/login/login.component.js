angular.module('grader').component('login', {
  templateUrl: 'components/login/login.template.html',
  
  controller: ['$state','$scope', 'LoginService', '$rootScope', '$location',
  	function LoginController($state, $scope, LoginService, $rootScope, $location) {
  		var self = this;
      	$scope.username = '';
      	password = '';
      	isValidUser = false;
        selectedTenant = '';
        $scope.tenants = [{id : "aniruddha" , name : "Aniruddha Pratap Singh"},
          {id : "kunal" , name : "Kunal Ahuja"},
          {id : "meenakshi" , name : "Meenakshi Paryani"},
          {id : "vivel" , name : "Vivek Agarwal"}
        ];

  		this.authenticate = function(){
  			LoginService.setUsername(this.username);
  			LoginService.setPassword(this.password);
        var authenticatePromise = LoginService.authenticate();
        authenticatePromise.then(function(res) {
          if(res.status=='success')
            this.isValidUser = true;
          $rootScope.tenant = res.tenant;
           console.log("Valid User "+this.isValidUser);
           if(this.isValidUser==true){
              var hostURL = 'http://UMLParserLB-2097741976.us-west-2.elb.amazonaws.com:3000';
              $window.location.href = hostURL + '/' + $rootScope.tenant.username;
           }
            // $state.go('grade', {username : $rootScope.tenant.username});
         
           else
            alert('Error Authenticating User!!');
        });
        authenticatePromise.catch(function(res) {
            alert('Error Authenticating User!!');
        });
  		}

      $scope.routeToTenant = function(){
          var hostURL = 'http://UMLParserLB-2097741976.us-west-2.elb.amazonaws.com:3000';
           $location.url(hostURL + '/' + $scope.selectedTenant+'/');
      }
  		
  }]
});
