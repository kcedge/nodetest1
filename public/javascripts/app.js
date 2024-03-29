/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



/* global angular */



var myApp = angular.module('myApp' , ['angularFileUpload','ngStorage','ngAnimate','ngTagsInput','ngAudio', 'countrySelect']);
 
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
  
  myApp.directive('samplesList', [
  function () {
    return {
      restrict: 'E',
      scope: {
        contentId: '=',
        contentTitle: '='
      },
      templateUrl: '/samples-list',
      controller: 'samplesCtrl',
      controllerAs: 'samples'
    };
  }]);
  myApp.directive('packsList', [
  function () {
    return {
      restrict: 'E',
      scope: {
        contentId: '=',
        contentTitle: '='
      },
      templateUrl: '/packs-list',
      controller: 'packsCtrl',
      controllerAs: 'packs'
    };
  }]);
  myApp.directive('tooltip', function(){
    return {
        restrict: 'A',
        link: function(scope, element, attrs){
            $(element).hover(function(){
                // on mouseenter
                $(element).tooltip('show');
            }, function(){
                // on mouseleave
                $(element).tooltip('hide');
            });
        }
    };
});

myApp.directive('backImg', function(){
    return function(scope, element, attrs){
        var url = attrs.backImg;
        element.css({
            'background-image': 'url(' + url +')',
            'background-size' : 'cover'
        });
    };
});

myApp.filter('to_trusted', ['$sce', function($sce){
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    }]);





