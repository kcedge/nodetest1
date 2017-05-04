/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module("myApp").controller('ProfileCtrl', ['$scope', '$rootScope', '$http', 'ProfileService', 'CommentsService', '$localStorage', function ($scope, $rootScope, $http, ProfileService, CommentsService, $localStorage) {

	$scope.$storage = $localStorage.$default({
	    username: "",
	    userSignedIn: false
	});
	$scope.currentTip = {} // Current Tip Previewing

	var username = $("#userName").html();
	$scope.username = username;
	$scope.$storage = $localStorage;
	$scope.$storage.userSignedIn = true;
	$scope.$storage.username = username;
	$scope.totalpoints = 0;
	$scope.tipsSubmitted = [];
	$scope.tipsFavorited = [];
	$scope.rightBarSortFiltersArray = ["Week", "Month", "All Time"];

	var setTotalPoints = function () {
	    $scope.tipsSubmitted.forEach(function (tip) {
		$scope.totalpoints += tip.tipPoints;
	    });
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
		    response.data = convertTipDataToJsonArray(response.data);
		    $scope.tipsSubmitted = response.data;
		    $scope.numberOfTipsSubmitted = response.data.length;


		    if ($scope.tipsSubmitted[0]) {
			$scope.updateTip($scope.tipsSubmitted[0]);
		    }
		    setTotalPoints();
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

    }]);

