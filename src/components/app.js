import {EventAggregator} from 'aurelia-event-aggregator';
import {inject} from 'aurelia-framework';

@inject(EventAggregator)
export class App {

  constructor(eventAggregator) {
    this.eventAggregator = eventAggregator;
  }

  configureRouter(config, router) {
    config.map([
      {
        route: '',
        name: 'tournament',
        moduleId: './tournament/view_model',
        nav: false
      },
      {
        route: 'dashboard',
        name: 'dashboard',
        moduleId: './dashboard/view_model',
        nav: false
      },
      {
        route: 'results',
        name: 'results',
        moduleId: './results/view_model',
        nav: true,
        title: 'Ergebnisse'
      },
      {
        route: 'participants',
        name: 'participants',
        moduleId: './participants/view_model',
        nav: true,
        title: 'Teilnehmer'
      },
      {
        route: 'teams',
        name: 'teams',
        moduleId: './teams/view_model',
        nav: true,
        title: 'Teams'
      },
      {
        route: 'assignment',
        name: 'assignment',
        moduleId: './assignment/view_model',
        nav: true,
        title: 'Scheibenbelegung'
      },
    ]);

    this.router = router;
  }

  static setAppTitle(title) {
    const remote = require('electron').remote;
    const config = require('./package.json');
    const dialog = remote.dialog;
    const browserWindow = remote.getCurrentWindow();

    browserWindow.setTitle(`${title} - ${config.name}`);
  }

  toggleSidebar() {
    document.querySelector('#sidebar').classList.toggle('open');
  }
}
