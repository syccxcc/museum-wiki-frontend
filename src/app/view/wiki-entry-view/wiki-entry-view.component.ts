import {Component, Input, OnInit} from '@angular/core';
import {WikiEntry} from '../../models/wiki-entry';
import {Router} from '@angular/router';

@Component({
  selector: 'app-wiki-entry-view',
  templateUrl: './wiki-entry-view.component.html',
  styleUrls: ['./wiki-entry-view.component.css']
})
export class WikiEntryViewComponent implements OnInit {

  @Input() wikiEntry: WikiEntry;
  @Input() canEdit;
  @Input() category;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  edit() {
    this.router.navigateByUrl('/edit/' + this.category + '/' + this.wikiEntry.id);
  }

}
