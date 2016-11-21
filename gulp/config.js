/**
 * Created by kaiyuyuan on 16/10/17.
 */
var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'lazypipe']
});

//配置开发环境 的正式环境的 config.Xml文件 和  app图标、启动页
var configXMLPath = ['publish/dev/configxmlDev/*'];
var configXMLProdPath = ['publish/prod/configxmlprod/*'];
var resourcePath = ['publish/dev/resourcesDev/*/*/*', 'publish/dev/resourcesDev/*.png'];
var resourcePathProd = ['publish/prod/resourcesProd/*/*/*', 'publish/prod/resourcesProd/*.png'];

// Handle config 开发环境
gulp.task('copy-config', function () {
  return gulp.src(['app/config/devConfig.json'])
    .pipe($.ngConfig('baseConfig'))
    .pipe($.rename("baseConfig.js"))
    .pipe(gulp.dest('app/scripts'))
});

// Handle config 正式环境
gulp.task('copy-config-prod', function () {
  return gulp.src('app/config/prodConfig.json')
    .pipe($.ngConfig('baseConfig'))
    .pipe($.rename("baseConfig.js"))
    .pipe(gulp.dest('app/scripts'))
});

// Handle config.xml
gulp.task('copy-configxml', function () {
  return gulp.src(configXMLPath)
    .pipe($.useref({noAssets: true}, $.lazypipe().pipe($.sourcemaps.init, {loadMaps: true})))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(''));
});

// Handle config.xml
gulp.task('copy-configxml-prod', function () {
  return gulp.src(configXMLProdPath)
    .pipe($.useref({noAssets: true}, $.lazypipe().pipe($.sourcemaps.init, {loadMaps: true})))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(''));
});

//image task
gulp.task('resource', function () {
  return gulp.src(resourcePath)
    .pipe(gulp.dest('resources'));
});
gulp.task('resourceProd', function () {
  return gulp.src(resourcePathProd)
    .pipe(gulp.dest('resources'));
});
