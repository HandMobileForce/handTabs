/**
 * Created by kaiyuyuan on 16/10/20.
 */
var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'lazypipe']
});

var imagePath = [
  "app/img/*",
  "app/img/*/*"];

var libDevFilePath = [
  'app/lib/**/*.*',
  'app/lib/**/**/*.*',
  'app/lib/**/**/**/*.*'];

var libPublishFilePath = [
  'app/lib/**/css/ionic.min.css',
  'app/lib/**/fonts/*.*',
  'app/lib/**/js/ionic.bundle.js',
  'app/lib/**/rollups/md5.js',
  'app/lib/**/dist/jquery.min.js',
  'app/lib/**/dist/ng-cordova.js',
  'app/lib/**/dist/ionic-datepicker.bundle.min.js',
  'app/lib/**/hmsTable.html',
  'app/lib/**/hmsDerective.js'
];

// Handle img
gulp.task('copy-img', function () {
  return gulp.src(imagePath)
    .pipe(gulp.dest('www/build/img'));
});

// Copy handLib
gulp.task('copy-handLibs', function () {
  return gulp.src(['app/handLib/*','app/handLib/*/*'])
    .pipe(gulp.dest('www/build/handLib'));
});

// Copy Ionic Lib
gulp.task('copy-dev-libs', function () {
  return gulp.src(libDevFilePath)
    .pipe(gulp.dest('www/build/lib'));
});

gulp.task('copy-prod-libs', function () {
  return gulp.src(libPublishFilePath)
    .pipe(gulp.dest('www/build/lib'));
});

// copy all files
gulp.task('copy-dev', function () {
  return gulp.src([
      'src/**/*',
      '!src/index.html',
      '!src/scripts/*'])
    .pipe(gulp.dest('www'));
});

// copy product env files, ignore source and useless files
gulp.task('copy-prod', function () {
  return gulp.src([
      'src/**/*',
      '!src/index.html',
      '!src/**/*.ts',
      '!src/**/*.less',
      '!src/**/*.sass',
      '!src/**/*.styl',
      '!src/css/*',
      '!src/**/*.md',
      '!src/scripts/*'])
    .pipe(gulp.dest('www'));
});
