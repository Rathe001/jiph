'use strict';
var fs = require('fs');
var gulp = require('gulp');

fs.readdirSync(__dirname + '/gulp').forEach(function(module) {
    require(__dirname + '/gulp/' + module)
});

// Main tasks
var end = function(){ console.log('Gulp process has completed.'); process.exit(0); };
gulp.task('dev', ['copy:js', 'copy:html', 'copy:fonts', 'copy:img', 'copy:misc', 'templates', 'scripts:vendor:dev', 'scripts:app:dev', 'scripts:login:dev', 'scripts:angular:dev', 'css:app:dev'], end);