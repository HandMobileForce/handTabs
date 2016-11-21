/**
 * Created by kaiyuyuan on 16/10/17.
 */
'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');
var reload = browserSync.reload;

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'lazypipe']
});

var htmlFilePath = [
  'app/pages/**/*.html',
  'app/pages/**/**/*.html'];

//compile html
gulp.task('pagesHtml', function () {
  return buildHtml();
});

// reload HTML
gulp.task('reload-pagesHtml', function () {
    return buildHtml()
      .pipe(reload({stream:true}));
});

var buildHtml = function(){
  return gulp.src(htmlFilePath)
    .pipe($.useref({noAssets: true}, $.lazypipe().pipe($.sourcemaps.init, {loadMaps: true})))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('www/build/pages'))
}

gulp.task('rootHtml', function () {
  return gulp.src('src/*.html')
    .pipe($.useref({noAssets: true}, $.lazypipe().pipe($.sourcemaps.init, {loadMaps: true})))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('www'));
});

gulp.task('html', ['pagesHtml']);
