'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var babel = require("gulp-babel");
var concat = require('gulp-concat');
var cached = require('gulp-cached');
var remember = require('gulp-remember');

var vendorScripts = [];

var angularDevScripts = [
    'src/js/vendor/jquery/jquery-2.1.1.min.js',
    'src/js/vendor/angularjs/lib/angular.js',
    'src/js/vendor/angularjs/lib/angular-route.js',
    'src/js/vendor/angularjs/lib/angular-resource.js',
    'src/js/vendor/angularjs/lib/angular-sanitize.js',
    'src/js/vendor/angularjs/lib/angular-animate.js',
    'src/js/vendor/angularjs/lib/angular-aria.js',
    'src/js/vendor/angularjs/lib/angular-touch.js'
];

var angularAppScripts = [
    'src/js/app/app.js',
    'src/js/app/common/common.js',
    'src/js/app/automation/automation.js',
    'src/js/app/campaigns/campaigns.js',
    'src/js/app/ad-sets/ad-sets.js',
    'src/js/app/ads/ads.js',
    'src/js/app/dashboard/dashboard.js',
    'src/js/app/help/help.js',
    'src/js/app/ad-groups/ad-groups.js',
    'src/js/app/audiences/audiences.js',
    'src/js/app/tracking/tracking.js',
    '!src/js/app/**/*.spec.js',
    'src/js/app/**/*.js'
];

// scripts:vendor:dev
gulp.task('scripts:vendor:dev', [], function() {
    return gulp.src(vendorScripts)
        .pipe(concat('vendor.min.js'))
        .pipe(gulp.dest('dist/js'));
});

// scripts:angular:dev
gulp.task('scripts:angular:dev', [], function() {
    return gulp.src(angularDevScripts)
        .pipe(concat('angular.min.js'))
        .pipe(gulp.dest('dist/js'));
});

// scripts:app:dev
gulp.task('scripts:app:dev', [], function() {
    return gulp.src(angularAppScripts)
        .pipe(cached('app-scripts-dev'))
        .pipe(babel())
        .on('error', console.error.bind(console))
        .pipe(remember('app-scripts-dev'))
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest('dist/js'));
});