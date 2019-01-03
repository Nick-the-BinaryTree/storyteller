import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-window-close-button',
  templateUrl: './window-close-button.component.html',
  styleUrls: ['./window-close-button.component.css']
})
export class WindowCloseButtonComponent implements OnInit {
  @Output() clickedClose = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  close() {
    this.clickedClose.emit();
  }

}
