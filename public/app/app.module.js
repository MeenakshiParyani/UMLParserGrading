var grader = angular.module('grader', ['ui.router', 'lr.upload','ngFileUpload']);

grader.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

  $stateProvider.state('login', {
    url: '/',
    component: 'login'
  });

  $stateProvider.state('grade', {
    url: '/grade',
    component: 'grade'
  });

  $stateProvider.state('upload', {
    url: '/upload',
    component: 'output'
  });


  $urlRouterProvider.otherwise('/');
});

grader.run(function() {});