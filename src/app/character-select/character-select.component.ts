import { Component, OnInit, AfterViewInit } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { Observable, Subscription, merge } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IAppState, CharacterType } from '../store-settings/store-types';
import { showNewCharacterFormActionCreator, showEditCharacterFormActionCreator } from '../actions';
import { FormGroup, FormBuilder } from '@angular/forms';
import { getStageCharacters } from '../global-utils/state-utils';

@Component({
  selector: 'app-character-select',
  templateUrl: './character-select.component.html',
  styleUrls: ['./character-select.component.css']
})
export class CharacterSelectComponent implements AfterViewInit {
  @select (state => state.characters)
    allCharacters$: Observable<Array<CharacterType>>;
  @select(state => getStageCharacters(state))
    alreadySelected$: Observable<Array<string>>;
  @select(state => state.currentCharacter)
    currentCharacter$: Observable<number>;
  allCharacters: Array<string>;
  alreadySelected: Array<string> = [];
  displayCharacters: Array<string>;
  form: FormGroup;
  stateSub: Subscription;

  constructor(
    private fb: FormBuilder,
    private ngRedux: NgRedux<IAppState>
  ) {
    this.form = this.fb.group({ selected: [] });

    this.stateSub = merge(
      this.allCharacters$.pipe(
        tap(x => { this.allCharacters = x==null ? [] : x.map(c => c.name) })
      ),
      this.alreadySelected$.pipe(
        tap(x => { this.alreadySelected = x==null ? [] : x })
      )
    )
      .subscribe((x: any) => {
        this.displayCharacters = this.allCharacters
          .filter((c: string) => !this.alreadySelected.includes(c));

        this.form = this.fb.group({
          selected: this.fb.array(this.displayCharacters
            .map(() => this.fb.control(false))
          )});
      });
  }

  ngAfterViewInit() { }

  addCharactersToStage() {
    if (this.form != null) {
      alert(JSON.stringify(this.form.getRawValue()));

    }
  }

  globalCharacterIndex(i: number) {
    return this.allCharacters.indexOf(this.displayCharacters[i]);
  }

  newCharacter() {
    this.ngRedux.dispatch(showNewCharacterFormActionCreator());
  }

  selectCharacterForEdit(i: number) {
    this.ngRedux.dispatch(showEditCharacterFormActionCreator(
      this.globalCharacterIndex(i)));
  }

  ngOnDestroy() {
    this.stateSub.unsubscribe();
  }
}
