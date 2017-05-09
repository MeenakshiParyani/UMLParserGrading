var grader = angular.module('grader', ['ui.router', 'lr.upload','ngFileUpload','ng', 'angular-loading-bar']);

grader.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

  $stateProvider.state('login', {
    url: '/',
    component: 'login',
    showLogout: { value: "false" }
  });

  $stateProvider.state('grade', {
    url: '/grade',
    component: 'grade'
  });

  $stateProvider.state('output', {
    url: '/output',
    component: 'output'
  });


  $urlRouterProvider.otherwise('/');
});

grader.run(function() {});
