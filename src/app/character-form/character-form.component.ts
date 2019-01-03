import { AfterViewInit, Component } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { CharacterType, IAppState, MoodType } from '../store-settings/store-types';
import { merge, Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { urlValidator } from '../global-utils/validator-utils';
import { addCharacterActionCreator, editCharacterActionCreator, deleteCharacterActionCreator, hideEditCharacterFormActionCreator } from '../actions';
import { getMoods } from '../global-utils/state-utils';

const REQUIRED_PROPS = {
  NAME: 'name',
  DEFAULT_IMAGE_URL: 'defaultImageURL'
};

@Component({
  selector: 'app-character-form',
  templateUrl: './character-form.component.html',
  styleUrls: ['./character-form.component.css']
})
export class CharacterFormComponent implements AfterViewInit {
  @select(state => state.characters[state.currentCharacter])
    characterData$: Observable<CharacterType>
  @select(state => state.currentCharacter) characterIndex$: Observable<number>;
  @select(state => getMoods(state)) moods$: Observable<MoodType>;
  form: FormGroup;
  isNewCharacter: boolean;
  moodKeyPrefix = 'moodKey';
  moodValuePrefix = 'moodValue';
  moods = {};
  stateSub: Subscription;

  constructor(
    private fb: FormBuilder,
    private ngRedux: NgRedux<IAppState>
  ) {
    this.updateFormGroup();
  }

  ngAfterViewInit() {
    this.stateSub = merge(
      this.characterData$.pipe(
        tap((x: CharacterType) => {
          if (x == null) {
            return;
          }
          this.form.get(REQUIRED_PROPS.NAME).setValue(x.name);
          this.form.get(REQUIRED_PROPS.DEFAULT_IMAGE_URL)
            .setValue(x.defaultImageURL);
          this.isNewCharacter = false;
      })),
      this.characterIndex$.pipe(
        tap((x: number) => {
          if (x === -1) {
            this.form.reset();
            this.isNewCharacter = true;
          }
        })
      ),
      this.moods$.pipe(
        tap((x: MoodType) => {
          if (x == null) {
            return;
          }
          this.moods = x;
          this.updateFormGroup();
        }))
      )
      .subscribe(() => {});
  }

  close() {
    this.ngRedux.dispatch(hideEditCharacterFormActionCreator());
  }

  deleteThisCharacter() {
    this.ngRedux.dispatch(deleteCharacterActionCreator());
    this.close();
  }

  parseForm(form: any): CharacterType {
    const res = { name: '', defaultImageURL: '', moodImageURLs: {} };

    for (const prop in form) {
      if (prop === REQUIRED_PROPS.DEFAULT_IMAGE_URL || prop === REQUIRED_PROPS.NAME) {
        res[prop] = form[prop];
      } else if (prop.slice(0, this.moodKeyPrefix.length) === this.moodKeyPrefix) {
        const oldMood = prop.slice(this.moodKeyPrefix.length);
        const newMood = form[this.moodKeyPrefix+oldMood];

        res.moodImageURLs[newMood] = form[this.moodValuePrefix+oldMood];
      }
    }
    return res;
  }

  updateFormGroup() {
    const formGroupObj = {
      name: ['', Validators.required],
      defaultImageURL: ['', [Validators.required, urlValidator]]
    };
    for (const mood in this.moods) {
      formGroupObj[this.moodKeyPrefix+mood] = [mood, Validators.required]
      formGroupObj[this.moodValuePrefix+mood] = [this.moods[mood], Validators.required]
    }
    this.form = this.fb.group(formGroupObj);
  }

  onSubmit() {
    const dispatchObj = this.parseForm(this.form.getRawValue());
    const toDispatch = this.isNewCharacter
      ? addCharacterActionCreator(dispatchObj)
      : editCharacterActionCreator(dispatchObj);
    
    this.ngRedux.dispatch(toDispatch);
    this.close();
  }

  ngOnDestroy() {
    this.stateSub.unsubscribe();
  }

}
