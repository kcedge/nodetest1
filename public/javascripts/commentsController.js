/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("myApp").controller('CommentsCtrl', ['$scope','$rootScope', '$http', 'CommentsService', '$localStorage', function ($scope,$rootScope, $http, CommentsService, $localStorage) {
      
	CommentsService.getComments($scope.contentId)
		.then(function (response) {
		    //$scope.parentobj.comments = response.data;
		});
	
	$scope.postACommentClicked = function () {
	    console.log('Posting a comment');
	    var username = $localStorage.username;
	    var comment = $scope.postCommentAdd;
	    $scope.postCommentAdd = "";
	    var tipId = $("#currentTipId").html();
	    console.log(username);
	    console.log(comment);
	    var req = {
		method: 'POST',
		url: '/postComment',
		headers: {
		    'Content-Type': "application/json"
		},
		data: {username: username,
		    comment: comment,
		    tip_id: tipId,
		    date_published:new Date(),
		    commentPoints:0,
		    parentComment_id:-1}
	    }
	    $http(req).then(function success(response) {
		console.log("added comment, with tip_id:")
		console.log(response);
		CommentsService.getComments(tipId).then(function (response) {
		    $scope.$parent.comments = response.data;
		});
	    }, function failure(response) {
		$scope.submitMessage = "Failure"
		$scope.responseData = response.data;

	    });
	}
	$scope.replyCommentSavedClicked = function (parentComment) {
	    console.log('Replying to comment');
	    var username = $localStorage.username;
	    var selectorReply = "#commentReply" + parentComment._id;
	    var comment = $(selectorReply).val();
	    var tipId = $("#currentTipId").html();
	    var parentCommentId = parentComment._id;
	    console.log(username);
	    console.log(comment);
	    var req = {
		method: 'POST',
		url: '/postComment',
		headers: {
		    'Content-Type': "application/json"
		},
		data: {username: username,
		    comment: comment,
		    tip_id: tipId,
		    date_published:new Date(),
		    commentPoints:0,
		    parentComment_id:parentCommentId}
	    }
	    $http(req).then(function success(response) {
		console.log("added reply comment, with tip_id:")
		console.log(response);
		CommentsService.getComments(tipId).then(function (response) {
		    $scope.$parent.comments = response.data;
		});
	    }, function failure(response) {
		$scope.submitMessage = "Failure"
		$scope.responseData = response.data;

	    });
	}
	$scope.getPoints = function(comment){
	    if(comment.commentPoints == 1 || comment.commentPoints == -1){
		return comment.commentPoints + " point"
	    }
	    return comment.commentPoints + " points";
	}
	$scope.getTime = function (comment) {
	    var now = new Date();
	    function parseDate(input) {
		var parts = input.match(/(\d+)/g);
		// new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
		return new Date(parts[0], parts[1] - 1, parts[2],parts[3],parts[4],parts[5]); // months are 0-based
	    }
	    var datePublished = parseDate(comment.datePublished).getTime();
	    var difference =  ((now.getTime() - datePublished)/(3600000));
	    if(difference < 24 && difference > 0){
		if(difference < 1){
		    if(difference < .2){
			return "a few minutes ago"
		    }
		    else if(difference >= .2 && difference < .4){
			return "15 minutes ago";
		    }
		    else if(difference <= .7 && difference >= .4){
			return "30 minutes ago";
		    }
		    else{
			return "1 hour ago";
		    }
		}
		else{
		    return Math.round(difference) + " hours ago";
		}
		
	    }
	    else{
		var days = Math.round(difference / 24);
		return days +" days ago";
	    }
	    
	    
	}
	$scope.commentUpVote = function(comment){   
	    var commentId = comment._id;
	    var updatedPoints = comment.commentPoints + 1;
	    var req = {
		method: 'PUT',
		url: '/commentUpdatePoints',
		headers: {
		    'Content-Type': "application/json"
		},
		data: {commentId: commentId,
		    commentPoints: updatedPoints
		}
	    }

	    $http(req).then(function success(response) {
		$scope.submitMessage = "Success"
		comment.commentPoints++;

	    }, function failure(response) {
		$scope.submitMessage = "Failure"
		$scope.responseData = response.data;
	    });
	}
	$scope.commentDownVote = function(comment){
	    var commentId = comment._id;
	    var updatedPoints = comment.commentPoints - 1;
	    var req = {
		method: 'PUT',
		url: '/commentUpdatePoints',
		headers: {
		    'Content-Type': "application/json"
		},
		data: {commentId: commentId,
		    commentPoints: updatedPoints
		}
	    }

	    $http(req).then(function success(response) {
		$scope.submitMessage = "Success"
		comment.commentPoints--;

	    }, function failure(response) {
		$scope.submitMessage = "Failure"
		$scope.responseData = response.data;
	    });
	    
	}
	
	
	$scope.replyCommentClicked = function(comment){
	    comment.replyCommentToggle = !comment.replyCommentToggle; 
	}
	$scope.showReplyComment = function(comment){
	    if(comment.hasOwnProperty('replyCommentToggle')){
		return comment.replyCommentToggle;
	    }
	    else{
		comment.replyCommentToggle = false;
		return comment.replyCommentToggle;
	    }
	    
	}
	$scope.isTopLevelComment = function(comment){
	    return comment.parentComment_id == -1;
	}
	
	
	
    }]);

