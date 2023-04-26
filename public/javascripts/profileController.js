/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module("myApp").controller('ProfileCtrl', ['$scope', '$rootScope', '$http', 'ProfileService','PopUpService', 'CommentsService','FeedService', '$localStorage','FileUploader','UserDataService','NotificationService',
function ($scope, $rootScope, $http, ProfileService, PopUpService, CommentsService, FeedService, $localStorage, FileUploader, UserDataService,NotificationService) {


	var vm = this;
	var url_in = window.location.href;
	$scope.profileUserName = "";

	if (url_in.charAt(url_in.length - 1) == '/') {
		url_in = url_in.substring(0, url_in.length - 1);
	}

	var urlComponents = url_in.split("/");
	var urlEnd = urlComponents[urlComponents.length - 1]

	

	if(urlEnd!='profile' && urlEnd!='editing'){
		$scope.profileUserName = urlComponents[urlComponents.length - 1];
		//grab users profile we are viewing
		ProfileService.getProfileInfoByName($scope.profileUserName).then(function(response){
			$scope.userData = response;

			var $p = $(".profileColorBar").css('background-color', $scope.userData.profileColor);
			$scope.profileImagesUploaded = $scope.userData.profileImageJson;
			$scope.profileBannerImagesUploaded = $scope.userData.profileBannerImageJson;
			if(typeof $scope.userData.interests == 'string'){
				$scope.userData.interests =  JSON.parse($scope.userData.interests);
			}
			else{
				$scope.userData.interests =  $scope.userData.interests;
			}
			if(typeof $scope.userData.roles == 'string'){
				$scope.userData.roles =  JSON.parse($scope.userData.roles);
			}
			else{
				$scope.userData.roles =  $scope.userData.roles;
			}
			ProfileService.getFollowers($scope.userData).then(function(response){
				$scope.userData.followers = response;

				var numFollowers = 0;

				if($scope.userData.followers!=null){
					numFollowers = $scope.userData.followers.length;
				}
				$('.nav-tabs a[href="#tabFollowers"]').text('Followers');
				$('.nav-tabs a[href="#tabFollowers"]').append("<span class='circleProfileColor'>" + numFollowers + "</span>");

			});
			ProfileService.getFollowing($scope.userData).then(function(response){
				$scope.userData.followings = response;
				var numFollowing = 0;
				if($scope.userData.followings != null) {
					numFollowing = $scope.userData.followings.length;
				}

				$('.nav-tabs a[href="#tabFollowing"]').text('Following');
				$('.nav-tabs a[href="#tabFollowing"]').append("<span class='circleProfileColor'>" + numFollowing + "</span>");
				
			});

			
		});//
	}


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
		$scope.user = user;
		


		$scope.currentUser = user;
		$scope.currentProfileUsername = user.username;
	
		
		if($scope.profileUserName != ""){
			ProfileService.getProfileInfo($scope.profileUserName);//
		
		}
		else{
			if(user.profileDetails.length > 0){
				$scope.userData = user.profileDetails[0];
			}
			else{
				$scope.userData = {};
			}

			var $p = $(".profileColorBar").css('background-color', $scope.userData.profileColor);
			$scope.profileImagesUploaded = ProfileService.getProfileImagesByType('profilePicture');
			$scope.profileBannerImagesUploaded = ProfileService.getProfileImagesByType('profileBanner');
			$scope.userData.interestTags = ProfileService.getProfileInterests();
			$scope.userData.roleTags = ProfileService.getProfileRoles();
			ProfileService.getFollowers($scope.user.profileDetails[0]).then(function(response){
				$scope.userData.followers = response;

				var numFollowers = 0;

				if($scope.userData.followers!=null){
					numFollowers = $scope.userData.followers.length;
				}
				$('.nav-tabs a[href="#tabFollowers"]').text('Followers');
				$('.nav-tabs a[href="#tabFollowers"]').append("<span class='circleProfileColor'>" + numFollowers + "</span>");

			});
			ProfileService.getFollowing($scope.user.profileDetails[0]).then(function(response){
				$scope.userData.followings = response;
				var numFollowing = 0;
				if($scope.userData.followings != null) {
					numFollowing = $scope.userData.followings.length;
				}

				$('.nav-tabs a[href="#tabFollowing"]').text('Following');
				$('.nav-tabs a[href="#tabFollowing"]').append("<span class='circleProfileColor'>" + numFollowing + "</span>");
				
			});

		}

	

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

	///Follow actions
	$scope.userFollowing = function(){
		if($scope.user != null && $scope.user.profileDetails != null && $scope.user.profileDetails[0].followingArray){
			for(var i = 0; i < $scope.user.profileDetails[0].followingArray.length;i++){
				if($scope.user.profileDetails[0].followingArray[i]._id == $scope.userData._id){
					return true;
				}
			}
		}
		return false;

	}

	$scope.followClickedToggle = false;
	$scope.followingClicked = function(){
		if(window.confirm("unfollow user?")){
			ProfileService.unfollowUser($scope.user, $scope.userData, $scope.profileUserName).then(function(response) {
				console.log(response);
				$scope.followClickedToggle = false;
				window.location.reload(); 
			})
		}
		else{

		}
	}
	$scope.followClicked = function(){
		ProfileService.followUser($scope.user, $scope.userData, $scope.profileUserName).then(function(response) {
			
			console.log(response);
			$scope.followClickedToggle = true;
			// window.location.reload(); 


		})
	}




	$scope.profileEditLinksClicked = function(){
		PopUpService.openPopUp('profile', 'profileLinks');
	}

	FeedService.getTipsFromMongo().then(function(response){
		$scope.feedArrayData = response;
	})
	$scope.linkClicked = function(link){
		window.open(
			link.url,
			'_blank' // <- This is what makes it open in a new window.
		  );
	}

	$scope.editProfileClicked = function(){
		PopUpService.openPopUp('profile');
	}
    $scope.showItem = function(item){
		return true;//feed service
	}


	
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
	    
	    window.location.href = '/profile/'+user.username;
	    
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

	$scope.feed = 'myFeed';

	$scope.feedShow = function(feedName){
		return feedName == $scope.feed;
	}
	$scope.feedAddClicked = function(){
		if($scope.feed != 'add'){
			$scope.feed = 'add';//MOVE TO POPUP
			$scope.feed = 'myFeed';

		}
		else{
			$scope.feed = 'myFeed';
		}
	}
	$scope.myFeedClicked = function(){
		if($scope.feed != 'myFeed'){
			$scope.feed = 'myFeed';
		}
		else{
			$scope.feed = 'myFeed';
		}
	}
	$scope.trendingClicked = function(){
		$scope.feed = 'trending';
	}

	$scope.getTags = function (query) {
		var autoCompleteInterests = [];
		$scope.userData.interests.filter(obj => {
			var nameStr = obj.text;
			if (nameStr.toLowerCase().indexOf(query.toLowerCase()) >= 0) {
				autoCompleteInterests.push({ text: obj.text })
			}
		});


		return autoCompleteInterests;
	}






	///Image uploaders
	
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


		var images = $scope.profileImagesUploaded.concat($scope.profileBannerImagesUploaded);


	    var profileImageJson = JSON.stringify(images);
	    ProfileService.postProfileImage($scope.currentUser._id,profileImageJson)
	   // numberOfImages++;

	};
	profileImageUploader.onCompleteAll = function () {
	    console.info('onCompleteAll');
	};

    }]);

