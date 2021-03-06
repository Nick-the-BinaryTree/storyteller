import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';

import { showEditStageFormActionCreator, showNewStageFormActionCreator } from '../actions';
import { IAppState, StageType } from '../store-settings/store-types';
import { Observable } from 'rxjs';
import { getAct } from '../global-utils/state-utils';

@Component({
  selector: 'app-stage-select',
  templateUrl: './stage-select.component.html',
  styleUrls: ['./stage-select.component.css']
})
export class StageSelectComponent implements OnInit {
  @select(state => state.currentStage) currentStage$: Observable<number>;
  @select(state => getAct(state).stages)
    stages$: Observable<Array<StageType>>;

  constructor(private ngRedux: NgRedux<IAppState>) { }

  ngOnInit() {
  }

  newStage() {
    this.ngRedux.dispatch(showNewStageFormActionCreator());
  }

  selectStage(i: number) {
    this.ngRedux.dispatch(showEditStageFormActionCreator(i));
  }
}
