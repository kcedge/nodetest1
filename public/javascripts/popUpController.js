/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module("myApp").controller('popUpController', ['$scope', '$rootScope', '$http', 'ProfileService', 'PopUpService', '$localStorage', "FileUploader", "ngAudio",
	function ($scope, $rootScope, $http, ProfileService, PopUpService, $localStorage, FileUploader, ngAudio) {

		ProfileService.isAuthenticated(function (user) {
			if (user._id) {
				$scope.userFound = true;
				
				$scope.user = user;
				$scope.currentUser = user;
				$scope.userData = user.profileDetails[0];
				
				$scope.profileImagesUploaded = ProfileService.getProfileImages('profilePicture');
				$scope.profileBannerImagesUploaded = ProfileService.getProfileImages('profileBanner');

				$scope.userNameSet = ($scope.userData.username != "" && $scope.userData.username != undefined);
				if(!$scope.userNameSet && user.local!=undefined)
				{
					$scope.userData.username = user.local.username;
				}

				if($scope.userNameSet){
					
					$scope.userData.url = "/" + "profile" + "/" + $scope.userData.username;
					$scope.currentProfileUsername = $scope.userData.username;
				}
			


				if ($scope.userData.username == "kcedge") {
					$scope.adminAuth = true;
					$scope.authenticated = true;
				}
			
			}
			else{
				$scope.displayErrorPopUp = true;
			}

		});

		$scope.changingUserName = function(input){
			$scope.userData.url = '/profile/'+input.toLowerCase();;
		}
		$scope.userData = {};
		$scope.profileImageUploader = PopUpService.getProfileImageUploader();
		$scope.profileImagesUploaded = PopUpService.getProfileImagesUploaded();

		$scope.profileBannerImageUploader = PopUpService.getProfileBannerImageUploader();
		$scope.profileBannerImagesUploaded = PopUpService.getProfileBannerImagesUploaded();

		$scope.userData = {};
		$scope.popUpMessageForUser = "";

		window.onload = function () {

		}
		$scope.currentPopUpIndex = 1;
		$scope.currentPageIndex = 0;
		$scope.popUpTypes = [{ name: "email", pages: [{ name: "email" }] }, { name: "profile", pages: [{ pageName: "profileInit" }, { pageName: "profileImgr" }] }];

		$scope.popUp = $scope.popUpTypes[$scope.currentPopUpIndex];
		$scope.popUpTotalPages = $scope.popUp.pages.length;
		$scope.popUpCurrentPageNumber = $scope.currentPageIndex + 1;

		// $(window).resize(function () {
		//     styleSize();
		// });
		// var styleSize = function () {
		//     var height = $(window).height();
		//     $(".sampleListWrapper").height(height - 50 - 90); //For banner and filter menu
		// }


		$scope.nextPage = function () {
			if ($scope.currentPageIndex != $scope.popUp.pages.length - 1) {
				$scope.currentPageIndex++;
			}
		}
		$scope.backPage = function () {
			if ($scope.currentPageIndex != 0) {
				$scope.currentPageIndex--;
			}
		}
		$scope.profileImageUploadClicked = function () {
			var x = 'upload lcicked';
		}

		$scope.showPage = function (pageName) {

			var popUpPageName = $scope.popUpTypes[$scope.currentPopUpIndex].pages[$scope.currentPageIndex].pageName;
			if (pageName == popUpPageName) {
				return true;
			}
			else {
				return false;
			}
		}

		$scope.showPopUp = function (popUpName) {
			if (ProfileService.getShowPopUp(popUpName)) {
				return true;
			}
			else {
				return false
			}
		}

		$scope.removeProfileImgClicked = function (profilePic) {
			var x = profilePic;
			console.log("removing profile pic..." + profilePic)
		}

		$scope.dismissClicked = function () {
			ProfileService.dismissClicked();
		}
		$scope.popUpFormSubmit = function () {

			if ($scope.popUp.name == 'email') {
				var email = $scope.popUpEmailAddress;
				var confirmedEmail = $scope.popUpEmailAddressCofirm;

				if (email == confirmedEmail) {
					var req = {
						method: 'POST',
						url: '/popUpSubmit',
						headers: {
							'Content-Type': "application/json",
							'Access-Control-Request-Methods': 'POST',
							'Access-Control-Request-Headers': 'X-PINGOTHER, Content-Type',
						},
						data: {
							user: $scope.currentUser,
							email: email
						}
					}

					$http(req).then(function success(response) {
						if (response.status == 200) {
							$scope.popUpMessageForUser = "Email updated successfully.  Thank You"
							$scope.popUpResponseData = response.data;
							//Dismiss popup for user
							//ProfileService.dismissClicked();

						}
					});
				}
			}
			else if ($scope.popUp.name == 'profile') {
				var req = {
					method: 'POST',
					url: '/popUpProfileSubmit',
					headers: {
						'Content-Type': "application/json",
						'Access-Control-Request-Methods': 'POST',
						'Access-Control-Request-Headers': 'X-PINGOTHER, Content-Type',
					},
					data: {
						user: $scope.currentUser,
						userData: $scope.userData

					}
				}

				$http(req).then(function success(response) {
					if (response.status == 200) {
						$scope.popUpMessageForUser = "Profile updated successfully.  Thank You"
						$scope.popUpResponseData = response.data;
						//Dismiss popup for user
						//ProfileService.dismissClicked();

					}
				});
			}


			//post request update user email

			console.log("submitting form");
		}

		$scope.profileBannerUploadClicked = function () {
			PopUpService.setImageUploadingType('profileBanner')
			$scope.imageUploadingType = 'profileBanner';
			$scope.profileBannerImageUploader.uploadAll();
		};

		$scope.profileUploadClicked = function () {
			PopUpService.setImageUploadingType('profilePicture')

			$scope.imageUploadingType = 'profilePicture';
			$scope.profileImageUploader.uploadAll()
		};

		$scope.profileImageUploadClicked = function () {
			PopUpService.setImageUploadingType('profilePicture')
			document.getElementById('selectedFile').click();
		}
		$scope.profileBannerImageUploadClicked = function () {
			PopUpService.setImageUploadingType('profileBanner')
			document.getElementById('selectedBannerFile').click();
		}

		$("input#userNameInput").on({
			keydown: function(e) {
			  if (e.which === 32)
				return false;
			},
			change: function() {
			  this.value = this.value.replace(/\s/g, "");
			}
		  });

		  $scope.links = [{name: 'link1'}];
		


	}]);
