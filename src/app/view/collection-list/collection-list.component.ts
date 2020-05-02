import {Component, Input, OnInit} from '@angular/core';
import {BasicEntry} from '../../models/basic-entry';
import {Artifact} from '../../models/artifact';

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.css']
})
export class CollectionListComponent implements OnInit {

  @Input() artifact: Artifact;
  display: string;

  constructor() { }

  ngOnInit(): void {
    if (this.artifact.collectionList && this.artifact.collectionList.length > 0) {
      this.display = this.artifact.collectionList.map((entry) => entry.name).join(', ');
    }
  }

}
