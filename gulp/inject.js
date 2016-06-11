'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;
var _ = require('lodash');

gulp.task('inject-reload', function() {
  return injectHtml();
});

/**
 * inject css, js for all html file in src folder, copy to tmp/serve
 * 
 * - scripts: check syntax js
 * - styles: build css from scss, copy to tmp folder
 * - inject css in tmp/server/app to inside tag inject:css
 * - inject js in app folder (except spec, mock files) to inside inject:js
 * - inject css for all dependent package to inside tag: bower:css
 * - copy to dist folder
 */
gulp.task('inject', ['scripts', 'styles'], function () {
  var injectStyles = gulp.src([
    path.join(conf.paths.tmp, '/serve/app/**/*.css'),
    path.join('!' + conf.paths.tmp, '/serve/app/vendor.css')
  ], { read: false });

  var injectScripts = gulp.src([
    path.join(conf.paths.src, '/app/**/*.module.js'),
    path.join(conf.paths.src, '/app/**/*.js'),
    path.join('!' + conf.paths.src, '/app/**/*.spec.js'),
    path.join('!' + conf.paths.src, '/app/**/*.mock.js'),
  ])
  .pipe($.angularFilesort()).on('error', conf.errorHandler('AngularFilesort'));

  var injectOptions = {
    ignorePath: [conf.paths.src, path.join(conf.paths.tmp, '/serve')],
    addRootSlash: false
  };

  return gulp.src(path.join(conf.paths.src, '/*.html'))
    .pipe($.inject(injectStyles, injectOptions))
    .pipe($.inject(injectScripts, injectOptions))
    .pipe(wiredep(_.extend({}, conf.wiredep)))
    .pipe(gulp.dest(path.join(conf.paths.tmp,'/serve/')));
});

gulp.task('inject-dev', ['scripts-dev', 'styles-dev', 'html-copy', 'fonts', 'other'], function(){
  return injectHtml();
});

gulp.task('inject-clean-dev', ['clean'], function(){
  gulp.start('inject-dev');
});

function injectHtml(){
  var injectStyles = gulp.src([
    path.join(conf.paths.tmp, '/serve/app/**/*.css'),
    path.join('!' + conf.paths.tmp, '/serve/app/vendor.css')
  ], { read: false });

  var injectScripts = gulp.src([
    path.join(conf.paths.src, '/app/**/*.module.js'),
    path.join(conf.paths.src, '/app/**/*.js'),
    path.join('!' + conf.paths.src, '/app/**/*.spec.js'),
    path.join('!' + conf.paths.src, '/app/**/*.mock.js'),
  ])
  .pipe($.angularFilesort()).on('error', conf.errorHandler('AngularFilesort'));

  var injectJsOptions = {
    starttag: '<!-- inject:js-dev -->',
    ignorePath: [conf.paths.src, path.join(conf.paths.tmp, '/serve')],
    addRootSlash: false
  };
  var injectCssOptions = {
    starttag: '<!-- inject:css-dev -->',
    ignorePath: [conf.paths.src, path.join(conf.paths.tmp, '/serve')],
    addRootSlash: false
  };

  return gulp.src(path.join(conf.paths.src, '/*.html'))
    .pipe($.inject(injectStyles, injectCssOptions))
    .pipe($.inject(injectScripts, injectJsOptions))
    .pipe(wiredep(_.extend({}, conf.wiredep)))
    .pipe($.useref())
    .pipe(gulp.dest(path.join(conf.paths.dist)));
}

