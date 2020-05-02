import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {WikiEntry} from '../../models/wiki-entry';
import {Router} from '@angular/router';
import {ProjectConfigService} from '../../services/config/project-config.service';
import {ProjectConfig} from '../../config/ProjectConfig';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent implements OnInit, OnChanges {

  @Input() entryList!: WikiEntry[];
  displayList: WikiEntry[];

  @Input() category: string;
  @Input() parentId: string | number;

  searchText: string;

  page = 1;
  pageSize = 12;

  private projectConfig: ProjectConfig;

  constructor(private router: Router,
              private projectConfigService: ProjectConfigService) {
    this.searchText = '';
    this.projectConfig = projectConfigService.getProjectConfig();
  }

  ngOnInit(): void {
    this.displayList = this.entryList;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.displayList = this.entryList;
  }

  goToEntry(entry: WikiEntry): void {
    this.router.navigateByUrl('/view/' + this.category.toLowerCase() + '/' + entry.id);
  }

  private filterDisplayList(keywords: string[]): void {
    this.displayList = this.displayList.filter((entry: WikiEntry) => {
      const text = `${entry.name}.${entry.introduction}`.toLowerCase();
      for (const keyword of keywords) {
        if (!text.includes(keyword.toLowerCase())) {
          return false;
        }
      }
      return true;
    });
  }

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

  createItem() {
    const url = '/create/' + this.category.toLowerCase() + '/' + (this.category === 'Museum' ? '' : this.parentId);
    this.router.navigateByUrl(url);
  }
}
