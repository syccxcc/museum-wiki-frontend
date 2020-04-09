import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInCategoryComponent } from './search-in-category.component';

describe('SearchInCategoryComponent', () => {
  let component: SearchInCategoryComponent;
  let fixture: ComponentFixture<SearchInCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchInCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchInCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
