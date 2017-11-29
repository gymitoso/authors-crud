/**
 * Created by gabriel.mitoso
 */
(function(){
    'use strict';

    angular.module('author-edit',[])

        .config(function($routeProvider) {
            $routeProvider.when('/edit/:id', {
                templateUrl: 'author/edit/author_edit.html',
                controller: 'AuthorEditCtrl'
            });
        })

        .controller('AuthorEditCtrl', function($scope, $rootScope, $route, authorAPI, $location) {

            $scope.author = {};

            var id = $route.current.params.id;

            /*
             *@desc Edita o autor e retorna para a lista de autores
            */
            $scope.saveAuthor = function () {
                $rootScope.showLoading();
                authorAPI.updateAuthor($scope.author).then(function successCallback(response) {
                    $rootScope.hideLoading();
                    $location.path('/');
                }, function errorCallback(response) {
                    $rootScope.hideLoading();
                    $rootScope.showError("Try again!");
                });
            };
            /*
             *@desc Carrega o autor quando entra na página
            */
            var loadAuthor = function () {
                authorAPI.getAuthor(id).then(function successCallback(response) {
                    $scope.author = response.data;
                }, function errorCallback(response) {
                    $rootScope.showError("Try again!");
                    $location.path('/');
                });
            };

            loadAuthor();

        });
})();
