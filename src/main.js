import PouchDB from 'pouchdb';

export function configure(aurelia) {
  indexedDB.deleteDatabase('_pouch_targetDB');
  window.db = new PouchDB('targetDB');

  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .instance('targetDB', window.db)
    .plugin('aurelia-validation');

  aurelia.start().then(a => a.setRoot('components/app'));
}
