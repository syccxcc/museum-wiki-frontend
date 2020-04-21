import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ViewComponent} from './view.component';
import {ActivatedRoute, convertToParamMap, Router} from '@angular/router';
import {of} from 'rxjs';
import {MuseumService} from '../../services/wiki-entry/museum.service';
import {Museum} from '../../models/Museum';
import {ProtoMuseum} from '../../services/wiki-entry/ProtoMuseum';
import {CollectionService} from '../../services/wiki-entry/collection.service';
import {AppComponent} from '../../app/app.component';
import {LoadingComponent} from '../../static/loading/loading.component';
import {WikiEntryViewComponent} from '../wiki-entry-view/wiki-entry-view.component';
import {MarkdownDisplayComponent} from '../../edit/markdown-display/markdown-display.component';
import {Collection} from '../../models/Collection';
import {WikiEntry} from '../../models/WikiEntry';
import {TextLimitPipe} from '../../helper/text-limit.pipe';

describe('ViewComponent', () => {
  let component: ViewComponent;
  let fixture: ComponentFixture<ViewComponent>;

  let activatedRouteStub: Partial<ActivatedRoute>;
  let museumServiceStub;
  let collectionServiceStub: Partial<CollectionService>;

  function changeActivatedRoute(viewCategory: string, id: string): void {
    activatedRouteStub = {
      paramMap: of(convertToParamMap({
        viewCategory,
        id,
      })),
    };
  }

  function prepareDependencies() {
    TestBed.configureTestingModule({
      declarations: [ViewComponent, LoadingComponent, WikiEntryViewComponent, TextLimitPipe],
      providers: [
        {provide: ActivatedRoute, useValue: activatedRouteStub},
        {provide: MuseumService, useValue: museumServiceStub},
        {provide: CollectionService, useValue: collectionServiceStub},
        {provide: Router, useValue: Router}]
    }).compileComponents();
  }

  function createComponent() {
    fixture = TestBed.createComponent(ViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  it('should display museum info', () => {
    const testName = 'Lekso Museum';
    const testIntro = 'This is Lekso\'s fancy museum';
    const testId = '123';
    const testCategory = 'museum';

    const protoMuseum = new ProtoMuseum();
    protoMuseum.museum = new Museum(testName, testIntro, '', '', testId);
    protoMuseum.collectionList = [new WikiEntry('', '', '', '', '')];

    changeActivatedRoute(testCategory, testId);
    const museumService = jasmine.createSpyObj('MuseumService', ['getMuseum']);
    const spy = museumService.getMuseum.and.returnValue(of(protoMuseum));
    museumServiceStub = museumService;

    prepareDependencies();
    createComponent();

    expect(component).toBeTruthy();
    expect(component.viewCategory).toEqual(testCategory);
    expect(component.id).toEqual(testId);
    fixture.detectChanges();
    expect(component.loading).toBe(false);
    expect(component.error).toBe(false);
    expect(component.parentName).toEqual(undefined);
    expect(component.content).toEqual(protoMuseum.museum);
    expect(component.contentSubList).toEqual(protoMuseum.collectionList);
  });

});
