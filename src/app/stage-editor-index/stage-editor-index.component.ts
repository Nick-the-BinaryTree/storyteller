import { Component, OnInit } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';

import { Observable, Subscription } from 'rxjs';

import { getAct } from '../reducers/reducer.utils';
import { IAppState, ActType, StageType } from '../store-settings/store-types';

@Component({
  selector: 'app-stage-editor-index',
  templateUrl: './stage-editor-index.component.html',
  styleUrls: ['./stage-editor-index.component.css']
})
export class StageEditorIndexComponent implements OnInit {
  @select(state => state) state$: Observable<IAppState>;
  actData: ActType;
  currentAct: number;
  currentCharacter: number;
  currentPath: string;
  currentStage: number;
  showCharacterSelect: boolean;
  showDialogEditor: boolean;
  stateSub: Subscription;

  constructor(private ngRedux: NgRedux<IAppState>) { }

  ngOnInit() {
    this.stateSub = this.state$
      .subscribe(() => {
        const state = this.ngRedux.getState();

        this.actData = getAct(state);
        this.currentAct = state.currentAct;
        this.currentCharacter = state.currentCharacter;
        this.currentPath = state.currentPath;
        this.currentStage = state.currentStage;
        this.showCharacterSelect = state.showCharacterSelect;
        this.showDialogEditor = state.showDialogEditor;
      });
  }

  

  ngOnDestroy() {
    this.stateSub.unsubscribe();
  }

}
