/**
 * Created by gabriel.mitoso
 */
(function(){
    'use strict';
    angular.module('book', ['book-new', 'book-list', 'book-edit'])
        .factory("bookAPI", function (baseUrl, $http) {

            var _getBook= function (id) {
                return $http.get(baseUrl + "/books/" + id);
            };

            var _saveBook = function (book) {
                return $http.post(baseUrl + "/books/", book);
            };

            var _updateBook = function (book) {
                return $http.put(baseUrl + "/books/"+book.id, book);
            };

            var _deleteBook = function (bookId) {
                return $http.delete(baseUrl + "/books/"+bookId);
            };

            var _getBooksByAuthor = function (authorId) {
                return $http.get(baseUrl + "/authors/"+authorId+"/books");
            };

            return {
                getBook: _getBook,
                saveBook: _saveBook,
                updateBook: _updateBook,
                deleteBook: _deleteBook,
                getBooksByAuthor: _getBooksByAuthor
            };

        });
})();
