'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;
var _ = require('lodash');

gulp.task('styles-reload', function() {
  return buildStyles();
});

gulp.task('styles-dev', function() {
  return buildStyles()
          .pipe(gulp.dest(path.join(conf.paths.dist, '/app/')));
});


gulp.task('styles', function() {
  return buildStyles()
          .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/app/')));
});

/**
 * - inject all file scss in app folder to index.scss
 * - use wiredep inject scss for all dependent package in bower
 * - convert scss to css 
 * - copy css to tmp folder
 */
var buildStyles = function() {
  var scssOptions = {
    paths: [
      'bower_components',
      path.join(conf.paths.src, '/app'),
      path.join(conf.paths.src, '../scss')
    ],
    relativeUrls : true
  };
  
  var sassOptions = {
        style: 'expanded'
    };
  
  // config for inject *.scss to index.scss
  var injectFiles = gulp.src([
    path.join(conf.paths.src, '/app/core/scss/**/*.scss'),
    path.join(conf.paths.src, '/app/core/**/*.scss'),
    path.join(conf.paths.src, '/app/**/*.scss'),
    path.join('!' + conf.paths.src, '/app/index.scss')
  ], { read: false });

  var injectOptions = {
    transform: function(filePath) {
      filePath = filePath.replace(conf.paths.src + '/app/', '');
      return '@import "' + filePath + '";';
    },
    starttag: '// injector',
    endtag: '// endinjector',
    addRootSlash: false
  };


  return gulp.src([
    path.join(conf.paths.src, '/app/index.scss')
  ])
    .pipe($.inject(injectFiles, injectOptions))
    .pipe(wiredep(_.extend({}, conf.wiredep)))
    .pipe($.sourcemaps.init())
    //.pipe($.less(scssOptions)).on('error', conf.errorHandler('less'))
    .pipe($.sass(sassOptions)).on('error', conf.errorHandler('Sass'))
    .pipe($.autoprefixer()).on('error', conf.errorHandler('Autoprefixer'))
    .pipe($.sourcemaps.write());
};
