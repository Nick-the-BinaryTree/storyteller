import { Component, Input, OnInit } from '@angular/core';
import { FourTreeNodeType } from 'src/data-structures/four-tree';
import { NgRedux, select } from '@angular-redux/store';
import { CharacterType, IAppState } from '../store-settings/store-types';
import { Observable, Subscription } from 'rxjs';
import { MatSelectChange, MatCheckboxChange } from '@angular/material';

@Component({
  selector: 'app-dialog-node-form',
  templateUrl: './dialog-node-form.component.html',
  styleUrls: ['./dialog-node-form.component.css']
})
export class DialogNodeFormComponent implements OnInit {
  @select(state => state.characters)
    characters$: Observable<Array<CharacterType>>;
  @Input() data: FourTreeNodeType;
  characters: Array<CharacterType>;
  characterSub: Subscription;
  dialog: string;
  mood: string;
  moods: Array<string> = [];
  nextAct: boolean;
  speakers: Array<string> = [];
  speaker: string;

  constructor(private ngRedux: NgRedux<IAppState>) { }

  ngOnInit() {
    this.dialog = this.data.dialog;
    this.mood = this.data.mood;
    this.nextAct = this.data.nextAct;
    this.speaker = this.data.speaker;

    this.characterSub = this.characters$
      .subscribe((characters: Array<CharacterType>) => {
      this.characters = characters;
      this.speakers = characters.map((c: CharacterType) => c.name);

      this.updateMoods();
    })
  }

  updateMoods() {
    const selectedCharIndex = this.speakers.indexOf(this.speaker);

    if (selectedCharIndex !== -1 && this.characters != null) {
      this.moods = Object.keys(this.characters[selectedCharIndex].moodImageURLs);
    }
  }

  onDialogChange(e: Event) {
    this.dialog = this.data.dialog = (<HTMLInputElement>e.target).value;
  }

  onMoodChange(e: MatSelectChange) {
    this.mood = this.data.mood = e.value;
  }

  onNextActChange(e: MatCheckboxChange) {
    this.nextAct = this.data.nextAct = e.checked;
  }

  onSpeakerChange(e: MatSelectChange) {
    this.speaker = this.data.speaker = e.value;

    this.updateMoods();
  }

  ngOnDestroy() {
    this.characterSub.unsubscribe();
  }
}
