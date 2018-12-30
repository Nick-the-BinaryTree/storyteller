import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { urlValidator } from '../global-utils/validator-utils';

@Component({
  selector: 'app-stage-form',
  templateUrl: './stage-form.component.html',
  styleUrls: ['./stage-form.component.css']
})
export class StageFormComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      bgImgURL: ['', [Validators.required, urlValidator]]
    });
  }

  ngOnInit() {
  }

  onSubmit(form: FormGroup) {
    alert(JSON.stringify(form.getRawValue()));
  }

}
