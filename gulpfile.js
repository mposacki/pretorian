const gulp = require("gulp"),
  $ = require("gulp-load-plugins")({
    lazy: true
  }),
  svgSprite = require('gulp-svg-sprite'),
  browserSync = require('browser-sync'),
  runSequence = require("run-sequence"),
  webpack = require('webpack'),
  named = require('vinyl-named'),
  cleanCSS = require('gulp-clean-css'),
  sourcemaps = require('gulp-sourcemaps'),
  webpackStream = require('webpack-stream'),
  webpackConfigDev = require('./webpack.dev.js'),
  webpackConfigProd = require('./webpack.prod.js');

  config = {
    mode: {
      symbol: true
    }
  };

gulp.task('svg-sprite', function() {
  gulp.src('*.svg', {
      cwd: 'src/assets/images/svg'
    })
    .pipe(svgSprite(config))
    .pipe(gulp.dest('src/assets/images'));
})

gulp.task('browser-sync', ['sass'], function () {
  browserSync.init({
    server: {
      baseDir: "./src"
    },
    https: true
  });
});

gulp.task('sass', function () {
  return gulp.src('src/scss/main.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      onError: browserSync.notify
    }))
    .on('error', $.sass.logError)
    .pipe($.autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
      cascade: true
    }))

    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('src/assets/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('minifycss', () => {
  return gulp.src('src/assets/css/main.css')
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/assets/css'));
});

gulp.task('imagemin', function () {
  gulp.src('src/assets/images/**/*')
    .pipe(gulp.dest('dist/assets/images'))
});

gulp.task('copy', function () {
  gulp.src('src/index.html')
    .pipe(gulp.dest('dist'))
});

gulp.task('js:dev', () => {
  gulp.src('src/scripts/main.js')
    .pipe($.plumber())
    .pipe(named())
    .pipe(webpackStream(webpackConfigDev), webpack)
    .pipe(browserSync.reload({
      stream: true
    }))
    .pipe(gulp.dest('src/assets/js'));
});

gulp.task('js:prod', () => {
  gulp.src('src/scripts/main.js')
    .pipe(named())
    .pipe(webpackStream(webpackConfigProd, webpack))
    .pipe(gulp.dest('dist/assets/js'));
});

gulp.task('watch', function () {
  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch('src/scripts/**/*.js', ['js:dev']);
});

gulp.task("build", function (callback) {
  runSequence('copy', 'sass', 'minifycss', 'js:prod', 'imagemin', callback);
});

gulp.task('default', ['sass', 'browser-sync', 'watch', 'js:dev']);