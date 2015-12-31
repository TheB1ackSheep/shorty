var gulp = require('gulp'),
  sass = require('gulp-sass'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  cssmin = require('gulp-cssmin'),
  minify = require('gulp-minify'),
  rename = require('gulp-rename'),
  gulpUtil = require('gulp-util'),
  browserSync = require('browser-sync').create();

gulp.task('sass', function() {
  gulp.src('./src/sass/shorty.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./assets/css'))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./assets/css'))
    .pipe(browserSync.stream());
});

gulp.task('js', function() {
  gulp.src('./src/js/*.js')    
    .pipe(uglify().on('error', gulpUtil.log))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./assets/js'))
    .pipe(browserSync.stream())
    .pipe(concat('shorty.js'))
    .pipe(rename({suffix: '', basename:'shorty',extname:'.js'}))
    .pipe(gulp.dest('./assets/js'));
});

gulp.task('default', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    },
    online: true
  });
  gulp.watch("./src/sass/*.scss", ['sass'], browserSync.reload);
  gulp.watch("./src/js/*.js", ['js'], browserSync.reload);
  gulp.watch("./*.html").on('change', browserSync.reload);
});