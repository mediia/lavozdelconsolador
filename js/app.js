var app = angular.module('lvcApp', ['ngAnimate', 'ngMaterial', 'ngAudio'])

app.config(appConfig)
app.controller('appController', appController)

///////// FUNCTIONS /////////

appConfig.$inject = ['$mdThemingProvider']

function appConfig($mdThemingProvider) {
	$mdThemingProvider.theme('default')
    .primaryPalette('cyan')
		.dark()
}

appController.$inject = ['$http', '$mdDialog', 'ngAudio']

function appController($http, $mdDialog, ngAudio) {
	var vm = this

	vm.audios = []

	$http.get('yml/data.yml')
		.then(function(file) {
			vm.audios = jsyaml.load(file.data)
		})

	vm.showAdvanced = showAdvanced

	////////// Funciones //////////

	function showAdvanced(event, serie) {
		console.log('showAdvanced')
		$mdDialog.show({
				controller: dialogController,
				templateUrl: 'player.tmpl.html',
				parent: angular.element(document.body),
				targetEvent: event,
				clickOutsideToClose: true,
				locals: {
					serie: serie,
					ngAudio: ngAudio
				}
			})
			.then(function(answer) {
				//vm.status = 'You said the information was "' + answer + '".'
			}, function() {
				//vm.status = 'You cancelled the dialog.'
			})
	}

}

function dialogController($scope, $mdDialog, serie, ngAudio) {

	$scope.player = {
		playing: null,
		paused: false,
		audio: null
	}

	$scope.serie = serie
	$scope.play = play
	$scope.hide = hide
	$scope.cancel = hide

	$scope.$on('$destroy', hide);

	function play(tema) {

		// Si se está reproduciendo este tema:
		if ($scope.player.playing === tema) {
			// Si está pausado
			if ($scope.player.paused === true) {
				// Volver a reproducir
				$scope.player.paused = false
				$scope.player.audio.play()
			}
			// Si no está pausado
			else {
				// Pausar
				$scope.player.paused = true
				$scope.player.audio.pause()
			}
		}
		// Sino se está reproduciendo este tema
		else {
			// Si se está reproduciendo otro, detener.
			if ($scope.player.audio) {
				$scope.player.audio.stop()
			}
			// Reproducir el tema solicitado
			$scope.player.playing = tema
			$scope.player.paused = false
			$scope.player.audio = ngAudio.play(tema.link)
		}
	}

	function hide() {
		$scope.player.audio.stop()
		$mdDialog.hide()
	}
}
