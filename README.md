[![Build Status](https://travis-ci.org/ashokdudhade/kache-buster.svg?branch=master)](https://travis-ci.org/ashokdudhade/kache-buster)

kache-buster
============

Usage
-----

* MD5 of static content file

```js
var kacheBuster = require('kache-buster');
gulp.task('myTask', function() {
    return gulp.src('web/**/*.html')
        .pipe(kacheBuster({ versionType: "MD5", sourceDir : "/test"}))
        .pipe(gulp.dest('./tmp'));
});
```

* Timestamp

```js
var kacheBuster = require('kache-buster');
gulp.task('myTask', function() {
    return gulp.src('web/**/*.html')
        .pipe(kacheBuster({ versionType: "timestamp"}))
        .pipe(gulp.dest('./tmp'));
});
```

* Custom


```js
var kacheBuster = require('kache-buster');
gulp.task('myTask', function() {
    return gulp.src('web/**/*.html')
        .pipe(kacheBuster({ versionType: "custom", customVersion:"someVersion"}))
        .pipe(gulp.dest('./tmp'));
});
```

```js
var kacheBuster = require('kache-buster');
gulp.task('myTask', function() {
    return gulp.src('web/**/*.html')
        .pipe(kacheBuster({ versionType: "custom", customVersion:function(){return "someversion";}}))
        .pipe(gulp.dest('./tmp'));
});
```
