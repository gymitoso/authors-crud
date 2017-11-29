(function(){
  'use strict';

  angular.module('authorsApp', [
      'ngRoute',
      'templates',
      'author',
      'book'
  ])

      /* String de conexão com o servidor */
      .constant(
          "baseUrl", "https://bibliapp.herokuapp.com/api"
      )

      .config(function($locationProvider, $routeProvider) {
        //utilizado para não ficar # na url
        $locationProvider.html5Mode(true).hashPrefix('!');

        $routeProvider.otherwise({redirectTo: '/'});

      })

      .controller('mainCtrl', function ($scope, $rootScope, $location, $timeout) {

          $rootScope.loading = false;
          $rootScope.errorFound = false;

          $rootScope.errorMsg = "";

          /*
           * @desc função para mostrar o spinner
          */
          $rootScope.showLoading = function () {
              $rootScope.loading = true;
          };

          /*
           * @desc função para esconder o spinner
          */
          $rootScope.hideLoading = function () {
              $rootScope.loading = false;
          };

          /*
           * @desc função para mostrar o painel de erro com a mensagem passada
          */
          $rootScope.showError= function (mensagem) {
              $rootScope.errorFound = true;
              $rootScope.errorMsg = mensagem;
              $timeout(function() {$rootScope.hideError();}, 4000);
          };

          /*
           * @desc função para esconder o painel de erro
          */
          $rootScope.hideError= function () {
              $rootScope.errorFound = false;
              $rootScope.errorMsg = "";
          };

          /*
           * @desc função para alterar de página
          */
          $rootScope.goTo = function(page) {
              $location.path(page);
          };


      });

})();
