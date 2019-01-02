import { Component, OnInit, AfterViewInit } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { Observable, Subscription } from 'rxjs';
import { CharacterType, IAppState } from '../store-settings/store-types';
import { showNewCharacterFormActionCreator, showEditCharacterFormActionCreator } from '../actions';
import { FormGroup, FormBuilder } from '@angular/forms';
import { getStageCharacters } from '../global-utils/state-utils';

@Component({
  selector: 'app-character-select',
  templateUrl: './character-select.component.html',
  styleUrls: ['./character-select.component.css']
})
export class CharacterSelectComponent implements AfterViewInit {
  @select(state => getStageCharacters(state))
    alreadySelected$: Observable<Array<String>>;
  @select(state => state.characters)
    characters$: Observable<Array<CharacterType>>;
  @select(state => state.currentCharacter)
    currentCharacter$: Observable<number>;
  alreadySelectedSub: Subscription;
  characters: Array<string>;
  charactersSub: Subscription;
  form: FormGroup;
  selected: Array<string>;

  constructor(
    private fb: FormBuilder,
    private ngRedux: NgRedux<IAppState>
  ) {
    this.alreadySelectedSub = this.alreadySelected$
      .subscribe((x: Array<string>) => {
        if (x == null || this.form == null) {
          return;
        }
        this.selected = x;
        this.form = this.fb.group({
          selected: this.fb.array(x.map(() => this.fb.control(false)))
        });
    });
    this.charactersSub = this.characters$
      .subscribe((x: Array<CharacterType>) => {
        if (x == null) {
          return;
        }
        this.characters = x.map(c => c.name);
        this.form = this.fb.group({
          selected: this.fb.array(this.characters.map(
            () => this.fb.control(true)))
        });
    });
  }

  ngAfterViewInit() { }

  addCharactersToStage() {
    if (this.form != null) {
      alert(JSON.stringify(this.form.getRawValue()));

    }
  }

  newCharacter() {
    this.ngRedux.dispatch(showNewCharacterFormActionCreator());
  }

  selectCharacterForEdit(i: number) {
    this.ngRedux.dispatch(showEditCharacterFormActionCreator(i));
  }

  ngOnDestroy() {
    this.alreadySelectedSub.unsubscribe();
    this.charactersSub.unsubscribe();
  }
}
