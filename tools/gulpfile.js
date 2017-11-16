//load plugins ======== create zjj ;
const
  gulp = require('gulp'),
  sass = require('gulp-sass'),
  util = require('gulp-util'),
  notify = require('gulp-notify'),
  autoPrefixer = require('gulp-autoprefixer'),
  argv = require('optimist').argv,
  plumber = require('gulp-plumber'),
  path = require('path');

let
  basePath = path.resolve(__dirname, '..');


gulp.task('sass', cd => (
  gulp.src(path.resolve(basePath, 'styles', 't5', 'index.scss'))
    .pipe(plumber())
    .pipe(sass({outputStyle: 'compact'}).on('error', sass.logError))
    .pipe(autoPrefixer({browsers: ['last 20 versions']}))
    .pipe(gulp.dest(path.resolve(basePath, 'html', 't5', 'css')))
    .pipe(notify("Found file: <%= file.relative %>!"))
    .on("error", notify.onError(function (error) {
      return "Message to the notifier: " + error.message;
    }))
));

gulp.task('watch', function(){
  gulp.watch(path.join(basePath, 'styles/**'), ['sass'])
});


gulp.task('default', argv.watch && ['watch']);