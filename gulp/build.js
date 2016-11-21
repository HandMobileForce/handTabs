/**
 * Created by kaiyuyuan on 16/10/17.
 */
var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'run-sequence']
});

gulp.task('build-dev', function (callback) {
  $.runSequence('copy-dev', 'copy-config', [
    // 'lint',
    'copy-dev-libs',
    'copy-img',
    'copy-handLibs',
    'html',
    'copy-configxml',
    'resource'],'inject',  callback);
});

gulp.task('build-prod', function (callback) {
  $.runSequence('copy-prod', [
    // 'lint',
    'copy-prod-libs',
    'copy-img',
    'sass',
    'scripts',
    'html',
    'copy-config-prod',
    'copy-configxml-prod',
    'resourceProd'], callback);
});

// Default Task
gulp.task('default', ['run-dev']);

// Default Task
gulp.task('run-dev', function (callback) {
  $.runSequence('clean', 'build-dev', callback);
});

// Default Task
gulp.task('run-prod', function (callback) {
  $.runSequence('clean', 'build-prod', callback);
});
