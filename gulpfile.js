var gulp = require('gulp');
var del = require('del');
var vinylPaths = require('vinyl-paths');
var babel = require('gulp-babel');
var changed = require('gulp-changed');
var assign = Object.assign || require('object.assign');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var runSequence = require('run-sequence');
var path = require('path');
var paths = {
    source:'src/**/*.js'
  , html:'src/**/*.html'
  , dist: 'dist'
  , sourceRoot: path.join(__dirname, 'src'),
}


// need this options to use decorators
var compilerOptions = {
  stage: 0,
  optional: [
    "es7.decorators",
    "regenerator",
    "asyncToGenerator",
    "es7.classProperties",
    "es7.asyncFunctions"
  ]
};

var compilerOptionsForAMD = {
  modules: 'system',
  moduleIds: false,
  comments: false,
  compact: false,
  stage:2,
  optional: [
    "es7.decorators",
    "es7.classProperties"
  ]
};

gulp.task('build-amd', ['build-html-amd'], function () {
  return gulp.src(paths.source)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(babel(assign({}, compilerOptions, {modules:'amd'})))
    .pipe(sourcemaps.write('.', { includeContent: true}))
    .pipe(gulp.dest(paths.dist + '/amd'));
});

gulp.task('build-html-amd', function () {
  return gulp.src(paths.html)
    .pipe(changed(paths.dist, {extension: '.html'}))
    .pipe(gulp.dest(paths.dist + '/amd'));
});

gulp.task('build-client', function () {
  return gulp.src(paths.source)
    .pipe(plumber())
    .pipe(changed(paths.dist, {extension: '.js'}))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(babel(compilerOptions))
    .pipe(sourcemaps.write('.', { includeContent: true, sourceRoot: paths.sourceRoot}))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('build-html', function () {
  return gulp.src(paths.html)
    .pipe(changed(paths.dist, {extension: '.html'}))
    .pipe(gulp.dest(paths.dist));
});


gulp.task('build', function(callback) {
  return runSequence(
    'clean',
    ['build-client', 'build-html'],
    ['build-amd', 'build-html-amd'],
    callback
  );
});

gulp.task('clean', function() {
 return gulp.src([paths.dist])
    .pipe(vinylPaths(del));
});


gulp.task('default', ['build']);

