/**
 * Created by gabriel.mitoso
 */
(function(){
    'use strict';

    angular.module('author-list',[])

        .config(function($routeProvider) {
            $routeProvider.when('/', {
                templateUrl: 'author/list/author_list.html',
                controller: 'AuthorListCtrl'
            });
        })

        .controller('AuthorListCtrl', function($scope, $rootScope, authorAPI) {

            $scope.authors = [];
            $scope.authors_show = [];
            $scope.lastName = "";

            //variáveis para controler de páginas
            $scope.page = 0;
            $scope.maxPage = -1;

            var filter = false;

            /*
             *@desc Busca os autores ao carregar a página
            */
            var getAuthors = function () {
                $rootScope.showLoading();
                authorAPI.getAuthors().then(function successCallback(response) {
                    $rootScope.hideLoading();
                    $scope.page = 0;
                    $scope.maxPage = -1;
                    $scope.authors = response.data;
                    $scope.maxPage = $scope.authors.length / 10;
                    if($scope.maxPage <= 1) {
                        $scope.page = 1;
                        $scope.authors_show = $scope.authors;
                    } else {
                        $scope.next();
                    }
                }, function errorCallback(response) {
                    $rootScope.hideLoading();
                    $scope.page = 1;
                    if(response.status == 404)
                        $rootScope.showError("Authors not found!");
                });
            };

            /*
             *@desc Controla o fluxo de autores sendo apresentados
            */
            $scope.previous = function () {
                if($scope.page != 1 && !filter) {
                    $scope.page = $scope.page - 1;
                    $scope.authors_show = $scope.authors.slice(($scope.page - 1) * 10, $scope.page * 10);
                }
            };

            /*
             *@desc Controla o fluxo de autores sendo apresentados
            */
            $scope.next = function () {
                if($scope.page <= $scope.maxPage && !filter) {
                    $scope.page = $scope.page + 1;
                    $scope.authors_show = $scope.authors.slice(($scope.page - 1) * 10, $scope.page * 10);
                }
            };

            /*
             *@desc Filtra pelo último nome do autor
            */
            $scope.filterAuthors = function () {
                $rootScope.showLoading();
                filter = true;
                if($scope.lastName == "") {
                    filter = false;
                    $scope.page = 0;
                    $scope.maxPage = -1;
                    $scope.maxPage = $scope.authors.length / 10;
                    if($scope.maxPage <= 1) {
                        $scope.page = 1;
                        $scope.authors_show = $scope.authors;
                    } else {
                        $scope.next();
                    }
                } else {
                    $scope.authors_show = [];
                    for(var i=0; i<$scope.authors.length; i++) {
                        if($scope.authors[i].lastName.indexOf($scope.lastName) !== -1) {
                            $scope.authors_show.push($scope.authors[i]);
                        }
                    }
                    $scope.page = 1;
                }
                $rootScope.hideLoading();
            };

            /*
             *@desc Deleta o autor
            */
            $scope.deleteAuthor = function (authorId) {
                if(confirm("You want to delete "+authorId+"?")) {
                    $rootScope.showLoading();
                    authorAPI.deleteAuthor(authorId).then(function successCallback(response) {
                        $rootScope.hideLoading();
                        getAuthors();
                    }, function errorCallback(response) {
                        $rootScope.hideLoading();
                        $rootScope.showError("Try again!");
                    });
                }
            };

            getAuthors();

        });
})();
