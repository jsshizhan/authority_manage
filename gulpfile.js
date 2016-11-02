'use strict';

var gulp = require('gulp');
var wiredep = require('wiredep').stream;
var runSequence = require('run-sequence');
var useref = require('gulp-useref');
var Reproxy = require("gulp-connect-reproxy");
var inject = require('gulp-inject');
var rimraf = require('rimraf');
var gulp_connect = require('gulp-connect');
var url = require('url');
var lazypipe = require('lazypipe');
var autoprefixer = require('gulp-autoprefixer');
var gulpif = require('gulp-if');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');


gulp.task('styles', function () {
  return gulp.src(['app/styles/**/*.css','app/scripts/**/*.css'],{base:'app'})
    .pipe(autoprefixer('last 1 version'))
    .pipe(gulp.dest('.tmp'));
});

// inject bower components
gulp.task('bower', function () {
  return gulp.src('app/index.html')
    .pipe(wiredep({
      directory: 'bower_components',
      ignorePath: '..',
      exclude:['echarts','pickadate']
    }))
    .pipe(gulp.dest('app'));
});

gulp.task('build',function(){
  runSequence('clean:dist','bower',['semantic_icon','html','images','styles'],'useref','gulify');
});

gulp.task('gulify',function(){
  gulp.src(['dist/scripts/vendor.js','dist/scripts/vendor_login.js'],{base:'./dist'})
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('useref', function () {
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpif('*.css',minifyCss()))
    .pipe(gulp.dest('dist'));
});

gulp.task('images', function () {
  return gulp.src('app/images/**/*')
    // .pipe(imagemin())
    .pipe(gulp.dest( 'dist/images'));
});

gulp.task('html',function(){
  return gulp.src('app/**/*.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('semantic_icon',function(){
  gulp.src('bower_components/semantic/src/themes/default/assets/fonts/*.*',{base:'.'})
    .pipe(gulp.dest('dist'))
});

gulp.task('clean:dist', function (cb) {
  rimraf('./dist', cb);
});

gulp.task('server', function() {
  gulp_connect.server({
    root: 'app',
    livereload: true,
    // Change this to '0.0.0.0' to access the server from outside.
    port: 9000,
    middleware: function (connect, opt) {
      return [ (function() {
        opt.server = '192.168.1.108:8080';
        opt.rule = [/\/api/];
        var proxy = new Reproxy(opt);
        return proxy;
      })(),connect().use(
        '/bower_components',
        connect.static('./bower_components')
      )];
    }
  });
});




