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
				if (user.profileDetails.length > 0) {
					$scope.userData = user.profileDetails[0];
				}
				else {
					$scope.userData = {};
				}

				$scope.profileImagesUploaded = ProfileService.getProfileImagesByType('profilePicture');
				$scope.profileBannerImagesUploaded = ProfileService.getProfileImagesByType('profileBanner');

				$scope.allProfileImages = ProfileService.getProfileImages();

				$scope.userData.interestTags = ProfileService.getProfileInterests();
				$scope.userData.roleTags = ProfileService.getProfileRoles();

				$scope.userNameSet = ($scope.userData.username != "" && $scope.userData.username != undefined);
				if (!$scope.userNameSet && user.local != undefined) {
					$scope.userData.username = user.local.username;
				}

				if ($scope.userNameSet) {

					$scope.userData.url = "/" + "profile" + "/" + $scope.userData.username;
					$scope.currentProfileUsername = $scope.userData.username;
				}



				if ($scope.userData.username == "kcedge") {
					$scope.adminAuth = true;
					$scope.authenticated = true;
				}

				PopUpService.setShowPopUp(user);

				if (window.location.href.includes('editing')) {
					PopUpService.openPopUp('profile');
					PopUpService.setPopUp(1)
					PopUpService.setPage(1)//change to use name
				}



			}
			else {
				$scope.displayErrorPopUp = true;
			}

		});

		$scope.addInterest = function () {
			var x = $scope.interestTags;
		}
		$scope.showPopUp = function (popUpName) {
			return PopUpService.getShowPopUp(popUpName);
		}


		$scope.changingUserName = function (input) {
			$scope.userData.url = '/profile/' + input.toLowerCase();;
		}
		$scope.userData = {};
		$scope.profileImageUploader = PopUpService.getProfileImageUploader();
		$scope.profileImagesUploaded = PopUpService.getProfileImagesUploaded();

		$scope.profileBannerImageUploader = PopUpService.getProfileBannerImageUploader();
		$scope.profileBannerImagesUploaded = PopUpService.getProfileBannerImagesUploaded();

		$scope.userData = {};
		$scope.popUpMessageForUser = "";
		$scope.links = [{ name: 'link1' }];


		window.onload = function () {

		}
		$scope.currentPopUpIndex = PopUpService.getPopUpIndex();
		$scope.currentPageIndex = PopUpService.getPageIndex();
		$scope.popUpTypes = PopUpService.getPopUpTypes();

		$scope.popUp = $scope.popUpTypes[$scope.currentPopUpIndex];
		$scope.popUpTotalPages = $scope.popUp.pages.length;
		$scope.popUpCurrentPageNumber = $scope.currentPageIndex + 1;
		$scope.linkTypes = ['Tik Tok','Soundcloud','Twitter','Instagram', 'Facebook', 'Other'];
		// $(window).resize(function () {
		//     styleSize();
		// });
		// var styleSize = function () {
		//     var height = $(window).height();
		//     $(".sampleListWrapper").height(height - 50 - 90); //For banner and filter menu
		// }
		$scope.userLinks = [];
		$scope.userLink = {};

		$scope.removeLinkProfile= function(link){
			var found = {};
			for(var i = 0; i < $scope.userData.links.length; i++){
				if($scope.userData.links[i] == link){
					found = $scope.userData.links.splice(i,1);
					break;
				}
			}
		}
		$scope.isOtherUrl = function(){
			if(typeof $scope.userLink.userLinkTypeSelected == 'string' && $scope.userLink.userLinkTypeSelected!=""){
				return $scope.userLink.userLinkTypeSelected == "Other"

			}
			return true;

		}
		$scope.linkTypeClicked = function(linkType){
			
			$scope.userLink.userLinkTypeSelected= linkType;
		}

		function isValidHttpUrl(string) {
			let url;
			try {
			  url = new URL(string);
			} catch (_) {
			  return false;
			}
			return url.protocol === "http:" || url.protocol === "https:";
		  }
		$scope.addLinkClicked = function(userLink){
			//validate link entry
			if(isValidHttpUrl(userLink.url)){

				if(typeof $scope.userData.links == 'string'){
					$scope.userData.links = JSON.parse($scope.userData.links);
				}

				if($scope.userData == null){
					$scope.userData = {};
				}
				if($scope.userData.links == null){
					$scope.userData.links = [];
				}
				$scope.userData.links.push(userLink);
				$scope.userLink = {};
				$scope.linkMessage = ""
			}
			else{
				$scope.linkMessage = "please enter a valid url"
			}

		}
	


		$scope.nextPage = function () {
			PopUpService.nextPage();
			$scope.currentPageIndex = PopUpService.getPageIndex();

		}
		$scope.backPage = function () {
			PopUpService.backPage();
			$scope.currentPageIndex = PopUpService.getPageIndex();

		}
		$scope.profileImageUploadClicked = function () {
			var x = 'upload lcicked';
		}

		$scope.showPage = function (pageName) {
			return PopUpService.showPage(pageName);

		}



		$scope.removeProfileImgClicked = function (profilePic) {

			var result = confirm("Want to delete?");
			if (result) {
				//Logic to delete the item


				var images = ProfileService.getProfileImagesByType('profilePicture');
				var updatedImages = images.filter(obj => {
					var objectidStr = obj.image;
					return (objectidStr != profilePic.image);
				});
				updatedImages = JSON.stringify(updatedImages);

				var req = {
					method: 'POST',
					url: '/deleteProfilePicture',
					headers: {
						'Content-Type': "application/json",
						'Access-Control-Request-Methods': 'POST',
						'Access-Control-Request-Headers': 'X-PINGOTHER, Content-Type',
					},
					data: {
						user: $scope.user,
						imgData: updatedImages
					}
				}

				$http(req).then(function success(response) {
					if (response.status == 200) {
						$scope.popUpMessageForUser = "Picture removed"
						$scope.popUpResponseData = response.data;
						//Dismiss popup for user
						//ProfileService.dismissClicked();
						window.location.href = '/profile/editing'
					}
				});
			}





		}

		$scope.colorChanged = function(){
			var $p = $(".profileColorBar").css('background-color', $scope.userData.profileColor);

		}

		$scope.dismissClicked = function(name){
			return PopUpService.dismissClicked(name);
		}

		$scope.popUpFormSubmit = function (exit) {
			//Email popup
			if (PopUpService.getCurrentPopUp() == 'email') {
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
							if(exit == 'exit'){
								window.location.href = '/profile';

							}
							//Dismiss popup for user
							//ProfileService.dismissClicked();

						}
					});
				}
			}
			//Profile popup 
			else if (PopUpService.getCurrentPopUp() == 'profile') {
				var usersInterests = [];
				var interestFound = false;
				if ($scope.userData.interestTags != null) {
					for (var j = 0; j < $scope.userData.interestTags.length; j++) {
						for (var i = 0; i < $scope.interests.length; i++) {
							interestFound = false;
							var str1 = $scope.interests[i].text.replace(/-|\s/g,"");
							var str2 = $scope.userData.interestTags[j].text.replace(/-|\s/g,"");

							if (str1 === str2) {
								usersInterests.push($scope.interests[i]);
								interestFound = true;
								break;
							}
						}
						if (!interestFound) {
							var newTag = {};
							newTag.text = $scope.userData.interestTags[j].text;
							newTag.createdBy = 'kcedge';
							interestFound = false;
							usersInterests.push(newTag);
						}
					}
				}

				$scope.userData.interests = JSON.stringify(usersInterests); //user interests here
				
				$scope.userData.roles = JSON.stringify($scope.userData.roleTags); //user roles here

				if(typeof $scope.userData.links != "string"){
					$scope.userData.links = JSON.stringify($scope.userData.links); //user roles here
				}

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
						if(exit == 'exit'){
							window.location.href = '/profile';
						}

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


		$scope.removeProfileBannerImgClicked = function (profileImg) {
			var result = confirm("Want to delete?");
			if (result) {
				var images = ProfileService.getProfileImagesByType('profileBanner');
				var updatedImages = images.filter(obj => {
					var objectidStr = obj.image;
					return (objectidStr != profileImg.image);
				});
				updatedImages = JSON.stringify(updatedImages);

				var req = {
					method: 'POST',
					url: '/deleteBannerProfilePicture',
					headers: {
						'Content-Type': "application/json",
						'Access-Control-Request-Methods': 'POST',
						'Access-Control-Request-Headers': 'X-PINGOTHER, Content-Type',
					},
					data: {
						user: $scope.user,
						imgData: updatedImages
					}
				}

				$http(req).then(function success(response) {
					if (response.status == 200) {
						$scope.popUpMessageForUser = "Picture removed"
						$scope.popUpResponseData = response.data;
						//Dismiss popup for user
						//ProfileService.dismissClicked();
						window.location.href = '/profile/editing'
					}
				});
			}
		}

		$("input#userNameInput").on({
			keydown: function (e) {
				if (e.which === 32)
					return false;
			},
			change: function () {
				this.value = this.value.replace(/\s/g, "");
			}
		});

		PopUpService.getApplicationInterests().then(function (results) {
			$scope.interests = results;
		});

		
		PopUpService.getApplicationRoles().then(function (results) {
			$scope.roles = results;
		});

		$scope.getIntrestTags = function (query) {
			var autoCompleteInterests = [];
			$scope.interests.filter(obj => {
				var nameStr = obj.text;
				if (nameStr.toLowerCase().indexOf(query.toLowerCase()) >= 0) {
					autoCompleteInterests.push({ text: obj.text })
				}
			});


			return autoCompleteInterests;
		}

		$scope.getRoleTags = function (query) {
			var autoCompleteInterests = [];
			$scope.roles.filter(obj => {
				var nameStr = obj.text;
				if (nameStr.toLowerCase().indexOf(query.toLowerCase()) >= 0) {
					autoCompleteInterests.push({ text: obj.text })
				}
			});


			return autoCompleteInterests;
		}

		

		// $scope.getIntrestTags = function (query) {
		// 	var autoCompleteInterests = $scope.interests.filter(obj => {
		// 		var objectidStr = obj.image;
		// 		return (obj.name.indexOf(query.toLowerCase()) >= 0);
		// 	});


		// 	return [
		// 		{ text: 'drums', icon: 'drumIcon',category:'music' },
		// 		{ text: 'piano' },
		// 		{ text: 'singing' },
		// 		{ text: 'dancing' },
		// 		{ text: 'music production' },
		// 	];
		// }




	}]);
