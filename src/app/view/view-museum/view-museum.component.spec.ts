import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMuseumComponent } from './view-museum.component';

describe('ViewMuseumComponent', () => {
  let component: ViewMuseumComponent;
  let fixture: ComponentFixture<ViewMuseumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMuseumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMuseumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
