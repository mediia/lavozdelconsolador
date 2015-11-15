// RqquireJS config
requirejs.config({
	"paths": {
		"angular": "//ajax.googleapis.com/ajax/libs/angularjs/1.3.15/"
	}
})

// Main config
define([
		"angular",
		"angular-animate",
		"angular-route",
		"controller"
	],
	function(angular, angularAnimate, angularAria) {
		var app = angular.module('lveApp', ['ngAnimate', 'ngRoute'])

		app.controller('AppController', function() {
			var vm = this
		})
	}
)
