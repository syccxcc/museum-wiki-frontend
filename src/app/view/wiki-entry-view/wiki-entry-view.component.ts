import {Component, Input, OnInit} from '@angular/core';
import {WikiEntry} from '../../models/wiki-entry';

@Component({
  selector: 'app-wiki-entry-view',
  templateUrl: './wiki-entry-view.component.html',
  styleUrls: ['./wiki-entry-view.component.css']
})
export class WikiEntryViewComponent implements OnInit {

  @Input() wikiEntry: WikiEntry;

  constructor() {
  }

  ngOnInit(): void {
  }

}
