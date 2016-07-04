const gulp = require('gulp');
const connect = require('electron-connect');

module.exports = () => {

  const electron = connect.server.create({
    path: './'
  });

  electron.start();

  const esentials = gulp.watch(['src/main.js', 'index.html']);

  esentials.on('change', () => {
    electron.restart();
  });

  const watcher = gulp.watch([
    'src/components/**/*',
    'src/services/**/*',
    'src/assets/css/**/*',
    'config.js'
  ], ['style']);

  watcher.on('change', () => {
    electron.reload();
  });
}
