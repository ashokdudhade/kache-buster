var gulp = require('gulp');
var kacheBuster = require('./index.js');
gulp.task('default', function() {
    return gulp.src('test/data/*.html')
        .pipe(kacheBuster({ versionType: "MD5", sourceDir : "/test"}))
        .pipe(gulp.dest('./tmp'));
});
