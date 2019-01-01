import { AfterViewInit, Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { urlValidator } from '../global-utils/validator-utils';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState, StageType } from '../store-settings/store-types';
import { addStageActionCreator, editStageActionCreator } from '../actions';
import { Observable, Subscription, merge } from 'rxjs';
import { getAct } from '../reducers/reducer.utils';

@Component({
  selector: 'app-stage-form',
  templateUrl: './stage-form.component.html',
  styleUrls: ['./stage-form.component.css']
})
export class StageFormComponent implements AfterViewInit {
  @select(state => getAct(state).stages[state.currentStage])
    stageData$: Observable<StageType>;
  @select(state => state.currentStage) stageIndex$: number;
  characters = ['Todd', 'Randy'];
  form: FormGroup;
  isNewStage: boolean;
  stage: Subscription;

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
    this.stage = merge(this.stageData$, this.stageIndex$)
      .subscribe((x: any) => {
      if (x == null) {
        return;
      }
      if (isNaN(x)) {
        this.form.get('name').setValue(x.name);
        this.form.get('backgroundImageURL')
          .setValue(x.backgroundImageURL);
        this.isNewStage = false;
      } else if (x === -1) {
        this.form.reset();
        this.isNewStage = true;
      }
    });
  }

  onSubmit() {
    const { backgroundImageURL, name } = this.form.getRawValue();
    const dispatchObj = { backgroundImageURL, characters: [], name, dialog: null };
    const toDispatch  = this.isNewStage
    ? addStageActionCreator(dispatchObj)
    : editStageActionCreator(dispatchObj)

    this.ngRedux.dispatch(toDispatch);
  }

  ngOnDestroy() {
    this.stage.unsubscribe();
  }
}
