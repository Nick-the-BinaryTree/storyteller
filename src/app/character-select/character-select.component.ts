import { Component, OnInit } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { CharacterType, IAppState } from '../store-settings/store-types';
import { showNewCharacterFormActionCreator, showEditCharacterFormActionCreator } from '../actions';

@Component({
  selector: 'app-character-select',
  templateUrl: './character-select.component.html',
  styleUrls: ['./character-select.component.css']
})
export class CharacterSelectComponent implements OnInit {
  @select(state => state.characters) characters$: Array<CharacterType>;
  @select(state => state.currentCharacter) currentCharacter$: Observable<number>;

  constructor(private ngRedux: NgRedux<IAppState>) { }

  ngOnInit() {
  }

  newCharacter() {
    this.ngRedux.dispatch(showNewCharacterFormActionCreator());
  }

  selectCharacter(i: number) {
    this.ngRedux.dispatch(showEditCharacterFormActionCreator(i));
  }

}
