/**
 * Created by gabriel.mitoso
 */
(function(){
    'use strict';

    angular.module('book-list',[])

        .config(function($routeProvider) {
            $routeProvider.when('/books/:authorId', {
                templateUrl: 'book/list/book_list.html',
                controller: 'BookListCtrl'
            });
        })

        .controller('BookListCtrl', function($scope, $rootScope, $route, bookAPI, authorAPI) {

            $scope.books = [];
            $scope.books_show = [];
            $scope.author = {};

            //variáveis para controle de páginas
            $scope.page = 0;
            $scope.maxPage = -1;

            var authorId = $route.current.params.authorId;

            /*
             *@desc Busca os livros pelo id do autor ao carregar a página
            */
            var getBooks = function () {
                $rootScope.showLoading();
                bookAPI.getBooksByAuthor(authorId).then(function successCallback(response) {
                    $rootScope.hideLoading();
                    $scope.page = 0;
                    $scope.maxPage = -1;
                    $scope.books = response.data;
                    $scope.maxPage = $scope.books.length / 10;
                    if($scope.maxPage <= 1) {
                        $scope.page = 1;
                        $scope.books_show = $scope.books;
                    } else {
                        $scope.next();
                    }
                }, function errorCallback(response) {
                    $rootScope.hideLoading();
                    $scope.page = 1;
                    if(response.status == 404)
                        $rootScope.showError("Books not found!");
                });
            };

            /*
             *@desc Carrega o autor quando entra na página
            */
            var loadAuthor = function () {
                authorAPI.getAuthor(authorId).then(function successCallback(response) {
                    $scope.author = response.data;
                }, function errorCallback(response) {
                    $rootScope.showError("Try again!");
                    $location.path('/');
                });
            };

            /*
             *@desc Controla o fluxo de livros sendo apresentados
            */
            $scope.previous = function () {
                if($scope.page != 1 && !filter) {
                    $scope.page = $scope.page - 1;
                    $scope.books_show = $scope.books.slice(($scope.page - 1) * 10, $scope.page * 10);
                }
            };

            /*
             *@desc Controla o fluxo de livros sendo apresentados
            */
            $scope.next = function () {
                if($scope.page <= $scope.maxPage && !filter) {
                    $scope.page = $scope.page + 1;
                    $scope.books_show = $scope.books.slice(($scope.page - 1) * 10, $scope.page * 10);
                }
            };


            /*
             *@desc Deleta o livro
            */
            $scope.deleteBook = function (bookId) {
                if(confirm("You want to delete "+bookId+"?")) {
                    $rootScope.showLoading();
                    bookAPI.deleteBook(bookId).then(function successCallback(response) {
                        $rootScope.hideLoading();
                        getBooks();
                    }, function errorCallback(response) {
                        $rootScope.hideLoading();
                        $rootScope.showError("Try again!");
                    });
                }
            };

            getBooks();
            loadAuthor();

        });
})();
