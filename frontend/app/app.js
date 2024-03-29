'use strict';

var saludalosojos = angular.module("saludalosojosApp",["ngRoute","ui.bootstrap", "ngAnimate", "ngTouch", "ng.deviceDetector", "angulartics", "angulartics.google.analytics"]);

/**
 *  Main App Controller
 **/

saludalosojos.controller('mainController', ['$scope', '$rootScope', 'Cookie', '$location', '$sce', '$window', 'deviceDetector', function ($scope, $rootScope, Cookie, $location, $sce, $window, deviceDetector) {


	$rootScope.mobile = deviceDetector.isMobile();

	var urlVideo = 'https://www.youtube.com/embed/FtAlhE5dMUA?autoplay=1&iv_load_policy=3&modestbranding=1&showinfo=0';
	var urlMaking = 'https://www.youtube.com/embed/ELQxobMDZQM?autoplay=1&iv_load_policy=3&modestbranding=1&showinfo=0';

	$rootScope.view_video = false;

	Cookie.checkCookie({
		error: function (){
			$location.path("/agegate");
		}
	});

	$scope.$on('$routeChangeStart', function(scope, next, current) {
		if (next.$$route != undefined) {
			if (next.$$route.controller == 'homeController' || next.$$route.controller == 'agegateController') {
				$scope.home_active = true;
				if (next.$$route.controller == 'agegateController') {
					$scope.show_menu = false;
				} else {
					$scope.show_menu = true;
				}
			} else {
				$scope.home_active = false;
				$scope.show_menu = true;
			}
		}

		$('#menu').removeClass('open');
	});

	$scope.range = function(min, max, step) {
		step = step || 1;
		var input = [];
		for (var i = min; i <= max; i += step) {
			input.push(i);
		}
		return input;
	};

	$scope.isActive = function (viewLocation) {
		if (viewLocation == '/galeria')
			return viewLocation === '/' + $location.path().split('/')[1];
		
		return viewLocation === $location.path();
	}

	$scope.showVideo = function($event, option) {
		$event.preventDefault();
		switch (option) {
			case 'making' : 
				$scope.urlIframeVideo = urlMaking;
				break;
			default :
				$scope.urlIframeVideo = urlVideo;
				break;
		}

		$rootScope.view_video = 'video';
	}

	$scope.trustSrc = function() {
		return $sce.trustAsResourceUrl($scope.urlIframeVideo);
	}

	$scope.closeVideo = function() {
		$rootScope.view_video = false;
	}


	$scope.toggleMovilMenu = function() {
		if ($('#menu').hasClass('open')) {
			$('#menu').removeClass('open');
		} else {
			$('#menu').addClass('open')
		}
	}

	$scope.scrollImage = function($event) {
		$scope.pageY = ($event.pageY * 100) / angular.element($window).height();
	}

	window.addEventListener("orientationchange", function() {
		if (angular.element($window).height() > angular.element($window).width()) {
			$rootScope.view_video = false;
		} else {
			$rootScope.view_video = 'landscape';
		}

		$rootScope.$apply();

	}, false);
}]);
