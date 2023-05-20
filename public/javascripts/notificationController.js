/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module("myApp").controller('notificationController',
 ['$scope', '$rootScope', '$http', 'ProfileService', '$localStorage',"FileUploader", "ngAudio", "NotificationService", 
 function ($scope, $rootScope, $http, ProfileService, $localStorage, FileUploader, ngAudio, NotificationService) {


	$scope.currentUser = ProfileService.getUserInfo();





	ProfileService.isAuthenticated(function (user) {
		$scope.user = user;
		if (user._id) {
			if (user.username == "kcedge") {
				$scope.adminAuth = true;
				$scope.authenticated = true;
			}
			if (user.userName) {
				$scope.authenticated = true;
				$scope.username = user.username;
			}

			if(user.notifications == null || user.notifications.length == 0){
				$scope.user.notifications = [{type:"notificationGeneral", message:"No recent notifications, woo!"}];
			}

			NotificationService.getNotifications($scope.user).then(function(response){
				$scope.user.notifications = response;
				$scope.notificationCount = $scope.getNotificationCount();
				
			})

			//ProfileService.setUserInfo(user);
		}
		
	});

	$scope.notificationActive = false;

	$scope.getNotificationCount = function(){
		var count =0;
		for(var i = 0; i < $scope.user.notifications.length; i++){
			if(!$scope.user.notifications[i].is_read){
				count++;
			}
		}
		return count;
	}
	$scope.notificationClicked = function(notification){
		var note = notification
		notification.is_read = true;
		NotificationService.updateNotification(notification).then(function(response){
			if(note.profileDetails[0]!= null && note.profileDetails[0].username){
				window.location.href = "/profile/"  + note.profileDetails[0].username;
			}
		});


	}



	$scope.notificationWidgetClick = function(){
		$scope.notificationActive = !$scope.notificationActive;
	}

	$scope.notificationWidgetActive = function(){
		return $scope.notificationActive;
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

	



}]);
