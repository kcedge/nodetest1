/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("myApp").directive('trendingWidget',['ProfileService', function (ProfileService) {
    var vm = this;

    return { 
        // restrict: 'E',
        template : ProfileService.getTrendingWidgetHtml(),
        replace: true
      };

}]);