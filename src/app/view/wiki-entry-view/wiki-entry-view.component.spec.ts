import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WikiEntryViewComponent } from './wiki-entry-view.component';

describe('WikiEntryViewComponent', () => {
  let component: WikiEntryViewComponent;
  let fixture: ComponentFixture<WikiEntryViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WikiEntryViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WikiEntryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
