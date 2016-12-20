/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("myApp").controller('ProfileCtrl', ['$scope', '$rootScope', '$http', 'ProfileService', '$localStorage', function ($scope, $rootScope, $http, ProfileService, $localStorage) {

	$scope.$storage = $localStorage.$default({
	    username: "",
	    userSignedIn: false
	});

	var username = $("#userName").html();
	$scope.username = username;
	$scope.$storage = $localStorage;
	$scope.$storage.userSignedIn = true;
	$scope.$storage.username = username;
	$scope.totalpoints = 0;
	var setTotalPoints = function () {
	    $scope.tipsSubmitted.forEach(function (tip) {
		$scope.totalpoints += tip.tipPoints;
	    });
	}
	var getTips = function (tipJson) {
	    ProfileService.getTipsByJsonArray(tipJson)
		    .then(function (response) {
			$scope.lovedTipsData = response.data;
			$scope.numberOfTipsSaved = $scope.lovedTipsData.length;
		    }).catch(function (data, status) {
		console.log('ERROR: ' + status + '. We can\'t get the profile right now, please try again later');

	    });
	}

	ProfileService.getProfileInfo($scope.username)
		.then(function (response) {

		    $scope.profileInfo = response.data;
		    if ($scope.profileInfo[0].lovedTipsJson) {
			getTips($scope.profileInfo[0].lovedTipsJson);

		    }

		    $scope.lovedTips = JSON.parse($scope.profileInfo[0].lovedTipsJson);
		    $scope.likedTips = JSON.parse($scope.profileInfo[0].likedTipsJson);
		    $scope.dislikedTips = JSON.parse($scope.profileInfo[0].dislikedTipsJson);


		    //$scope.parentobj.comments = response.data;
		});


	ProfileService.getTipsSubmitted($scope.username)
		.then(function (response) {
		    $scope.tipsSubmitted = response.data;
		    $scope.numberOfTipsSubmitted = response.data.length;
		    setTotalPoints();
		    //$scope.parentobj.comments = response.data;
		});


	$scope.getDate = function (tip) {

	}
	$scope.showSubmitted = false;
	$scope.toggleShowSubmitted = function () {
	    $scope.showSubmitted = !$scope.showSubmitted;
	}

	$scope.showSaved = false;
	$scope.toggleShowSaved = function () {
	    $scope.showSaved = !$scope.showSaved;
	}


    }]);

