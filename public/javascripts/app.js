/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



/* global angular */

// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp', ['angularFileUpload','ngStorage']);
 
myApp.directive('commentList', [
  function () {
    return {
      restrict: 'E',
      scope: {
        contentId: '=',
        contentTitle: '='
      },
      templateUrl: '/comments-list',
      controller: 'CommentsCtrl',
      controllerAs: 'comments'
    };
  }]);

myApp.service('CommentsService', ['$http', function ($http) {
	this.getComments = function (id) {
	    return $http.get('/getComments/' + id)
		    .success(function (data) {
			//console.log(data);
			angular.forEach(data, function (item) {
			    item.datePublished = new Date(item.datePublished);
			});
			this.commentData = data;
			return this.commentData;
		    })
		    .error(function (data, status) {
			console.log('ERROR: ' + status + '. We can\'t get the comments right now, please try again later');
			return "no data";
		    });
	};
	this.commentData = [];
    }]);