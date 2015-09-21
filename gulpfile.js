var gulp        = require("gulp"),
    glob        = require('glob'),
    uglify      = require("gulp-uglify"),
    rename      = require('gulp-rename'),
    plumber     = require("gulp-plumber"),
    babel       = require('gulp-babel'),
    browserify  = require('browserify'),
    babelify    = require('babelify'),
    source      = require('vinyl-source-stream'),
    spawn       = require('child_process').spawn,
    livereload  = require('gulp-livereload'),
    runSequence = require('run-sequence'),
    server;

// transpile for browser side js
gulp.task('js.browserify', function() {
  srcFiles = glob.sync('public/src/es6/*.js');
  return browserify(srcFiles, { debug: true })
    .transform(babelify)
    .bundle()
    .on("error", function (err) { console.log("Error : " + err.message); })
    .pipe(source('client.js'))
    .pipe(gulp.dest('public/src/concat/js/'))
});

// transpile & concat & uglify
gulp.task('nodejs.transpile', function() {
  return gulp.src('src/es6/*.js')
    .pipe(plumber())
    .pipe(babel())
    .pipe(gulp.dest('./'));
});
gulp.task('js.uglify', function() {
  return gulp.src('public/src/concat/js/client.js')
    .pipe(plumber())
    .pipe(uglify())
    .pipe(rename('client.min.js'))
    .pipe(gulp.dest('public/js/'));
});

// js build
gulp.task('js', function() {
  runSequence('js.browserify', 'js.uglify');
});

// server with node
gulp.task('server', function() {
  if(server){
    server.kill('SIGKILL');
    server=undefined;
  }

  // start server
  server = spawn('node', ['index']);

  // console output
  server.stdout.setEncoding('utf8');
  server.stdout.on('data', function(data){
    console.log(data);
  });
  // console output with error
  server.stderr.setEncoding('utf8');
  server.stderr.on('data', function(data){
    console.log(data);
  });

  livereload.listen();
});

// reload browser
gulp.task('reload', function() {
  gulp.src(['public/*/*', 'views/*'])
    .pipe(livereload());
});

// server restart and browser reload
gulp.task('server.reload', function() {
  runSequence('server', 'reload');
});

// watch
gulp.task('watch',['server'],function(){
  // watch for compile
  gulp.watch(['public/src/es6/*.js', 'public/src/es6/util/*.js'], ['js']);
  // watch for node compile
  gulp.watch(['src/es6/index.js'], ['nodejs.transpile']);
  // watch for server restart
  gulp.watch(['index.js'], ['server.reload']);
  // watch for browser reload
  gulp.watch(['public/*/*', 'views/*'], ['reload']);
});

gulp.task('default', ['server']);
