import { AfterViewInit, Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { urlValidator } from '../global-utils/validator-utils';
import { NgRedux } from '@angular-redux/store';
import { IAppState, StageType } from '../store-settings/store-types';
import { addStageActionCreator, editStageActionCreator } from '../actions';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-stage-form',
  templateUrl: './stage-form.component.html',
  styleUrls: ['./stage-form.component.css']
})
export class StageFormComponent implements AfterViewInit {
  @Input() stageData: Observable<StageType>;
  @Input() stageIndex: number;
  form: FormGroup;
  stageDataSub: Subscription;

  constructor(
    private fb: FormBuilder, 
    private ngRedux: NgRedux<IAppState>
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      backgroundImageURL: ['', [Validators.required, urlValidator]]
    });
  }

  ngAfterViewInit() {
    this.stageDataSub = this.stageData.subscribe((s: StageType) => {
      if (s == null) {
        return;
      }
      this.form.controls.name.setValue(s.name);
      this.form.controls.backgroundImageURL
        .setValue(s.backgroundImageURL);
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

  ngOnDestroy() {
    this.stageDataSub.unsubscribe();
  }
}
