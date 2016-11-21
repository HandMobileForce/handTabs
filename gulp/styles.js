'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');
var reload = browserSync.reload;
var $ = require('gulp-load-plugins')();

// Compile Sass
gulp.task('sass', function () {
  return buildStyles();
});

//reload sass
gulp.task('reload-sass', function () {
  return buildStyles()
    .pipe(browserSync.reload({stream: true}));
});

var buildStyles = function () {
  var sassOptions = {
    outputStyle: 'expanded',    //输出格式
    precision: 10
  };
  return gulp.src('app/theme/*.scss')
    .pipe($.sass(sassOptions))
    .pipe($.autoprefixer())
    .pipe(gulp.dest('www/build/css'));
    //.pipe(reload({stream:true}));
}

gulp.task('reload-img', ['copy-img'],function () {
  return browserSync.reload({stream: true});
});

