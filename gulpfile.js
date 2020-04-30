const babel = require('gulp-babel');
const postcss = require('gulp-postcss');
const browserify = require('browserify');
const gulp = require('gulp');
const log = require('gulplog');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const globby = require('globby');
const through = require('through2');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');

function js() {
    var bundledStream = through();

    bundledStream
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(babel())
        .pipe(uglify())
        .on('error', log.error)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/js/'));

    globby(['./src/*.js']).then(function (entries) {
        var b = browserify({
            entries: entries,
            debug: true
        });

        b.bundle().pipe(bundledStream);
    }).catch(function (err) {
        bundledStream.emit('error', err);
    });

    return bundledStream;
}

function css() {
    return gulp.src('./src/main.css')
        .pipe(postcss([require('postcss-import'), require('tailwindcss')]))
        .pipe(gulp.dest('./dist/css/'));
}

exports.default = function () {
    gulp.watch('./src/*', { ignoreInitial: false }, gulp.series(js, css));
};