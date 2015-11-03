'use strict';

var gulp = require('gulp');
var templateCache = require('gulp-angular-templatecache');
var minifyHtml = require('gulp-minify-html');
var plumber = require('gulp-plumber');

var templates = [
    'src/**/*.html',
    '!src/js/vendor/angularjs/lib/**/*.html',
    '!src/index.html',
    '!src/login.html',
    '!src/privacy.html',
    '!src/terms.html',
    '!src/home/**/*.html',
    '!src/js/vendor/jquery/**/*.html'
];

// Templates
gulp.task('templates', [], function(){
    return gulp.src(templates)
        .pipe(plumber())
        .pipe(minifyHtml({empty: true}))
        .pipe(templateCache('templates.min.js', {
                root: '/',
                module: 'templates',
                standalone: true
            }
        ))
        .pipe(gulp.dest('dist/js'));
});