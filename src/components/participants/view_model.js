
import {Validation} from 'aurelia-validation';
import {inject, useView} from 'aurelia-framework';

@useView('./participants/view.html')
@inject('targetDB', Validation)
export class Participants {

  constructor(storage, validation) {
    this.storage = storage;

    this.participants = [];
    this.clubs = [];
    this.fetchParticipants();
    this.fetchClubs();

    this.formInput = {
      firstname: '',
      lastname: '',
      club: '',
      class: ''
    };

    this.classes = [
      {
        id: 0,
        name: 'recurve'
      }
    ];

    this.formInput.validation = validation.on(this.formInput)
      .ensure('firstname')
        .isNotEmpty()
      .ensure('lastname')
        .isNotEmpty();
  }

  submitRoutine() {
    this.addClub().then(response => {
      return this.addParticipant(response.id);
    }).then(() => {
      this.fetchParticipants();
      this.fetchClubs();
    });
  }

  fetchClubs() {
    this.storage.allDocs({
      include_docs: true,
      startkey: 'club_',
      endkey: 'club_\uffff'
    }).then((data) => {
      this.clubs = data.rows;
    }).catch(function (err) {
      console.log(err);
    });
  }

  fetchParticipants() {
    this.storage.allDocs({
      include_docs: true,
      startkey: 'participant_',
      endkey: 'participant_\uffff'
    }).then((data) => {
      this.participants = data.rows;
    }).catch(function (err) {
      console.log(err);
    });
  }

  autocomplete() {
    this.storage.allDocs({
      include_docs: true,
      startkey: 'club_',
      endkey: 'club_\uffff'
    }).then((data) => {
      this.clubs = data.rows.filter(row => {
        return row.doc.name.includes(this.formInput.club);
      });
    }).catch(function (err) {
      console.log(err);
    });
  }

  addClub() {
    return this.storage.put({
      _id: `club_${new Date().toJSON()}`,
      name: this.formInput.club
    });
  }

  addParticipant(club) {
    return this.storage.put({
      _id: `participant_${new Date().toJSON()}`,
      firstname: this.formInput.firstname,
      lastname: this.formInput.lastname,
      club: club,
      class: this.formInput.class
    });
  }

}
