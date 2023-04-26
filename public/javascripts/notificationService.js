myApp.service('NotificationService', ['$http', '$q', 'ProfileService','CommentsService', function ($http, $q, ProfileService,CommentsService) {
    var vm = this;
    
    vm.getNotifications = function(user){
		let deffered = $q.defer();

		$http.get('/getNotificationsUserProfile/' + user.profileDetails[0]._id).then(function (response) {

				deffered.resolve(response.data);
				return response.data
			})
			.catch(function (data, status) {
				console.log('ERROR: ' + status + '. We can\'t get the profile right now, please try again later');
				deffered.response(data);

				return "no data";
		});

		return deffered.promise;

	}





}]);