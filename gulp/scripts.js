'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var cached = require('gulp-cached');
var remember = require('gulp-remember');

var vendorScripts = [
    'src/js/vendor/angularjs/ui-bootstrap.js',
    'src/js/vendor/angularjs/superswipe.js',
    'src/js/vendor/angularjs/cropme.js',
    'src/js/vendor/angularjs/ui-router.js',
    'src/js/vendor/angularjs/chart.js',
    'src/js/vendor/angularjs/tc-angular-chartjs.js',
    'src/js/vendor/angularjs/timeSince.js',
    'src/js/vendor/angularjs/ng-flow-standalone.js',
    'src/js/vendor/angularjs/angular-relative-date.js',
    'src/js/vendor/angularjs/angular-payments.js',
    'src/js/vendor/highcharts/highcharts.min.js',
    'src/js/vendor/highcharts/highcharts.more.js',
    'src/js/vendor/highcharts/highcharts.solid-gauge.js',
    'src/js/vendor/angularjs/slider/slider.js',
    'src/js/vendor/angularjs/ng-infinite-scroll.min.js',
    'src/js/vendor/angularjs/combobox/bs-combobox.js',
    'src/js/vendor/es6-shim.js',
    'src/js/vendor/momentjs/moment.js',
    'src/js/vendor/momentjs/moment-timezone.js',
    'src/js/vendor/angularjs/angulartics/angulartics.min.js',
    'src/js/vendor/angularjs/angulartics/angulartics-facebook-pixel.min.js',
    'src/js/vendor/angularjs/angulartics/angulartics-google-analytics.min.js',
    'src/js/vendor/angularjs/ng-toastr.js'

];

var angularDevScripts = [
    'src/js/vendor/jquery/jquery-2.1.1.min.js',
    'src/js/vendor/angularjs/lib/angular.js',
    'src/js/vendor/angularjs/lib/angular-route.js',
    'src/js/vendor/angularjs/lib/angular-resource.js',
    'src/js/vendor/angularjs/lib/angular-sanitize.js',
    'src/js/vendor/angularjs/lib/angular-animate.js',
    'src/js/vendor/angularjs/lib/angular-touch.js'
];

var angularProdScripts = [
    'src/js/vendor/jquery/jquery-2.1.1.min.js',
    'src/js/vendor/angularjs/lib/angular.min.js',
    'src/js/vendor/angularjs/lib/angular-route.min.js',
    'src/js/vendor/angularjs/lib/angular-resource.min.js',
    'src/js/vendor/angularjs/lib/angular-sanitize.min.js',
    'src/js/vendor/angularjs/lib/angular-animate.min.js',
    'src/js/vendor/angularjs/lib/angular-touch.min.js'
];

var angularAppScripts = [
    'src/js/app/app.js',
    'src/js/app/apps/apps.js',
    'src/js/app/campaigns/campaigns.js',
    'src/js/app/common/common.js',
    'src/js/app/common/utils.js',
    'src/js/app/creative-groups/creative-groups.js',
    'src/js/app/dashboard/dashboard.js',
    'src/js/app/goals/goals.js',
    'src/js/app/tracking/tracking.js',
    'src/js/app/error/error.js',
    'src/js/app/help/help.js',
    'src/js/app/personas/personas.js',
    'src/js/app/login/login.js',
    'src/js/app/msg/msg.js',
    'src/js/app/onboarding/onboarding.js',
    'src/js/app/reports/reports.js',
    'src/js/app/rule-sets/rule-sets.js',
    'src/js/app/settings/settings.js',
    '!src/js/app/**/*.spec.js',
    'src/js/app/**/*.js'
];

var angularLoginScripts = [
    '!src/js/login/**/*.spec.js',
    'src/js/login/**/*.js',
    'src/js/app/common/common.js',
    'src/js/app/common/resource/resource.js',
    'src/js/app/common/services/intercom/intercom.js',
    'src/js/app/common/services/error-handler/error-handler.js',
    'src/js/app/common/services/api/api.js',
    'src/js/app/common/services/loading/loading.js',
    'src/js/app/common/services/page/page.js',
    'src/js/app/common/services/user/user.js',
    'src/js/app/common/services/toast-handler/toast-handler.js'
];

// scripts:vendor:dev
gulp.task('scripts:vendor:dev', [], function() {
    return gulp.src(vendorScripts)
        .pipe(concat('vendor.min.js'))
        .pipe(gulp.dest('dist/js'));
});

// scripts:vendor:prod
gulp.task('scripts:vendor:prod', [], function() {
    return gulp.src(vendorScripts)
        .pipe(uglify({mangle:true}))
        .pipe(concat('vendor.min.js'))
        .pipe(gulp.dest('dist/js'));
});

// scripts:angular:dev
gulp.task('scripts:angular:dev', [], function() {
    return gulp.src(angularDevScripts)
        .pipe(concat('angular.min.js'))
        .pipe(gulp.dest('dist/js'));
});

// scripts:angular:prod
gulp.task('scripts:angular:prod', [], function() {
    return gulp.src(angularProdScripts)
        .pipe(concat('angular.min.js'))
        .pipe(gulp.dest('dist/js'));
});

// scripts:app:dev
gulp.task('scripts:app:dev', [], function() {
    return gulp.src(angularAppScripts)
        .pipe(cached('app-scripts-dev'))
        .pipe(babel())
        .pipe(remember('app-scripts-dev'))
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest('dist/js'));
});

// scripts:app:prod
gulp.task('scripts:app:prod', [], function() {
    return gulp.src(angularAppScripts)
        .pipe(babel())
        .pipe(uglify({mangle:false}))
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest('dist/js'));
});

// scripts:login:dev
gulp.task('scripts:login:dev', [], function() {
    return gulp.src(angularLoginScripts)
        .pipe(babel())
        .pipe(concat('login.min.js'))
        .pipe(gulp.dest('dist/js'));
});

// scripts:login:prod
gulp.task('scripts:login:prod', [], function() {
    return gulp.src(angularLoginScripts)
        .pipe(babel())
        .pipe(uglify())
        .pipe(concat('login.min.js'))
        .pipe(gulp.dest('dist/js'));
});