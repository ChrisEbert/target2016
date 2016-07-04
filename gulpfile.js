const gulp  = require('gulp');
const style = require('./tasks/style');
const watch = require('./tasks/watch');

gulp.task('style', () => {
  style();
});

gulp.task('watch', () => {
  watch();
});
