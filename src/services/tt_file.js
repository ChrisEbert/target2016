import PouchDB from 'pouchdb';
import replicationStream from 'pouchdb-replication-stream';

PouchDB.plugin(replicationStream.plugin);
PouchDB.adapter('writableStream', replicationStream.adapters.writableStream);

export function saveAsDialog({content, success, error}) {
  const fs = require('fs');
  const remote = require('electron').remote;
  const dialog = remote.dialog;
  const browserWindow = remote.getCurrentWindow();

  dialog.showSaveDialog(browserWindow, {}, (filename) => {

    if (typeof filename === 'string') {
      const file = `${filename}.tt`;

      fs.stat(file, (err, stat) => {
          if(err == null) {
            //file exists
            dialog.showMessageBox(browserWindow, {
              type: 'error',
              message: 'Die datei existiert bereits',
              buttons: ['Neue Datei auswählen', 'Datei überschreiben']
            }, (index) => {
              if (index === 0) {
                //neue datei
                saveAsDialog({succes, error});
              }
              else if (index === 1) {
                //überschreiben
                storeFilePath(file).then(() => {
                  return writeFile(file);
                }).then(() => {
                  success(file);
                });
              }
            });
          }
          else if(err.code == 'ENOENT') {
            //file doesnt exists
            storeFilePath(file).then(() => {
              return writeFile(file);
            }).then(() => {
              success(file);
            });
          }
          else {
            //any other error
            error(err.code);
          }
      });
    }
  });
}

export function openDialog({success, error}) {
  const fs = require('fs');
  const remote = require('electron').remote;
  const dialog = remote.dialog;
  const browserWindow = remote.getCurrentWindow();

  dialog.showOpenDialog(browserWindow, {
    properties: ['openFile'],
    filters: [
      {
        name: 'Custom File Type',
        extensions: ['tt']
      }
    ]
  }, (files) => {
    if (files && files.length > 0) {
      let rs = fs.createReadStream(files[0]);

      window.db.load(rs).then(function (res) {
        success();
      });
    }
  });
}

export function save() {
  window.db.get('file').then(data => {
      writeFile(data.path);
      console.log('saved');
  });
}

function storeFilePath(file) {
  return window.db.get('file').then(doc => {
    return window.db.put({
      _id: 'file',
      _rev: doc._rev,
      path: file
    });
  }).catch(err => {
    return window.db.put({
      _id: 'file',
      path: file
    });
  });
}

function writeFile(file) {
  const fs = require('fs');
  let ws = fs.createWriteStream(file);

  return window.db.dump(ws);
}
