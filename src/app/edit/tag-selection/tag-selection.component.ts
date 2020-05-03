import {Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {BasicEntry} from '../../models/basic-entry';
import {MuseumService} from '../../services/wiki-entry/museum.service';
import {ProtoMuseum} from '../../services/object-prototypes/proto-museum';
import {HttpErrorResponse} from '@angular/common/http';
import {Tag} from './tag';
import {ProjectConfigService} from '../../services/config/project-config.service';
import {ProjectConfig} from '../../config/ProjectConfig';

@Component({
  selector: 'app-tag-selection',
  templateUrl: './tag-selection.component.html',
  styleUrls: ['./tag-selection.component.css']
})

export class TagSelectionComponent implements OnInit, OnChanges {

  @Input() museumId!: number;
  @Input() existingCollections!: BasicEntry[] | undefined;
  @Input() allowEdit: boolean;

  tags: Tag[];

  idToTag;

  config: ProjectConfig;

  loading: boolean;
  error: boolean;

  constructor(private museumService: MuseumService,
              private projectConfigService: ProjectConfigService) {
    this.config = projectConfigService.getProjectConfig();
    this.loading = true;
    this.error = false;
    this.tags = [];
    this.idToTag = {};
  }

  ngOnInit(): void {
    this.ngOnChanges({
      museumId: new SimpleChange(undefined, this.museumId, true),
      existingCollections: new SimpleChange(undefined, this.existingCollections, true)
    });
  }

  updateIdToTag(): void {
    this.idToTag = {};
    this.tags.forEach(tag => this.idToTag[tag.id] = tag);
  }

  updateSelectedTags(): void {
    this.existingCollections?.forEach((collection: BasicEntry) => {
      if (this.idToTag[collection.id]) {
        this.idToTag[collection.id].selected = true;
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.museumId && this.museumId) {
      this.museumService.getMuseum(this.museumId).subscribe(
        (res: ProtoMuseum) => {
          this.tags = res.collectionList.map(Tag.of);
          this.updateIdToTag();
          this.updateSelectedTags();
          if (this.config.isLogging()) {
            console.log(this.tags);
          }
          this.loading = false;
        },
        (error: HttpErrorResponse) => {
          this.loading = false;
          this.error = true;
          console.log(error);
        });
    }
    if (changes.existingCollections && this.existingCollections) {
      this.updateSelectedTags();
    }
  }

  public selectTag(tag: Tag): void {
    tag.selected = !tag.selected;
  }

  public getAllSelectedTags(): BasicEntry[] {
    return this.tags
      .filter((tag) => tag.selected)
      .map((tag) => (tag as BasicEntry));
  }
}
