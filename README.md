# Ionic Starter

[![Dependency Status](https://david-dm.org/bobiasg/ionic-starter.svg)](https://david-dm.org/bobiasg/ionic-starter)
[![devDependency Status](https://david-dm.org/bobiasg/ionic-starter/dev-status.svg)](https://david-dm.org/bobiasg/ionic-starter#info=devDependencies)

This is a fork from https://github.com/loicknuchel/ionic-starter with add some tip:

Add some gulp task for automatic optimize process in development and build project.
Gulp task base on https://github.com/Swiip/generator-gulp-angular

## Features: 

- useref : allow configuration of your files in comments of your HTML file
- ngAnnotate : convert simple injection to complete syntax to be minification proof
- uglify : optimize all your JavaScript
- csso : optimize all your CSS
- autoprefixer : add vendor prefixes to CSS
- rev : add a hash in the file names to prevent browser cache problems
- watch : watch your source files and recompile them automatically
- eslint : The pluggable linting utility for JavaScript
- imagemin : all your images will be optimized at build
- angular-templatecache : all HTML partials will be converted to JS to be bundled in the application

## Getting started

- install nodejs, npm, gulp, bower, cordova, ionic & sass (if not already done)
- `git clone git@github.com:loicknuchel/ionic-starter.git` : clone this repo
- `cd ionic-starter` : go to folder
- `bower install` : install app dependencies
- `npm install` : install build dependencies
- `ionic serve` : start the app on your browser - automatic inject dependent modules and project file (js, css) to index.html, and copy all file to www folder.

## Build app

- `gulp build && ionic build [platform]`: optimize process project files (concat, minification, rev, angular template cache) and build app