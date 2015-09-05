[![Build Status][image-1]][1] [![Coverage Status][image-2]][2]

<img src="./images/Kache-Buster.png" alt="Kache Buster" style="width:70px"> kache-buster
====================================================


Usage
----

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

[1]:	https://travis-ci.org/ashokdudhade/kache-buster
[2]:	https://coveralls.io/github/ashokdudhade/kache-buster?branch=master


[image-1]:	https://travis-ci.org/ashokdudhade/kache-buster.svg?branch=master
[image-2]:	https://coveralls.io/repos/ashokdudhade/kache-buster/badge.svg?branch=master&service=github
