/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("myApp").controller('ProfileCtrl', ['$scope', '$rootScope', '$http', 'CommentsService', '$localStorage', function ($scope, $rootScope, $http, CommentsService, $localStorage) {
	$scope.userName = $localStorage.userName;
	
	if ($scope.userName != "" && $scope.userName) {
	    profileService.getProfileInfo($scope.userName)
		    .then(function (response) {
			$scope.profileInfo = response;
			//$scope.parentobj.comments = response.data;
		    });
	}
	else{
	    $(location).attr('href', '/signUp');
	}
	


    }]);

