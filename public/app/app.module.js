var grader = angular.module('grader', ['ui.router']);

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


  $urlRouterProvider.otherwise('/');
});

grader.run(function() {});