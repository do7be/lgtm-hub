var gulp    = require("gulp"),
    uglify  = require("gulp-uglify"),
    concat  = require("gulp-concat"),
    rename  = require('gulp-rename'),
    plumber = require("gulp-plumber");

// concat & uglify
gulp.task('js.concat', function() {
  return gulp.src('public/src/js/*.js')
    .pipe(plumber())
    .pipe(concat('client.js'))
    .pipe(gulp.dest('public/src/concat/js/'));
});
gulp.task('js.uglify', function() {
  return gulp.src('public/src/concat/js/client.js')
    .pipe(plumber())
    .pipe(uglify())
    .pipe(rename('client.min.js'))
    .pipe(gulp.dest('public/js/'));
});

// js build
gulp.task('js', ['js.concat', 'js.uglify']);

// watch
gulp.task('watch', function() {
  gulp.watch(['public/src/js/*.js'], ['js']);
});

gulp.task('default', ['js']);
