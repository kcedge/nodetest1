/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module("myApp").controller('devDashController', ['$scope', '$rootScope', '$http', 'ProfileService', '$localStorage', "FileUploader", "ngAudio", function ($scope, $rootScope, $http, ProfileService, $localStorage, FileUploader, ngAudio) {


	$scope.currentUser = ProfileService.getUserInfo();



	ProfileService.isAuthenticated(function (user) {
		if (user.username == "kcedge") {
			$scope.adminAuth = true;
			$scope.authenticated = true;
		}
		if (user.userName) {
			$scope.authenticated = true;
			$scope.username = user.username;
		}
		//ProfileService.setUserInfo(user);

	});


	$scope.parseJson = function (jsonArray) {
		for (var i = 0; i < jsonArray.length; i++) {
			if (jsonArray[i].hasOwnProperty("packImageJson") && jsonArray[i].packImageJson) {
				jsonArray[i].packImageJson = JSON.parse(jsonArray[i].packImageJson);
			}
		}

		return jsonArray;
	}


	window.onload = function () {

	}

	// $(window).resize(function () {
	//     styleSize();
	// });
	// var styleSize = function () {
	//     var height = $(window).height();
	//     $(".sampleListWrapper").height(height - 50 - 90); //For banner and filter menu
	// }

	$scope.devDashApps = [{ name: "Filter Script" }, { name: "User Management" }, { name: "Pop Up Tester" }];

	$scope.appSelectedClicked = function (name) {
		$scope.appSelected = name;

	}


	$scope.filterTagsDefault = [{ name: 'Mixing', type: '', parent: '' }, { name: 'Mastering', type: '', parent: '' },
	{ name: '', type: '', parent: '' }, { name: '', type: '', parent: '' },
	];

	$scope.readFilterScriptFile = function () {
		// 

		$http.get('/filterScriptFile').then(function(response){
			var file = response;
		});
	}




}]);
