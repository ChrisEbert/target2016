const electron = require('electron');
const {app, BrowserWindow} = electron;
const config = require('./package.json');
const client = require('electron-connect').client;
let mainWindow = null;

require('electron-debug')({
    showDevTools: true
});

app.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
   app.quit();
  }
});

app.on('ready', function () {
  mainWindow = new BrowserWindow({
    width: 320,
    height: 500,
    title: config.name
  });

  mainWindow.loadURL('file://' + __dirname + '/index.html');

  client.create(mainWindow);

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
});
