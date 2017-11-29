/**
 * Created by gabriel.mitoso
 */
(function(){
    'use strict';

    angular.module('book-new',[])

        .config(function($routeProvider) {
            $routeProvider.when('/book/new/:authorId', {
                templateUrl: 'book/new/book_new.html',
                controller: 'BookNewCtrl'
            });
        })

        .controller('BookNewCtrl', function($scope, $rootScope, $route, bookAPI, authorAPI, $location) {

            $scope.book = {};
            $scope.author = {};

            var authorId = $route.current.params.authorId;

            /*
             *@desc Salva o livro e retorna para a lista de livros do autor
            */
            $scope.saveBook = function () {
                $rootScope.showLoading();
                bookAPI.saveBook($scope.book).then(function successCallback(response) {
                    $rootScope.hideLoading();
                    $location.path('/books/'+authorId);
                }, function errorCallback(response) {
                    $rootScope.hideLoading();
                    $rootScope.showError("Try again!");
                });
            };

            /*
             *@desc Carrega o autor quando entra na página
            */
            var loadAuthor = function () {
                authorAPI.getAuthor(authorId).then(function successCallback(response) {
                    $scope.author = response.data;
                    $scope.book.authorId = $scope.author.id;
                }, function errorCallback(response) {
                    $rootScope.showError("Try again!");
                    $location.path('/books/'+authorId);
                });
            };

            loadAuthor();

        });
})();
