import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { urlValidator } from '../global-utils/validator-utils';
import { NgRedux } from '@angular-redux/store';
import { IAppState, StageType } from '../store-settings/store-types';
import { addStageActionCreator, editStageActionCreator } from '../actions';

@Component({
  selector: 'app-stage-form',
  templateUrl: './stage-form.component.html',
  styleUrls: ['./stage-form.component.css']
})
export class StageFormComponent implements OnInit {
  @Input() stageData: StageType;
  @Input() stageIndex: number;
  form: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private ngRedux: NgRedux<IAppState>
  ) {
  }

  ngOnInit() {
    let initName = '';
    let initBgImgURL = '';

    if (this.stageData != null) {
      initName = this.stageData.name;
      initBgImgURL = this.stageData.backgroundImageURL;
    }

    this.form = this.fb.group({
      name: [initName, Validators.required],
      bgImgURL: [initBgImgURL, [Validators.required, urlValidator]]
    });
  }

  onSubmit(form: FormGroup) {
    const { backgroundImageURL, name } = form.getRawValue();
    const dispatchObj = { backgroundImageURL, name, dialog: null };
    const toDispatch  = this.stageIndex === -1
    ? addStageActionCreator(dispatchObj)
    : editStageActionCreator(dispatchObj)

    this.ngRedux.dispatch(toDispatch);
  }

}
