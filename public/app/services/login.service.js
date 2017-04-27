angular.module('grader').service('LoginService', function($http) {
  var service = {
    username = '';
    password = '';
    validUser = false;

    setUsername: function(username){
      service.username = username;
    },

    setPassword: function(password){
      service.password = password;
    }
   
    authenticate: function() {
      $http.post('/api/login', {
        'username' : service.username,
        'password' : service.password
      }).then(function(res) {
        if(res.status=='success')
          validUser = true;
        else
          validUser = false;
        return validUser;
      }).error(function(res){
          alert('Error Authenticating User!!')
      });
    },

    isValidUser: function() {
      return service.validUser;
    }
  };

  return service;
});