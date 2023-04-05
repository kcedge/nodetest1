/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module("myApp").controller('popUpController', ['$scope', '$rootScope', '$http', 'ProfileService', '$localStorage', "FileUploader", "ngAudio", function ($scope, $rootScope, $http, ProfileService, $localStorage, FileUploader, ngAudio) {	


	$scope.currentUser = ProfileService.getUserInfo();
	

	window.onload = function () {
	 
	}

	// $(window).resize(function () {
	//     styleSize();
	// });
	// var styleSize = function () {
	//     var height = $(window).height();
	//     $(".sampleListWrapper").height(height - 50 - 90); //For banner and filter menu
	// }

	$scope.showPopUp= function(){
		if(ProfileService.getShowPopUp()){
			return true;
		}
		else{
			return false
		}
	}

	$scope.dismissClicked = function(){
		ProfileService.dismissClicked();
	}
	$scope.popUpFormSubmit = function(){

		var email = $scope.popUpEmailAddress;
		var confirmedEmail = $scope.popUpEmailAddressCofirm;

		//post request update user email

		console.log("submitting form");
	}



	

}]);
