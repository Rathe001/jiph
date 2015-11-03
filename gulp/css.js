'use strict';

var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var sourcemaps = require('gulp-sourcemaps');
var minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat');

gulp.task('css:sass:dev', function() {
    return sass('src/css/app.scss', {sourcemap: true, style: 'compact'})
        .pipe(minifyCSS())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('css:sass:prod', function() {
    return sass('src/css/app.scss', {sourcemap: true, style: 'compact'})
        .pipe(minifyCSS())
        .pipe(gulp.dest('dist/css'));
});

// css:app:dev
gulp.task('css:app:dev', ['css:sass:dev'], function() {
    return gulp.src([
        'src/css/normalize.css',
        'src/css/bootstrap.css',
        'src/js/vendor/angularjs/combobox/bs-combobox.css',
        'src/js/vendor/angularjs/cropme.css',
        'src/js/vendor/angularjs/slider/slider.css',
        'src/css/folder.css',
        'src/css/datepicker.css'
    ])
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(minifyCSS({processImport: false}))
        .pipe(concat('vendor.min.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/css'));
});

// css:app:prod
gulp.task('css:app:prod', ['css:sass:dev'], function() {
    return gulp.src([
        'src/css/normalize.css',
        'src/css/bootstrap.css',
        'src/js/vendor/angularjs/combobox/bs-combobox.css',
        'src/js/vendor/angularjs/cropme.css',
        'src/js/vendor/angularjs/slider/slider.css',
        'src/css/folder.css',
        'src/css/datepicker.css'
    ])
        .pipe(minifyCSS({processImport: false}))
        .pipe(concat('vendor.min.css'))
        .pipe(gulp.dest('dist/css'));
});

// css:login:dev
gulp.task('css:login:dev', [], function() {
    return gulp.src('src/css/sections/login.css')
        .pipe(sourcemaps.init())
        .pipe(minifyCSS({processImport: false}))
        .pipe(concat('login.min.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/css'));
});

// css:login:prod
gulp.task('css:login:prod', [], function() {
    return gulp.src('src/css/sections/login.css')
        .pipe(minifyCSS({processImport: false}))
        .pipe(concat('login.min.css'))
        .pipe(gulp.dest('dist/css'));
});