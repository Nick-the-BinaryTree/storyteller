import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';

import { showEditStageFormActionCreator, showNewStageFormActionCreator } from '../actions';
import { IAppState, StageType } from '../store-settings/store-types';
import { getAct } from '../reducers/reducer.utils';
import { Observable } from 'rxjs';

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

  addStage() {
    this.ngRedux.dispatch(showNewStageFormActionCreator());
  }

  selectStage(i: number) {
    this.ngRedux.dispatch(showEditStageFormActionCreator(i));
  }
}
