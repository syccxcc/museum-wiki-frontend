import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {WikiEntry} from '../../models/wiki-entry';
import {Router} from '@angular/router';
import {ProjectConfigService} from '../../services/config/project-config.service';
import {ProjectConfig} from '../../config/ProjectConfig';

/**
 * Display a list of entries using Bootstrap cards.
 * Can display museums, collections, or artifacts.
 * Supports searching for keywords.
 */
@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent implements OnInit, OnChanges {

  /**
   * List of all entries.
   */
  @Input() entryList!: WikiEntry[];
  /**
   * List of entries to be displayed.
   * Becomes different from entryList if user searches for something.
   */
  displayList: WikiEntry[];

  /**
   * The category of the displayed entry list.
   * Can be museum, collection, or artifact.
   */
  @Input() category: string;
  /**
   * The id of the parent of the entry.
   * Does not exist if category is museum.
   * Helps to generated a URL for routing to create component.
   */
  @Input() parentId: string | number;

  /**
   * The text the user puts into the search box
   */
  searchText: string;

  /**
   * The current page the user is on.
   * Part of NgbPaginator.
   */
  page = 1;
  /**
   * The number of items per page.
   * Part of NgbPaginator.
   */
  pageSize = 12;

  /**
   * The project configuration.
   * Used for checking whether logging is on.
   */
  private projectConfig: ProjectConfig;

  /**
   * Initializes variables
   *
   * @param router Route to create/view component after user clicks
   * @param projectConfigService Get project config for logging
   */
  constructor(private router: Router,
              private projectConfigService: ProjectConfigService) {
    this.searchText = '';
    this.projectConfig = projectConfigService.getProjectConfig();
  }

  /**
   * Initially, display everything in list
   */
  ngOnInit(): void {
    this.displayList = this.entryList;
  }

  /**
   * Adjust to changes to the list to display, if there is any.
   *
   * @param changes Changes made to entryList.
   */
  ngOnChanges(changes: SimpleChanges): void {
    this.displayList = this.entryList;
  }

  /**
   * Go to the view of a certain entry
   *
   * @param entry Destination entry object
   */
  goToEntry(entry: WikiEntry): void {
    this.router.navigateByUrl('/view/' + this.category.toLowerCase() + '/' + entry.id);
  }

  /**
   * Filter the items within displayList so that only those containing the keywords remain
   *
   * @param keywords An array of keywords used for filtering
   */
  private filterDisplayList(keywords: string[]): void {
    this.displayList = this.displayList.filter((entry: WikiEntry) => {
      // concatenate name and introduction to make the full text
      const text = `${entry.name}.${entry.introduction}`.toLowerCase();
      for (const keyword of keywords) {
        if (!text.includes(keyword.toLowerCase())) {
          return false;
        }
      }
      return true;
    });
  }

  /**
   * Update displayList based on the new search text
   */
  updateSearch(): void {
    if (this.projectConfig.isLogging()) {
      console.log('Search text: ');
      console.log(this.searchText);
    }

    this.displayList = this.entryList;
    if (this.searchText.trim() === '') {
      return;
    }
    const keywords = this.searchText.split(' ');
    this.filterDisplayList(keywords);
  }

  /**
   * Triggered when user tries to create an item
   */
  createItem() {
    const url = '/create/' + this.category.toLowerCase() + '/' + (this.category === 'Museum' ? '' : this.parentId);
    this.router.navigateByUrl(url);
  }
}
