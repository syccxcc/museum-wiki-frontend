import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ViewComponent} from './view.component';
import {ActivatedRoute, convertToParamMap, Router} from '@angular/router';
import {of} from 'rxjs';
import {MuseumService} from '../../services/wiki-entry/museum.service';
import {Museum} from '../../models/museum';
import {ProtoMuseum} from '../../services/object-prototypes/proto-museum';
import {CollectionService} from '../../services/wiki-entry/collection.service';
import {LoadingComponent} from '../../static/loading/loading.component';
import {WikiEntryViewComponent} from '../wiki-entry-view/wiki-entry-view.component';
import {WikiEntry} from '../../models/wiki-entry';
import {TextLimitPipe} from '../../helper/text-limit.pipe';
import {ProtoCollection} from '../../services/object-prototypes/proto-collection';
import {Collection} from '../../models/collection';
import {Artifact} from '../../models/artifact';
import {ArtifactService} from '../../services/wiki-entry/artifact.service';
import {CollectionBuilder} from '../../models/builders/collection-builder';
import {PrototypeBuilder} from '../../models/builders/prototype-builder';

describe('ViewComponent', () => {
  let component: ViewComponent;
  let fixture: ComponentFixture<ViewComponent>;

  let activatedRouteStub: Partial<ActivatedRoute>;
  let museumServiceStub;
  let collectionServiceStub;
  let artifactServiceStub;

  function changeActivatedRoute(viewCategory: string, id: number): void {
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
        {provide: ArtifactService, useValue: artifactServiceStub},
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
    const testId = 123;
    const testCategory = 'museum';

    const protoMuseum = new ProtoMuseum();
    protoMuseum.museum = new Museum(testName, testIntro, '', '', testId);
    protoMuseum.collectionList = [new WikiEntry('', '', '', '', 0)];

    changeActivatedRoute(testCategory, testId);
    const museumService = jasmine.createSpyObj('MuseumService', ['getMuseum']);
    const spy = museumService.getMuseum.and.returnValue(of(protoMuseum));
    museumServiceStub = museumService;

    prepareDependencies();
    createComponent();

    expect(component).toBeTruthy();
    expect(component.viewCategory).toEqual(testCategory);
    expect(component.id).toEqual(testId.toString());
    expect(component.loading).toBe(false);
    expect(component.error).toBe(false);
    expect(component.parentName).toEqual(undefined);
    expect(component.content).toEqual(protoMuseum.museum);
    expect(component.contentSubList).toEqual(protoMuseum.collectionList);
  });

  it('should display collection info', () => {
    const testName = 'Ancient Artifacts';
    const testIntro = 'Contains artifacts before 600BC';
    const testId = 123;
    const testCategory = 'collection';

    const protoCollection = new ProtoCollection();
    protoCollection.museum = new Museum(testName, testIntro, '', '', testId);
    protoCollection.collection = new Collection(new WikiEntry(testName, testIntro, '', '', testId), undefined);
    protoCollection.artifactList = [];

    const testCollection = PrototypeBuilder.buildFromPrototype({collection: protoCollection}) as Collection;
    protoCollection.collection = testCollection;

    changeActivatedRoute(testCategory, testId);
    const collectionService = jasmine.createSpyObj('CollectionService', ['getCollection']);
    const spy = collectionService.getCollection.and.returnValue(of(protoCollection));
    collectionServiceStub = collectionService;

    prepareDependencies();
    createComponent();

    expect(component).toBeTruthy();
    expect(component.viewCategory).toEqual(testCategory);
    expect(component.id).toEqual(testId.toString(10));
    expect(component.loading).toBe(false);
    expect(component.error).toBe(false);
    expect(component.content).toEqual(testCollection);
    expect(component.parentName).toEqual('museum');
    expect(component.contentParents).toEqual([protoCollection.museum]);
    expect(component.subListName).toEqual('Artifact');
    expect(component.contentSubList).toEqual(protoCollection.artifactList);
  });

});
