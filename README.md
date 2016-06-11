# Ionic Starter

[![Dependency Status](https://david-dm.org/bobiasg/ionic-starter.svg)](https://david-dm.org/bobiasg/ionic-starter)
[![devDependency Status](https://david-dm.org/bobiasg/ionic-starter/dev-status.svg)](https://david-dm.org/bobiasg/ionic-starter#info=devDependencies)

This is a fork from https://github.com/loicknuchel/ionic-starter with add some tips:

Add some gulp tasks for automatic optimize process in development and build project.
Gulp tasks base on https://github.com/Swiip/generator-gulp-angular.

## Getting started

- install nodejs, npm, gulp, bower, cordova, ionic & sass (if not already done)
- `git clone git@github.com:bobiasg/ionic-starter.git` : clone this repo
- `cd ionic-starter` : go to folder
- `bower install` : install app dependencies
- `npm install` : install build dependencies
- `ionic serve` : start the app on your browser - automatic inject dependent modules and project file (js, css) to index.html, and copy all file to www folder.

To build app:

- `ionic platform add [android | ios]`: add android or ios platform to the project 
- `ionic resources` : generate icon & splash-screen for project platforms
- `gulp build && ionic build [platform]`: optimize process project files (concat, minification, rev, angular template cache) and build app