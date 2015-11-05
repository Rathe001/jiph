'use strict';
var fs = require('fs');
var gulp = require('gulp');
var cached = require('gulp-cached');
var remember = require('gulp-remember');
var watch = require('gulp-chokidar')(gulp);

fs.readdirSync(__dirname + '/gulp').forEach(function(module) {
    require(__dirname + '/gulp/' + module)
});

// Watcher tasks
gulp.task('watch', function () {
    var scssWatcher = watch('src/css/**/*.scss', {root: 'src/css'})
        .on('change', function(){
            gulp.run('css:app:dev');
        });
    var appWatcher = watch('src/js/app/**/*.js', {root: 'src/js/app'}, ['scripts:app:dev']);

    appWatcher.on('change', function (event) {
        if (event.type === 'deleted') { // if a file is deleted, forget about it
            delete cached.caches['app-scripts-dev'][event.path];
            remember.forget('app-scripts-dev', event.path);
        }
    });

    watch('src/fonts/**/*', {root: 'src/fonts'}, ['copy:fonts']);
    watch('src/img/**/*', {root: 'src/img'}, ['copy:img']);
    watch('src/**/*.html', {root: 'src'}, ['templates', 'copy:html']);
    watch(['src/.htaccess', 'src/apple-touch-icon-precomposed.png', 'src/crossdomain.xml', 'src/favicon.ico', 'src/humans.txt', 'src/robots.txt', 'src/mocks/**/*'], {root: 'src'}, ['copy:misc']);
});

// Main tasks
var end = function(){ console.log('Gulp process has completed.'); process.exit(0); };
gulp.task('dev', ['copy:js', 'copy:html', 'copy:fonts', 'copy:img', 'copy:misc', 'templates', 'scripts:vendor:dev', 'scripts:app:dev', 'scripts:angular:dev', 'css:sass:dev'], end);