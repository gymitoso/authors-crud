/**
 * Created by gabriel.mitoso
 */
(function(){
    'use strict';

    angular.module('author-new',[])

        .config(function($routeProvider) {
            $routeProvider.when('/new', {
                templateUrl: 'author/new/author_new.html',
                controller: 'AuthorNewCtrl'
            });
        })

        .controller('AuthorNewCtrl', function($scope, $rootScope, authorAPI, $location) {

            $scope.author = {};

            /*
             *@desc Salva o autor e retorna para a lista de autores
            */
            $scope.saveAuthor = function () {
                $rootScope.showLoading();
                authorAPI.saveAuthor($scope.author).then(function successCallback(response) {
                    $rootScope.hideLoading();
                    $location.path('/list');
                }, function errorCallback(response) {
                    $rootScope.hideLoading();
                    $rootScope.showError("Try again!");
                });
            };

        });
})();
