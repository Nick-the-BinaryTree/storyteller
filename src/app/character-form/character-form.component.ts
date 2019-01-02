import { AfterViewInit, Component } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { CharacterType, IAppState } from '../store-settings/store-types';
import { merge, Observable, Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { urlValidator } from '../global-utils/validator-utils';
import { addCharacterActionCreator, editCharacterActionCreator, deleteCharacterActionCreator } from '../actions';

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
  moods = [ 'ambivalent: http://tim.com/pensiveTim.jpg', 'cyborgMode: http://tim.com/robotTim.jpg' ];

  constructor(
    private fb: FormBuilder,
    private ngRedux: NgRedux<IAppState>
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      defaultImageURL: ['', [Validators.required, urlValidator]]
    });
  }

  ngAfterViewInit() {
    this.character = merge(this.characterData$, this.characterIndex$)
      .subscribe((x: any) => {
        if (x == null) {
          return;
        }
        if (isNaN(x)) {
          this.form.get('name').setValue(x.name);
          this.form.get('defaultImageURL')
            .setValue(x.defaultImageURL);
          this.isNewCharacter = false;
        } else if (x === -1) {
          this.form.reset();
          this.isNewCharacter = true;
        }
      });
  }

  deleteThisCharacter() {
    this.ngRedux.dispatch(deleteCharacterActionCreator());
  }

  onSubmit() {
    const { defaultImageURL, name } = this.form.getRawValue();
    const dispatchObj = { defaultImageURL, moodImageURLs: {}, name };
    const toDispatch = this.isNewCharacter
      ? addCharacterActionCreator(dispatchObj)
      : editCharacterActionCreator(dispatchObj);
    
      this.ngRedux.dispatch(toDispatch);
  }

  ngOnDestroy() {
    this.character.unsubscribe();
  }

}
