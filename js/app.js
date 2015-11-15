// RqquireJS config
requirejs.config({
	"paths": {
		"angular": "https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min"
		"angular-route": "https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular-route.min"
		"angular-animate": "https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular-animate.min"
	}
})

// Main config
define([
		"angular",
		"angular-route",
		"angular-animate"
	],
	function(angular, angularAnimate, angularAria) {
		var app = angular.module('lveApp', ['ngRoute', 'ngAnimate'])

		app.controller('AppController', function() {
			var vm = this
		})
	}
)
