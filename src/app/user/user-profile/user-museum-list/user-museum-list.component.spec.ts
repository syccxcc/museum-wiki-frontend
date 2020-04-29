import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMuseumListComponent } from './user-museum-list.component';

describe('UserMuseumListComponent', () => {
  let component: UserMuseumListComponent;
  let fixture: ComponentFixture<UserMuseumListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMuseumListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMuseumListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
