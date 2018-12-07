const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');

gulp.task('other', () =>
  gulp.src(process.cwd()+'/src/**/*.!(js)')
  .pipe(gulp.dest(process.cwd()+'/dist'))
);

gulp.task('babel', () =>
  gulp.src(process.cwd()+'/src/**/*.js')
  .pipe(sourcemaps.init())
  .pipe(babel())
  .on('error', function(err) {
        console.log('Error!', err.message);
        this.end();
      })
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(process.cwd()+'/dist'))
);

gulp.task('default', ['babel','other']);
