var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    pug = require('gulp-pug'),
    uglify = require('gulp-uglify'),
    gls = require('gulp-live-server');

function errorLog(error) {
  console.error.bind(error);
  this.emit('end');
}

gulp.task('scripts', function () {
  return gulp.src('./src/js/**/*.js')
    .pipe(uglify())
    .pipe(concat('scripts.min.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('sass', function () {
  return gulp.src('./src/sass/**/*.sass')
    .pipe(sass())
    .on('error', errorLog)
    .pipe(gulp.dest('./src/css'));
});

gulp.task('clean-css', function () {
  return gulp.src('./src/css/**/*.css')
    .pipe(cleanCSS())
    .pipe(autoprefixer('last 15 versions', 'safari 5', 'ie 7', 'ie 8', 'ie 9'))
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('views', function buildHTML() {
  return gulp.src('./src/views/*.pug')
  .pipe(pug({
    pretty: true
  }))
  .on('error', errorLog)
  .pipe(gulp.dest('./dist'));
});

gulp.task('serve', function() {
  var server = gls.static('./dist', 8888);
  server.start();
  gulp.watch(['./dist/**/*.css', './dist/js/**/*.js', './dist/**/*.html'], function (file) {
   server.notify.apply(server, [file]);
 });
});

gulp.task('build', ['sass', 'clean-css', 'views', 'scripts']);

gulp.task('watch', function () {
  gulp.watch('./src/js/**/*.js', ['scripts']);
  gulp.watch('./src/sass/**/*.sass', ['sass']);
  gulp.watch('./src/css/**/*.css', ['clean-css']);
  gulp.watch('./src/views/*.pug', ['views']);
  gulp.watch('./src/views/partials/*.pug', ['views']);
});

gulp.task('default', ['sass', 'clean-css', 'views', 'watch', 'serve', 'scripts']);
