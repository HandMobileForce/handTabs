'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');
//var reload = browserSync.reload;

var $ = require('gulp-load-plugins')();

var jsFilePath = [
  'app/*.js',
  'app/scripts/*.js',
  'app/scripts/*/*.js',
  'app/pages/**/*.js',
  'app/pages/**/**/*.js'];

// Lint Task
gulp.task('lint', function () {
  return gulp.src(jsFilePath)
    .pipe($.jshint())
    .pipe($.jshint.reporter('default'));
});

// Concat And Uglify JS
gulp.task('scripts', function () {
  return gulp.src(jsFilePath)
    .pipe($.concat('app.bundle.js'))
    .pipe(gulp.dest('www/build'))  // write source file for debug
    .pipe($.uglify({mangle: true}))  // for debug, do not mangle variable name
    .pipe($.rename({
      suffix: '.min'
    }))
    .pipe($.sourcemaps.write('.', {includeContent: false, sourceRoot: '.'}))
    .pipe(gulp.dest('www/build'));
    //.pipe(reload({stream: true}));
});

gulp.task('reload-scripts', ['scripts'], browserSync.reload);

