/**
 * Created by gabriel.mitoso
 */
var gulp = require('gulp');
var plugins = require("gulp-load-plugins")({lazy:false});
var uglify = require('gulp-uglify');
var dest = "./build/";

gulp.task('scripts', function(){
    //combina todos os arquivos javascripts
    gulp.src(['!./app/**/*_test.js','!./app/public/**','!./js/test/**/*.js','./app/**/*.js'])
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('default'))
        .pipe(plugins.concat('app.js'))
        .pipe(uglify({ mangle: false }))
        .pipe(gulp.dest(dest+'js'));
});

gulp.task('templates',function(){
    //combina todos os arquivos html em um arquivo js
    gulp.src(['!./app/index.html',
        './app/**/*.html'])
        .pipe(plugins.angularTemplatecache('templates.js',{standalone:true}))
        .pipe(gulp.dest(dest+'js'));
});

gulp.task('css', function(){
    //combina todos os arquivos css
    gulp.src(['!./app/public/**','./app/**/*.css'])
        .pipe(plugins.concat('app.css'))
        .pipe(gulp.dest(dest+'css'));
});

gulp.task('vendorJS', function(){
    //concatena as bibliotecas javascripts
    gulp.src(['!./bower_components/**/*.min.js.map','./bower_components/**/*.min.js'])
        .pipe(plugins.concat('lib.js'))
        .pipe(gulp.dest(dest+'js'));
});

gulp.task('vendorCSS', function(){
    //concatena as bibliotecas css
    gulp.src(['!./bower_components/**/*.min.css.map','./bower_components/**/*.min.css'])
        .pipe(plugins.concat('lib.css'))
        .pipe(gulp.dest(dest+'css'));
});

//copy-* copiam os arquivos para o destino

gulp.task('copy-index', function() {
    gulp.src(['./app/index.html'])
        .pipe(gulp.dest(dest));
});

gulp.task('copy-public', function() {
    gulp.src(['./app/public/**'])
        .pipe(gulp.dest(dest+'public'));
});

gulp.task('copy-fonts', function() {
    gulp.src(['./app/fonts/**'])
        .pipe(gulp.dest(dest+'fonts'));
});

gulp.task('copy-images', function() {
    gulp.src(['./app/images/**'])
        .pipe(gulp.dest(dest+'images'));
});

//escuta por alterações no arquivo facilitando o desenvolvimento
gulp.task('watch',function(){
    gulp.watch([
        dest+'**/*.html',
        dest+'**/*.js',
        dest+'**/*.css'
    ], function(event) {

    });
    gulp.watch(['!./app/**/*_test.js','!./js/test/**/*.js','./app/**/*.js'],['scripts']);
    gulp.watch(['!./app/index.html',
        './app/**/*.html'],['templates']);
    gulp.watch(['./app/**/*.css'],['css']);
    gulp.watch('./app/public/**',['copy-public']);
    gulp.watch('./app/index.html',['copy-index']);
});

//comandos defaults a serem executados
gulp.task('default',['scripts','templates','css','vendorJS','vendorCSS', 'copy-images', 'copy-index', 'copy-fonts']);
