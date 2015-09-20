var gulp       = require("gulp"),
    uglify     = require("gulp-uglify"),
    concat     = require("gulp-concat"),
    rename     = require('gulp-rename'),
    plumber    = require("gulp-plumber"),
    spawn      = require('child_process').spawn,
    livereload = require('gulp-livereload'),
    server;

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

// server with node
gulp.task('server',function(){
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
})

// reload browser
gulp.task('reload', function() {
  gulp.src(['public/*/*', 'views/*'])
    .pipe(livereload());
})

// watch
gulp.task('watch',['server'],function(){
  livereload.listen();

  // watch for compile
  gulp.watch(['public/src/js/*.js'], ['js']);
  // watch for server restart
  gulp.watch(['index.js'], ['server']);
  // watch for browser reload
  gulp.watch(['index.js', 'public/*/*', 'views/*'], ['reload']);
})

gulp.task('default', ['js']);
