saludalosojos.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider){

	$locationProvider.html5Mode(true);

	$routeProvider
	.when('/agegate',
	{
		templateUrl: 'app/modules/agegate/agegate.template.html',
		controller: 'agegateController'
	})
	.when('/',
	{
		templateUrl: 'app/modules/home/home.template.html',
		controller: 'homeController'
	})
	.when('/static-page',
	{
		templateUrl: 'app/modules/staticPage/staticPage.template.html'
	})
	.when('/404',
	{
		templateUrl: 'app/modules/404/404.template.html'
	})
	.otherwise({
		redirectTo: '/404'
	});

}]);
