import { AfterViewInit, Component } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { CharacterType, IAppState } from '../store-settings/store-types';
import { merge, Observable, Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { urlValidator } from '../global-utils/validator-utils';
import { addCharacterActionCreator, editCharacterActionCreator, deleteCharacterActionCreator, hideEditCharacterFormActionCreator } from '../actions';

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
  @select(state => state.currentCharacter) characterIndex$: number;
  character: Subscription;
  form: FormGroup;
  isNewCharacter: boolean;
  moodKeyPrefix = 'moodKey';
  moodValuePrefix = 'moodValue';
  moods = { ambivalent: 'http://tim.com/pensiveTim.jpg', cyborgMode: 'http://tim.com/robotTim.jpg' };

  constructor(
    private fb: FormBuilder,
    private ngRedux: NgRedux<IAppState>
  ) {
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

  ngAfterViewInit() {
    this.character = merge(this.characterData$, this.characterIndex$)
      .subscribe((x: any) => {
        if (x == null) {
          return;
        }
        if (isNaN(x)) {
          this.form.get(REQUIRED_PROPS.NAME).setValue(x.name);
          this.form.get(REQUIRED_PROPS.DEFAULT_IMAGE_URL)
            .setValue(x.defaultImageURL);
          this.isNewCharacter = false;
        } else if (x === -1) {
          this.form.reset();
          this.isNewCharacter = true;
        }
      });
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

  onSubmit() {
    const dispatchObj = this.parseForm(this.form.getRawValue());
    const toDispatch = this.isNewCharacter
      ? addCharacterActionCreator(dispatchObj)
      : editCharacterActionCreator(dispatchObj);
    
    this.ngRedux.dispatch(toDispatch);
    this.close();
  }

  ngOnDestroy() {
    this.character.unsubscribe();
  }

}
