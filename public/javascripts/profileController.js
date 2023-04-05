/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module("myApp").controller('ProfileCtrl', ['$scope', '$rootScope', '$http', 'ProfileService', 'CommentsService', '$localStorage','FileUploader','UserDataService', 
function ($scope, $rootScope, $http, ProfileService, CommentsService, $localStorage, FileUploader, UserDataService) {


	var vm = this;


	if($localStorage.user == undefined){
		var req = {
			method: 'GET',
			url: '/getUserData',
			headers: {
				'Content-Type': "application/json"
			},
			data: {
			
			}
		}

		$http(req).then(function success(response) {
			$scope.user = response.data.user;
			$scope.displayName = '';
			$scope.firstName = '';
			$scope.city = '';
			//$scope.state = '';
			$scope.country = '';
			$scope.bio = '';
			$scope.soundCloud = '';
			$scope.twitter = '';
			$scope.facebook = '';

		}, function failure(response) {
			vm.authres = response.data;

		});
	}
	else{
		$scope.user = $localStorage.user;
	}

	
	$scope.currentTip = {} // Current Tip Previewing



	//vm.userInfo = UserDataService.getFormData();



	$scope.totalpoints = 0;
	$scope.tipsSubmitted = [];
	$scope.tipsFavorited = [];
	$scope.rightBarSortFiltersArray = ["Week", "Month", "All Time"];
	$scope.editProfileToggle = false;
	$scope.imageUploadBannerToggle = false;
	$scope.imageUploadProfileImage = false;
	$scope.bannerImagesUploaded = [];
	$scope.profileImagesUploaded = [];
	
	$scope.displayName = '';
	$scope.firstName = '';
	$scope.city = '';
	//$scope.state = '';
	$scope.country = '';
	$scope.bio = '';
	$scope.soundCloud = '';
	$scope.twitter = '';
	$scope.facebook = '';
	$scope.filterPeriodTopTipsDropDown = 'Month';
	$scope.filterPeriodTopUsersDropDown = 'Month';
	
	$scope.navBarRightFilterClick = function(sortFilter){
	    
	}

	$scope.currentUser = {};
	
	ProfileService.isAuthenticated(function (user) {
		$scope.currentUser = user;
		$scope.currentProfileUsername = user.userName;
		// set up user profile
		$scope.$storage = $localStorage;
		$scope.$storage.userSignedIn = true;
		$scope.$storage.username = user.userName;;

		if (user.userName == "kcedge") {
			$scope.adminAuth = true;
			$scope.authenticated = true;
		}
		if (user.userName) {
			$scope.authenticated = true;
			$scope.username = user.userName;
		}
		else{
			$scope.authenticated = true;
			//no username yet, just google display name
			$scope.username = user.name;
		}

	});
	
	var setTotalPoints = function () {
	    $scope.tipsSubmitted.forEach(function (tip) {
		$scope.totalpoints += tip.tipPoints;
	    });
	    ProfileService.postTotalPoints($scope.username ,$scope.totalpoints)
	}
	var convertTipDataToJsonArray = function (tipArrayData) {
	    for (var i = 0; i < tipArrayData.length; i++) {
		if (tipArrayData[i].hasOwnProperty("tipDescJson")) {
		    tipArrayData[i].tipDescJson = JSON.parse(tipArrayData[i].tipDescJson);
		}
		if (tipArrayData[i].hasOwnProperty("dawJson")) {
		    tipArrayData[i].dawJson = JSON.parse(tipArrayData[i].dawJson);
		}
		if (tipArrayData[i].hasOwnProperty("genreJson")) {
		    tipArrayData[i].genreJson = JSON.parse(tipArrayData[i].genreJson);
		}
		if (tipArrayData[i].hasOwnProperty("imageDataJson")) {
		    tipArrayData[i].imageDataJson = JSON.parse(tipArrayData[i].imageDataJson);
		}
		if (tipArrayData[i].hasOwnProperty("tipTypeJson")) {
		    tipArrayData[i].tipTypeJson = JSON.parse(tipArrayData[i].tipTypeJson);
		}
		if (tipArrayData[i].hasOwnProperty("videoLinkJson")) {
		    tipArrayData[i].videoLinkJson = JSON.parse(tipArrayData[i].videoLinkJson);
		}
		if (tipArrayData[i].hasOwnProperty("filtersJson")) {
		    tipArrayData[i].filtersJson = JSON.parse(tipArrayData[i].filtersJson);
		}
		if (tipArrayData[i].hasOwnProperty("vstJson")) {
		    tipArrayData[i].vstJson = JSON.parse(tipArrayData[i].vstJson);
		}
		
		

	    }
	    return tipArrayData;
	}
	var getTips = function (tipJson) {
	    ProfileService.getTipsByJsonArray(tipJson)
		    .then(function (response) {
			$scope.lovedTipsData = convertTipDataToJsonArray(response.data);
			$scope.numberOfTipsSaved = $scope.lovedTipsData.length;
		    }).catch(function (data, status) {
		console.log('ERROR: ' + status + '. We can\'t get the profile right now, please try again later');

	    });
	}
	var convertProfileDataToJson = function (profileArrayData) {
	    for (var i = 0; i < profileArrayData.length; i++) {
		if (profileArrayData[i].hasOwnProperty("bannerImageJson")) {
		    profileArrayData[i].bannerImageJson = JSON.parse(profileArrayData[i].bannerImageJson);
		}
		if (profileArrayData[i].hasOwnProperty("dislikedTipsJson")) {
		    profileArrayData[i].dislikedTipsJson = JSON.parse(profileArrayData[i].dislikedTipsJson);
		}
		if (profileArrayData[i].hasOwnProperty("likedTipsJson")) {
		    profileArrayData[i].likedTipsJson = JSON.parse(profileArrayData[i].likedTipsJson);
		}
		if (profileArrayData[i].hasOwnProperty("lovedTipsJson")) {
		    profileArrayData[i].lovedTipsJson = JSON.parse(profileArrayData[i].lovedTipsJson);
		}
		if (profileArrayData[i].hasOwnProperty("profileImageJson")) {
		    profileArrayData[i].profileImageJson = JSON.parse(profileArrayData[i].profileImageJson);
		}
		if (profileArrayData[i].hasOwnProperty("profileMetaDataJson")) {
		    profileArrayData[i].profileMetaDataJson = JSON.parse(profileArrayData[i].profileMetaDataJson);
		}
//		if (profileArrayData[i].hasOwnProperty("submittedTips")) {
//		    profileArrayData[i].submittedTips = JSON.parse(submittedTips[i].submittedTips);
//		}
		
	    }
	    return profileArrayData;
	}
	ProfileService.getTopUsers($scope.filterPeriodTopUsersDropDown)
		.then(function (response) {
		    $scope.topUsers = convertProfileDataToJson(response.data);
		  
		    //$scope.$apply();

		    //$scope.parentobj.comments = response.data;
		});
	//ProfileService.getTopUsers($scope.filterPeriodTopUsersDropDown);

	function getProfileData(){
		ProfileService.getProfileInfo($scope.currentUser.username)
			.then(function (response) {
				$scope.profileInfo = response.data;
				if ($scope.profileInfo[0].bannerImageJson) {
				$scope.profileInfo.bannerImageJson = JSON.parse($scope.profileInfo[0].bannerImageJson);
				}
				if ($scope.profileInfo[0].profileImageJson) {
				$scope.profileInfo.profileImageJson = JSON.parse($scope.profileInfo[0].profileImageJson);
				}
				if ($scope.profileInfo[0].profileMetaDataJson) {
				$scope.profileInfo.profileMetaDataJson = JSON.parse($scope.profileInfo[0].profileMetaDataJson);
				}
				if ($scope.profileInfo[0].lovedTipsJson) {
				getTips($scope.profileInfo[0].lovedTipsJson);
				$scope.lovedTips = JSON.parse($scope.profileInfo[0].lovedTipsJson);
				$scope.likedTips = JSON.parse($scope.profileInfo[0].likedTipsJson);
				$scope.dislikedTips = JSON.parse($scope.profileInfo[0].dislikedTipsJson);
				}
			
				//$scope.$apply();

				//$scope.parentobj.comments = response.data;
			});
	}

	ProfileService.getTipsSubmitted($scope.currentUser.username)
		.then(function (response) {
		    response.data = convertTipDataToJsonArray(response.data);
		    $scope.tipsSubmitted = response.data;
		    $scope.numberOfTipsSubmitted = response.data.length;


		    if ($scope.tipsSubmitted[0]) {
			$scope.updateTip($scope.tipsSubmitted[0]);
		    }
		    setTotalPoints();//saves to database
		    //$scope.parentobj.comments = response.data;
		});
	ProfileService.getTopTips()
		.then(function (response) {
		    response.data = convertTipDataToJsonArray(response.data);
		    $scope.topTips = response.data;
		    $scope.topTips.forEach(function (currentValue, index, array) {
			$scope[index].hoverRightActive = false;
		    });


		    $scope.numberTopTips = response.data.length;
		    //$scope.parentobj.comments = response.data;
		});
	ProfileService.getRecentTips()
		.then(function (response) {
		    response.data = convertTipDataToJsonArray(response.data);
		    $scope.recentTips = response.data;
		    $scope.numberRecentTips = response.data.length;
		    //$scope.parentobj.comments = response.data;
		});
	//Update comments
//	CommentsService.getCommentsWithTipId($scope.tip._id).then(function (response) {
//
//		var comment = response.data;
//		    //setTipComments();
//	});
	$scope.setReplyComments = function (tip, comment) {
	    if (tip.comments) {
		for (var i = 0; i < $scope.currentTip.comments.length; i++) {
		    var comment = $scope.currentTip.comments[i];
		}

	    }
	}
	//SET COMMENTS UP
	$scope.getComments = function (tipId) {
	    $scope.setReplyComments(tipId);
	    return $scope.currentTip.comments;

	}
	$scope.loveButtonClicked = function () {
	    var test = $scope.currentTip;
	}
	$scope.userNavBarClicked = function(user){
	    $scope.userActive = user;
	    window.location.href = '/profile/'+$scope.userActive.userName;
	    
	}

	$scope.navBarHoverMouseOver = function (tip) {

	    tip.hoverActive = true;
	}
	$scope.rightBarWidgetMouseOver = function (tip) {
	    tip.hoverRightActive = true;

	}
	$scope.navBarHoverMouseLeave = function (tip) {
	    $("#navBarBottomRow" + tip._id).removeClass('animated');
	    tip.hoverActive = false;
	}
	$scope.navBarHoverRightMouseLeave = function (tip) {
	    // $("#navBarBottomRow"+tip._id).removeClass('animated');
	    tip.hoverRightActive = false;
	}

//	ProfileService.getTipsFavorited($scope.username)
//		.then(function (response) {
//		    response.data = convertTipDataToJsonArray(response.data);
//		    $scope.tipsSubmitted = response.data;
//		    $scope.numberOfTipsSubmitted = response.data.length;
//		    if($scope.tipsSubmitted[0]){
//			    $scope.updateTip($scope.tipsSubmitted[0]);}
//		    setTotalPoints();
//		    //$scope.parentobj.comments = response.data;
//		});

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

	$scope.updateTip = function (tip) {
	    $scope.currentTip = tip;
	    $scope.tipTitle = tip.tipTitle;
	    $scope.currentTipId = tip._id;
	    $scope.currentTipPoints = tip.points;
	    $scope.tipBodyArray = [];
	    $scope.submittedBy = tip.submittedBy;

	    if (tip.hasOwnProperty("tipDescJson")) {
		var descJson = tip.tipDescJson;
		var imgJson = tip.imageDataJson;
		for (var i = 1; i < descJson.length; i++) {
		    var tipDescriptionLocal = descJson[i].tipDescription;
		    var submittedByLocal = tip.submittedBy;
		    var imageFileNameLocal = "";
		    if (imgJson[i - 1]) {
			imageFileNameLocal = imgJson[i - 1].newFileName;
		    }

		    if (!runningProduction && imageFileNameLocal) {
			imageFileNameLocal = "resources/images/" + imageFileNameLocal;
		    }
		    $scope.hasImage = (imageFileNameLocal != "" && imageFileNameLocal);
		    $scope.tipBodyArray.push({tipDescriptionNumber: i, tipDescription: tipDescriptionLocal, imageFileName: imageFileNameLocal, hasImage: imageFileNameLocal, submittedBy: submittedByLocal})
		}
	    }
	    $scope.getImageSrc = function (tip, imgIndex) {

		if (tip && tip.imageDataJson.length) {
		    if (imgIndex < tip.imageDataJson.length && tip.imageDataJson.length != 0) {
			var tipImg = tip.imageDataJson[imgIndex];

			if (runningProduction) {
			    return tipImg['imageName'];
			}
			else {
			    return "resources/images/" + tipImg['imageName'];
			}
		    }
		    else
			return "";
		}
		else
		    return ""
	    }
	    



//	    $('html, body').animate({
//		scrollTop: $("#tipWrapper").offset().top
//	    }, 1000);
	};
	
	$scope.editProfileSave = function () {
		var displayName = $scope.displayNameInput;
		var firstName = $scope.firstNameInput;
		var lastName = $scope.lastNameInput;
		var city = $scope.cityInput;
		var country = $scope.countryInput;
		var bio = $scope.bioInput;
		var soundCloud = $scope.soundCloudInput;
		var twitterInput = $scope.twitterInput;
		
		
		var profileMetaData = {displayName:displayName,
		    firstName:firstName,
		    lastName:lastName,
		    city:city,
		    country:country,
		    bio:bio,
		    soundCloud:soundCloud,
		    twitterInput:twitterInput	
		}
		
		var profileMetaDataJson = JSON.stringify(profileMetaData);
		
	        ProfileService.postProfileMetaData($scope.currentUser.username,profileMetaDataJson);

		



	};
	
	var uploader = $scope.uploader = new FileUploader({
	    url: '/uploadImage'
	});

	// FILTERS

	uploader.filters.push({
	    name: 'customFilter',
	    fn: function (item /*{File|FileLikeObject}*/, options) {
		return this.queue.length < 2;
	    }
	});

	uploader.filters.push({
	    name: 'sizeFilter',
	    fn: function (item /*{File|FileLikeObject}*/, options) {
		console.log(item);
		return item.size <= 10000000;
	    }
	});


	// CALLBACKS
	$scope.uploadedImages = [];
	var numberOfImages = 0;

	uploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) {
	    $scope.fileErrorMessage = "";
	    if (filter.name = 'sizeFilter') {
		$scope.fileErrorMessage = "File too big. Upload file limit 1 MB";
	    }
	    console.info('onWhenAddingFileFailed', item, filter, options);
	};
	uploader.onAfterAddingFile = function (fileItem) {
	    $scope.fileErrorMessage = "";
	    console.info('onAfterAddingFile', fileItem);
	};
	uploader.onAfterAddingAll = function (addedFileItems) {
	    console.info('onAfterAddingAll', addedFileItems);
	};
	uploader.onBeforeUploadItem = function (item) {
	    console.info('onBeforeUploadItem', item);
	};
	uploader.onProgressItem = function (fileItem, progress) {
	    console.info('onProgressItem', fileItem, progress);
	};
	uploader.onProgressAll = function (progress) {
	    console.info('onProgressAll', progress);
	};
	uploader.onSuccessItem = function (fileItem, response, status, headers) {
	    console.info('onSuccessItem', fileItem, response, status, headers);

	};
	uploader.onErrorItem = function (fileItem, response, status, headers) {
	    console.info('onErrorItem', fileItem, response, status, headers);
	};
	uploader.onCancelItem = function (fileItem, response, status, headers) {
	    console.info('onCancelItem', fileItem, response, status, headers);
	};
	uploader.onCompleteItem = function (fileItem, response, status, headers) {
	    console.info('onCompleteItem', fileItem, response, status, headers);

	    var imagePath = response;
	  
	    if (!runningProduction) {
		imagePath = "resources/images/" + response;
	    }
	    $scope.bannerImagesUploaded.push({image:imagePath,isBanner:true});
	    //$sc
	    $scope.queue = [];
	    var bannerImageJson = JSON.stringify($scope.bannerImagesUploaded);
	    ProfileService.postBannerImage($scope.currentUser.username,bannerImageJson)
	   // numberOfImages++;

	};
	uploader.onCompleteAll = function () {
	    console.info('onCompleteAll');
	};
	
	
	
	
	
	var profileImageUploader = $scope.profileImageUploader = new FileUploader({
	    url: '/uploadImage'
	});

	// FILTERS

	profileImageUploader.filters.push({
	    name: 'customFilter',
	    fn: function (item /*{File|FileLikeObject}*/, options) {
		return this.queue.length < 2;
	    }
	});

	profileImageUploader.filters.push({
	    name: 'sizeFilter',
	    fn: function (item /*{File|FileLikeObject}*/, options) {
		console.log(item);
		return item.size <= 10000000;
	    }
	});


	// CALLBACKS
	//$scope.uploadedImages = [];
	//var numberOfImages = 0;

	profileImageUploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) {
	    $scope.fileErrorMessage = "";
	    if (filter.name = 'sizeFilter') {
		$scope.fileErrorMessage = "File too big. Upload file limit 1 MB";
	    }
	    console.info('onWhenAddingFileFailed', item, filter, options);
	};
	profileImageUploader.onAfterAddingFile = function (fileItem) {
	    $scope.fileErrorMessage = "";
	    console.info('onAfterAddingFile', fileItem);
	};
	profileImageUploader.onAfterAddingAll = function (addedFileItems) {
	    console.info('onAfterAddingAll', addedFileItems);
	};
	profileImageUploader.onBeforeUploadItem = function (item) {
	    console.info('onBeforeUploadItem', item);
	};
	profileImageUploader.onProgressItem = function (fileItem, progress) {
	    console.info('onProgressItem', fileItem, progress);
	};
	profileImageUploader.onProgressAll = function (progress) {
	    console.info('onProgressAll', progress);
	};
	profileImageUploader.onSuccessItem = function (fileItem, response, status, headers) {
	    console.info('onSuccessItem', fileItem, response, status, headers);

	};
	profileImageUploader.onErrorItem = function (fileItem, response, status, headers) {
	    console.info('onErrorItem', fileItem, response, status, headers);
	};
	profileImageUploader.onCancelItem = function (fileItem, response, status, headers) {
	    console.info('onCancelItem', fileItem, response, status, headers);
	};
	profileImageUploader.onCompleteItem = function (fileItem, response, status, headers) {
	    console.info('onCompleteItem', fileItem, response, status, headers);

	    var imagePath = response;
	  
	    if (!runningProduction) {
		imagePath = "resources/images/" + response;
	    }
	    $scope.profileImagesUploaded.push({image:imagePath,isProfile:true});
	    //$sc
	    $scope.queue = [];
	    var profileImageJson = JSON.stringify($scope.profileImagesUploaded);
	    ProfileService.postProfileImage($scope.currentUser.username,profileImageJson)
	   // numberOfImages++;

	};
	profileImageUploader.onCompleteAll = function () {
	    console.info('onCompleteAll');
	};

    }]);

