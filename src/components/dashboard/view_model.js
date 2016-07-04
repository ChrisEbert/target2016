import {useView} from 'aurelia-framework';

@useView('./dashboard/view.html')
export class Dashboard {

  constructor() {

    const remote = require('electron').remote;
    remote.getCurrentWindow().maximize();

  }

}
