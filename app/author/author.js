/**
 * Created by gabriel.mitoso
 */
(function(){
    'use strict';
    angular.module('author', ['author-new','author-list', 'author-edit'])
        .factory("authorAPI", function (baseUrl, $http) {

            var _getAuthor= function (id) {
                return $http.get(baseUrl + "/authors/" + id);
            };

            var _saveAuthor = function (author) {
                return $http.post(baseUrl + "/authors/", author);
            };

            var _updateAuthor = function (author) {
                return $http.put(baseUrl + "/authors/"+author.id, author);
            };

            var _deleteAuthor = function (authorId) {
                return $http.delete(baseUrl + "/authors/"+authorId);
            };

            var _getAuthors = function () {
                return $http.get(baseUrl + "/authors/");
            };

            return {
                getAuthor: _getAuthor,
                saveAuthor: _saveAuthor,
                updateAuthor: _updateAuthor,
                deleteAuthor: _deleteAuthor,
                getAuthors: _getAuthors
            };

        });
})();
