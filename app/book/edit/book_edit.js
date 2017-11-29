/**
 * Created by gabriel.mitoso
 */
(function(){
    'use strict';

    angular.module('book-edit',[])

        .config(function($routeProvider) {
            $routeProvider.when('/book/edit/:bookId', {
                templateUrl: 'book/edit/book_edit.html',
                controller: 'BookEditCtrl'
            });
        })

        .controller('BookEditCtrl', function($scope, $rootScope, $route, bookAPI, authorAPI, $location) {

            $scope.book = {};
            $scope.author = {};

            var bookId = $route.current.params.bookId;

            /*
             *@desc Edita o livro e retorna para a lista de livros do autor
            */
            $scope.saveBook = function () {
                $rootScope.showLoading();
                bookAPI.updateBook($scope.book).then(function successCallback(response) {
                    $rootScope.hideLoading();
                    $location.path('/books/'+$scope.book.authorId);
                }, function errorCallback(response) {
                    $rootScope.hideLoading();
                    $rootScope.showError("Try again!");
                });
            };

            /*
             *@desc Carrega o autor quando carregar o livro
            */
            var loadAuthor = function () {
                authorAPI.getAuthor($scope.book.authorId).then(function successCallback(response) {
                    $scope.author = response.data;
                }, function errorCallback(response) {
                    $rootScope.showError("Try again!");
                    $location.path('/books/'+$scope.book.authorId);
                });
            };

            /*
             *@desc Carrega o livro quando entra na página
            */
            var loadBook = function () {
                bookAPI.getBook(bookId).then(function successCallback(response) {
                    $scope.book = response.data;
                    loadAuthor();
                }, function errorCallback(response) {
                    $rootScope.showError("Try again!");
                    $location.path('/');
                });
            };

            loadBook();

        });
})();
