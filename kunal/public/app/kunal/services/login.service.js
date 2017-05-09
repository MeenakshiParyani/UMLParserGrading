angular.module('grader').service('LoginService', function($http, $rootScope) {
  var service = {
    username : '',
    password : '',
    validUser : false,
    tenantName : '',

    setUsername: function(username){
      service.username = username;
    },

    setPassword: function(password){
      service.password = password;
    },

    getTenantname: function(){
      return $http.get('/api/tenant', {
        'username' : service.username
      }).then(function(res) {
        service.tenantName = res.tenantName;
        return service.tenantName;
      });
    },

    authenticate: function() {
      return $http.post('/kunal/api/login', {
        'username' : service.username,
        'password' : service.password
      }).then(function(res) {
        return res.data;
      });
    },

    isValidUser: function() {
      return service.validUser;
    }
  };

  return service;
});