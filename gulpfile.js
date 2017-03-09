var
    gulp        = require('gulp'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    util        = require('gulp-util'),
    jshint      = require('gulp-jshint'),
    stylish     = require('jshint-stylish'),
    sourcemaps  = require('gulp-sourcemaps'),
    useref      = require('gulp-useref')
    ;

var paths = {
    js: 'src/cjw.api-wrapper.service.js'
};

var onError = function (source, error) {
    new util
        .PluginError(source, error, {
        showStack: true
    });

    this.emit('end');
};


// - Tasks
//

gulp.task('lint', function () {
    return gulp
        .src(paths.js)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {
            verbose: true
        }))
        .pipe(jshint.reporter('fail'))
        ;
});

gulp.task('js', ['lint'], function () {
    return gulp
        .src([paths.js])
        .pipe(useref())
        .pipe(uglify({mangle: false}))
        .on('error', onError)
        .pipe(gulp.dest('dist'))
        .pipe(gulp.dest('sample'))
        ;
});

gulp.task('default', ['js']);
