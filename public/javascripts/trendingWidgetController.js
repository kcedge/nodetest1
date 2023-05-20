/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module("myApp").controller('trendingWidgetController', ['$scope', '$rootScope', '$http', 'ProfileService','FeedService', '$localStorage',  "ngAudio", function ($scope, $rootScope, $http, ProfileService,FeedService, $localStorage, ngAudio) {

	$scope.rightBarSortFiltersArray = ["Week", "Month", "All Time"];
	$scope.hello = "hello";
	$scope.filterPeriodTopUsersDropDown = 'Month';
	FeedService.getTopTrendingUsers().then(function(response){
		$scope.topTrendingUsers = response;
	});
	FeedService.getTipsFromMongo().then(function(response){
		$scope.tipArrayData = response;
	});
	
	$scope.getTipDescription = function(tip){
		var t = tip;
	
		return t.tipDescJson[1].tipDescription;
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

}]);
