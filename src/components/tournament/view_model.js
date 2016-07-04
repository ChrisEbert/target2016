import {App} from '../app';
import {saveAsDialog, openDialog} from '../../services/tt_file';
import {inject, useView} from 'aurelia-framework';
import {Validation} from 'aurelia-validation';
import {Router} from 'aurelia-router';

@inject('targetDB', Validation, Router)
@useView('./tournament/view.html')
export class Tournament {

  doCreate = false;

  constructor(storage, validation, router) {
    this.router = router;
    this.storage = storage;

    this.formInput = {
      title: '',
      competition: ''
    };

    this.competitions = [
      {
        id: 0,
        title: '2x18m'
      },
      {
        id: 1,
        title: 'finale'
      }
    ];

    this.formInput.validation = validation.on(this.formInput)
      .ensure('title')
        .isNotEmpty()
      .ensure('competition')
        .isNotEmpty();
  }

  create() {
    this.doCreate = true;
  }

  load() {
    openDialog({
      success: () => {
        this.updateAppTitle();
        this.router.navigateToRoute('dashboard');
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  saveAs() {
    this.updateDb();

    saveAsDialog({
      success: () => {
        this.router.navigateToRoute('dashboard');
        this.updateAppTitle();
      },
      error: () => {

      }
    });
  }

  updateAppTitle() {
    this.storage.get('tournament').then((data) => {
      App.setAppTitle(data.title);
    });
  }

  updateDb() {
    this.storage.put({
      _id: 'tournament',
      title: this.formInput.title,
      competition: this.formInput.competition
    });
  }
}
