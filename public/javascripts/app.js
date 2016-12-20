/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



/* global angular */

// Declare app level module which depends on filters, and services ['ngAnimate']
var myApp = angular.module('myApp', ['angularFileUpload','ngStorage','ngAnimate']);
 
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




