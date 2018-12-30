import { Component, OnInit } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';

import { Observable, Subscription } from 'rxjs';

import { addStageActionCreator, editStageActionCreator } from '../actions';
import { getAct } from '../reducers/reducer.utils';
import { IAppState, ActType } from '../store-settings/store-types';

@Component({
  selector: 'app-stage-editor-index',
  templateUrl: './stage-editor-index.component.html',
  styleUrls: ['./stage-editor-index.component.css']
})
export class StageEditorIndexComponent implements OnInit {
  @select(state => getAct(state)) actData$: Observable<ActType>;
  actData: ActType;
  actSub: Subscription;

  stageBackgroundInput: string;
  stageNameInput: string;

  constructor(private ngRedux: NgRedux<IAppState>) { }

  ngOnInit() {
    this.actSub = this.actData$
      .subscribe(() => {
        this.actData = getAct(this.ngRedux.getState());
      });
  }

  addStage() {
    this.ngRedux.dispatch(addStageActionCreator({ 
      name: this.stageNameInput,
      backgroundImageURL: this.stageBackgroundInput,
      dialog: null
    }));
  }

  editStage() {
    this.ngRedux.dispatch(editStageActionCreator({ 
      name: this.stageNameInput,
      backgroundImageURL: this.stageBackgroundInput,
      dialog: null
    }));
  }

  ngOnDestroy() {
    this.actSub.unsubscribe();
  }

}
