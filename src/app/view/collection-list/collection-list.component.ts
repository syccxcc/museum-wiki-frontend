import {Component, Input, OnInit} from '@angular/core';
import {BasicEntry} from '../../models/basic-entry';
import {Artifact} from '../../models/artifact';

/**
 * Displays a list of collections separated by commas. Currently unused. Replaced by the tag-selection app.
 */
@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.css']
})
export class CollectionListComponent implements OnInit {

  /**
   * the artifact which contains the desired collection list
   */
  @Input() artifact: Artifact;
  /**
   * The text to be displayed. It contains the name of all collections.
   */
  display: string;

  /**
   * Convert collection list into a string to be displayed
   */
  ngOnInit(): void {
    if (this.artifact.collectionList && this.artifact.collectionList.length > 0) {
      this.display =
        this.artifact
          .collectionList
          .map((entry) => entry.name)
          .join(', ');
    }
  }

}
