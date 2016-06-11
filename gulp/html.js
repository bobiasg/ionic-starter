'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');


var $ = require('gulp-load-plugins')();


/**
 * copy file to dist folder
 */
gulp.task('html-reload', ['html-copy'], function() {
  
});

gulp.task('html-copy', function() {
  return buildHtmls()
    .pipe(gulp.dest(path.join(conf.paths.dist,'/app')));
});
/**
 * check syntax js
 */
function buildHtmls() {
  return gulp.src(path.join(conf.paths.src, '/app/**/*.html'))
    .pipe($.size());
}
