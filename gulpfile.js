var gulp = require('gulp');
var kacheBuster = require('./index.js');
gulp.task('default', ['MD5','timestamp', 'custom']);

gulp.task('MD5', function() {
    return gulp.src('test/data/*.html')
        .pipe(kacheBuster({ versionType: "MD5", sourceDir : "/test"}))
        .pipe(gulp.dest('./tmp_MD5'));
});


gulp.task('timestamp', function() {
    return gulp.src('test/data/*.html')
        .pipe(kacheBuster({ versionType: "timestamp"}))
        .pipe(gulp.dest('./tmp_timestamp'));
});

gulp.task('custom', function() {
    return gulp.src('test/data/*.html')
        .pipe(kacheBuster({ versionType: "custom", customVersion: "9000"}))
        .pipe(gulp.dest('./tmp_custom'));
});
