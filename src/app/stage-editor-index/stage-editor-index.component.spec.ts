import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StageEditorIndexComponent } from './stage-editor-index.component';

describe('StageEditorIndexComponent', () => {
  let component: StageEditorIndexComponent;
  let fixture: ComponentFixture<StageEditorIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StageEditorIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StageEditorIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
