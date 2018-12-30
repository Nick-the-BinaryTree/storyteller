import { Component, OnInit, Input } from '@angular/core';

import { StageType } from '../store-settings/store-types';

@Component({
  selector: 'app-stage-select',
  templateUrl: './stage-select.component.html',
  styleUrls: ['./stage-select.component.css']
})
export class StageSelectComponent implements OnInit {
  @Input() stages: Array<StageType>

  constructor() { }

  ngOnInit() {
  }

}
