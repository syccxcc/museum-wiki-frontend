import {Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {BasicEntry} from '../../models/basic-entry';
import {MuseumService} from '../../services/wiki-entry/museum.service';
import {ProtoMuseum} from '../../services/object-prototypes/proto-museum';
import {HttpErrorResponse} from '@angular/common/http';
import {Tag} from './tag';
import {ProjectConfigService} from '../../services/config/project-config.service';
import {ProjectConfig} from '../../config/ProjectConfig';

/**
 * Allows the user to select/deselect tags from a list of tags
 */
@Component({
  selector: 'app-tag-selection',
  templateUrl: './tag-selection.component.html',
  styleUrls: ['./tag-selection.component.css']
})
export class TagSelectionComponent implements OnInit, OnChanges {

  /**
   * The id of the museum from which the program retrieves collection list
   */
  @Input() museumId!: number;
  /**
   * Collections already selected
   */
  @Input() existingCollections!: BasicEntry[] | undefined;
  /**
   * Whether the user is allowed to change selected tags
   */
  @Input() allowEdit: boolean;

  /**
   * A list of tags to be displayed in the template
   */
  tags: Tag[];

  /**
   * A dictionary that maps an id to the tag
   */
  idToTag;

  /**
   * Project configuration recording whether the program should be logged
   */
  config: ProjectConfig;

  /**
   * Whether the frontend is waiting for backend to return list of all collections of a museum
   */
  loading: boolean;
  /**
   * Whether a network error occurred
   */
  error: boolean;

  /**
   * Constructor
   *
   * @param museumService For getting collection list in a museum
   * @param projectConfigService Contains whether program activities should be logged
   */
  constructor(private museumService: MuseumService,
              private projectConfigService: ProjectConfigService) {
    this.config = projectConfigService.getProjectConfig();
    this.loading = true;
    this.error = false;
    this.tags = [];
    this.idToTag = {};
  }

  /**
   * Always trigger ngOnChanges when program starts
   */
  ngOnInit(): void {
    this.ngOnChanges({
      museumId: new SimpleChange(undefined, this.museumId, true),
      existingCollections: new SimpleChange(undefined, this.existingCollections, true)
    });
  }

  private updateIdToTag(): void {
    this.idToTag = {};
    this.tags.forEach(tag => this.idToTag[tag.id] = tag);
  }

  private updateSelectedTags(): void {
    this.existingCollections?.forEach((collection: BasicEntry) => {
      if (this.idToTag[collection.id]) {
        this.idToTag[collection.id].selected = true;
      }
    });
  }

  /**
   * Get all available tags and then update the tags that are selected
   *
   * @param changes Changes made to museum id and to existing collections
   */
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

  /**
   * Triggered when the user clicks on a tag
   *
   * @param tag The tag that is selected
   */
  public selectTag(tag: Tag): void {
    tag.selected = !tag.selected;
  }

  /**
   * Returns all the tags that are selected by the user
   */
  public getAllSelectedTags(): BasicEntry[] {
    return this.tags
      .filter((tag) => tag.selected)
      .map((tag) => (tag as BasicEntry));
  }
}
