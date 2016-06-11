'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');


var $ = require('gulp-load-plugins')();

/**
 * copy file to dist folder
 */
gulp.task('scripts-reload', function() {
  return buildScripts()
    .pipe(gulp.dest(path.join(conf.paths.dist, '/app')));
});

gulp.task('scripts', function() {
  return buildScripts();
});

gulp.task('scripts-dev', function() {
  return buildScripts()
          .pipe(gulp.dest(path.join(conf.paths.dist, '/app')));
});

/**
 * check syntax js
 */
function buildScripts() {
  return gulp.src(path.join(conf.paths.src, '/app/**/*.js'))
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.size());
}
