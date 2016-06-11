'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

/**
 * build htmls file (in src/app, tmp/serve/app) to a js file (tmp/partials/templateCacheHtml.js) using angular template cache
 * 
 */
gulp.task('partials', function () {
  return gulp.src([
    path.join(conf.paths.src, '/app/**/*.html')
  ])
    .pipe($.htmlmin({
      removeEmptyAttributes: true,
      removeAttributeQuotes: true,
      collapseBooleanAttributes: true,
      collapseWhitespace: true
    }))
    .pipe($.angularTemplatecache('templateCacheHtml.js', {
      module: conf.appName,
      root: 'app'
    }))
    .pipe(gulp.dest(conf.paths.tmp + '/partials/'));
});

/**
 * inject: inject css, js to html file, copy to tmp/serve folder
 * partials: build all html file in app folder in tmp/partials/templateCacheHtml.js
 * 
 * build file html from tmp/serve folder
 * - inject templateCacheHtml.js to inside inject:partials
 * - concat all file with build:type, uglify, rev
 * - copy to dist folder
 */
gulp.task('html', ['inject', 'partials'], function () {
  // inject templateCacheHtml file
  var partialsInjectFile = gulp.src(path.join(conf.paths.tmp, '/partials/templateCacheHtml.js'), { read: false });
  var partialsInjectOptions = {
    starttag: '<!-- inject:partials -->',
    ignorePath: path.join(conf.paths.tmp, '/partials'),
    addRootSlash: false
  };

  var htmlFilter = $.filter('*.html', { restore: true });
  var jsFilter = $.filter('**/*.js', { restore: true });
  var cssFilter = $.filter('**/*.css', { restore: true });

  return gulp.src(path.join(conf.paths.tmp, '/serve/*.html'))
    .pipe($.inject(partialsInjectFile, partialsInjectOptions))
    .pipe($.useref())
    .pipe(jsFilter)
    //.pipe($.sourcemaps.init())
    .pipe($.ngAnnotate())
    .pipe($.uglify({ preserveComments: $.uglifySaveLicense })).on('error', conf.errorHandler('Uglify'))
    .pipe($.rev())
    //.pipe($.sourcemaps.write('maps'))
    .pipe(jsFilter.restore)
    .pipe(cssFilter)
    //.pipe($.sourcemaps.init())
    .pipe($.replace('../../bower_components/bootstrap/fonts/', '../fonts/'))
    .pipe($.replace('../../bower_components/font-awesome/fonts/', '../fonts/'))
    .pipe($.cssnano())
    .pipe($.rev())
    //.pipe($.sourcemaps.write('maps'))
    .pipe(cssFilter.restore)
    .pipe($.revReplace())
    .pipe(htmlFilter)
    .pipe($.htmlmin({
      removeEmptyAttributes: true,
      removeAttributeQuotes: true,
      collapseBooleanAttributes: true,
      collapseWhitespace: true
    }))
    .pipe(htmlFilter.restore)
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')))
    .pipe($.size({ title: path.join(conf.paths.dist, '/'), showFiles: true }));
  });

// Only applies for fonts from bower dependencies
// Custom fonts are handled by the "other" task
// copy font to dist/fonts 
gulp.task('fonts', function () {
  return gulp.src($.mainBowerFiles())
    .pipe($.filter('**/*.{eot,otf,svg,ttf,woff,woff2}'))
    .pipe($.flatten())
    .pipe(gulp.dest(path.join(conf.paths.dist, '/fonts/')));
});

/**
 * copy other file is not html, css, js, scss to dist folder
 */
gulp.task('other', function () {
  var fileFilter = $.filter(function (file) {
    return file.stat.isFile();
  });

  return gulp.src([
    path.join(conf.paths.src, '/**/*'),
    path.join('!' + conf.paths.src, '/**/*.{html,css,js,scss}')
  ])
    .pipe(fileFilter)
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')));
});

/**
 * clear file on www, except data folder
 */
gulp.task('clean', function () {
  return $.del([path.join(conf.paths.dist, '/'), path.join('!' + conf.paths.dist, '/data')]);
});

/**
 * inject css, js, partials to html
 * build css, js
 * to all to dist folder
 */
gulp.task('build', ['clean'], function(){
  gulp.start('build-clean');
});

gulp.task('build-clean', ['html', 'fonts', 'other']);