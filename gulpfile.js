var gulp = require('gulp');
var superBust = require('./bin/superBust.js');
gulp.task('default', function() {
    return gulp.src('test/data/*.html')
        .pipe(superBust())
        .pipe(gulp.dest('./tmp'));
});
