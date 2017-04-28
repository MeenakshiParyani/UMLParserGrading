angular.module('grader').service('LoginService', function($http) {
  var service = {
    username : '',
    password : '',
    validUser : false,

    setUsername: function(username){
      service.username = username;
    },

    setPassword: function(password){
      service.password = password;
    },


    authenticate: function() {
      return $http.get('/api/login', {
        'username' : service.username,
        'password' : service.password
      }).then(function(res) {
        if(res.data.status=='success')
          service.validUser = true;
        return service.validUser;
      });
    },

    isValidUser: function() {
      return service.validUser;
    }
  };

  return service;
});