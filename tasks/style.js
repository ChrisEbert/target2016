const gulp      = require('gulp');
const postcss   = require('gulp-postcss');
const cssnext   = require('postcss-cssnext');
const cssImport = require('postcss-import');
const cssnano   = require('cssnano');
const nested    = require('postcss-nested');
const extend    = require('postcss-extend');
const rename    = require('gulp-rename');

module.exports = project => {
  return gulp.src('./src/assets/css/styles.css')
              .pipe(postcss([
                cssImport,
                nested,
                extend,
                cssnext(),
                cssnano({
                  zindex: false
                })
              ]))
              .pipe(rename('styles.min.css'))
              .pipe(gulp.dest('./src/assets/css/'));
}
