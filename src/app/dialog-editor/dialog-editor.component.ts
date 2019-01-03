import { Component, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { hideEditDialogActionCreator } from '../actions';
import { IAppState } from '../store-settings/store-types';

@Component({
  selector: 'app-dialog-editor',
  templateUrl: './dialog-editor.component.html',
  styleUrls: ['./dialog-editor.component.css']
})
export class DialogEditorComponent implements OnInit {

  constructor(private ngRedux: NgRedux<IAppState>) { }

  ngOnInit() {
  }

  close() {
    this.ngRedux.dispatch(hideEditDialogActionCreator());
  }

}
