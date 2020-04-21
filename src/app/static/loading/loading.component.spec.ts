import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LoadingComponent} from './loading.component';

describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoadingComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display loading text', () => {
    component.loading = true;
    component.error = false;
    fixture.detectChanges();
    const html: HTMLElement = fixture.nativeElement;
    expect(html.querySelector('p').textContent).toEqual(component.loadingMessage);
  });

  it('should display error text', () => {
    component.loading = true;
    component.error = true;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('p').textContent).toEqual(component.errorMessage);
  });

  it('should hide when not loading', () => {
    component.loading = false;
    component.error = false;
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toEqual('');
  });
});
