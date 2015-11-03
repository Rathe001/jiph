'use strict';

var gulp = require('gulp');
var plumber = require('gulp-plumber');

gulp.task('copy:fonts', [], function () {
    return gulp.src(['src/fonts/**/*'])
        .pipe(plumber())
        .pipe(gulp.dest("dist/fonts"));
});

gulp.task('copy:home', [], function () {
    return gulp.src(['src/home/**/*'])
        .pipe(plumber())
        .pipe(gulp.dest("dist/home"));
});

gulp.task('copy:img', [], function () {
    return gulp.src(['src/img/**/*'])
        .pipe(plumber())
        .pipe(gulp.dest("dist/img"));
});

gulp.task('copy:html', [], function () {
    return gulp.src(['src/*.html'])
        .pipe(plumber())
        .pipe(gulp.dest("dist"));
});

gulp.task('copy:login-views', [], function () {
    return gulp.src(['src/js/login/**/*.html'])
        .pipe(plumber())
        .pipe(gulp.dest("dist/views"));
});

gulp.task('copy:misc', [], function () {
    return gulp.src(['src/.htaccess', 'src/apple-touch-icon-precomposed.png', 'src/favicon.png', 'src/crossdomain.xml', 'src/favicon.ico', 'src/humans.txt', 'src/robots.txt', 'src/privacy.html', 'src/terms.html'])
        .pipe(plumber())
        .pipe(gulp.dest("dist/"));
});

gulp.task('copy:js', [], function () {
    return gulp.src([])
        .pipe(plumber())
        .pipe(gulp.dest("dist/js"));
});