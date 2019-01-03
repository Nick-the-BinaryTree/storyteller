import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowCloseButtonComponent } from './window-close-button.component';

describe('WindowCloseButtonComponent', () => {
  let component: WindowCloseButtonComponent;
  let fixture: ComponentFixture<WindowCloseButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WindowCloseButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WindowCloseButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
