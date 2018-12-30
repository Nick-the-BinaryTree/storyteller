import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { urlValidator } from '../global-utils/validator-utils';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store-settings/store-types';
import { addStageActionCreator, editStageActionCreator } from '../actions';

@Component({
  selector: 'app-stage-form',
  templateUrl: './stage-form.component.html',
  styleUrls: ['./stage-form.component.css']
})
export class StageFormComponent implements OnInit {
  @Input() newStage: boolean;
  form: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private ngRedux: NgRedux<IAppState>
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      bgImgURL: ['', [Validators.required, urlValidator]]
    });
  }

  ngOnInit() {
  }

  onSubmit(form: FormGroup) {
    const { backgroundImageURL, name } = form.getRawValue();
    const dispatchObj = { backgroundImageURL, name, dialog: null };
    const toDispatch  = this.newStage
    ? addStageActionCreator(dispatchObj)
    : editStageActionCreator(dispatchObj)

    this.ngRedux.dispatch(toDispatch);
  }

}
