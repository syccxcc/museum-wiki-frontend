import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WikiEntryEditorComponent } from './wiki-entry-editor.component';

describe('WikiEntryEditorComponent', () => {
  let component: WikiEntryEditorComponent;
  let fixture: ComponentFixture<WikiEntryEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WikiEntryEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WikiEntryEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
