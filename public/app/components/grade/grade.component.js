angular.module('grader').component('grade', {
  templateUrl: 'components/grade/grade.template.html',
  
  controller: ['$scope', 'Upload','$timeout', '$stateParams', '$http', '$state', '$rootScope', 
  function GradeController($scope, Upload, $timeout, $stateParams, $http, $state, $rootScope) {

  	$scope.doUpload = function () {
  		console.log($scope); 
  	 	console.log(upload);
  	 	var fd = new FormData();
  	 	console.log(fd);
  	}

  if($stateParams != 'undefined'){
	 
	  console.log('id is ' + $stateParams.tenantId);
	  $scope.tenantId = $stateParams.tenantId;
  }

  $scope.setFiles = function($element) {
    $scope.$apply(function($scope) {
      console.log('files:', $element.files[0]);
      // Turn the FileList object into an Array
        $scope.file = $element.files[0];
      $scope.progressVisible = false
      });
  }

    $scope.uploadZip = function(file) {
      $scope.fileName =  file.name;
      console.log('Filename is ' + $scope.fileName)
      file.upload = Upload.upload({
        url: '/api/upload',
        data: {file: file},
      });

      file.upload.then(function (response) {
        $timeout(function () {
          file.result = response.data;
        });
      }, function (response) {
        if (response.status > 0)
          $scope.errorMsg = response.status + ': ' + response.data;
      }, function (evt) {
        file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
      });
    }

    $scope.parse = function(){
        $http.get('/api/parse', {
        fileName : 'output.png'
      }).then(function(res) {
        $rootScope.image = res.data;
        $state.go('output');
      });
    }
  		
  }]

});
