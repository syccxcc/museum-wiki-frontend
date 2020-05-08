import {ProtoEdit} from './object-prototypes/proto-edit';
import {ProtoArtifact} from './object-prototypes/proto-artifact';
import {WikiEntry} from '../models/wiki-entry';
import {WikiEntryBuilder} from '../models/builders/wiki-entry-builder';
import {MuseumBuilder} from '../models/builders/museum-builder';
import {Artifact} from '../models/artifact';

/**
 * Create a random objects for testing
 */
export class Mocker {
  /**
   * All possible categories
   */
  private static readonly categories = ['museum', 'collection', 'artifact'];
  /**
   * All possible types of edits
   */
  private static readonly types = ['create', 'delete', 'edit'];
  /**
   * All possible edit statuses
   */
  private static readonly statuses = ['Approved', 'Denied', 'Under review'];

  /**
   * Get a random element in an array
   *
   * @param array Array from which one thing is picked
   */
  private static randomElement(array: Array<any>) {
    return array[Math.floor(Math.random() * array.length)];
  }

  /**
   * Create a mock proto edit object
   */
  static mockProtoEdit(): ProtoEdit {
    const edit: ProtoEdit = new ProtoEdit();
    edit.id = Math.floor(Math.random() * 1000);
    edit.category = this.randomElement(this.categories);
    edit.type = this.randomElement(this.types);
    edit.approvalStatus = this.randomElement(this.statuses);
    return edit;
  }

  /**
   * Create a mock wiki entry object
   */
  static mockWikiEntry(): WikiEntry {
    return new WikiEntryBuilder<MuseumBuilder, WikiEntry>(WikiEntry)
      .name('Test Name')
      .introduction('Test Introduction')
      .description('# Test Description\nThis is a **test** Markdown description.')
      .build();
  }

  /**
   * Create a mock proto artifact object
   */
  static mockProtoArtifact(): ProtoArtifact {
    const artifact = new ProtoArtifact();
    artifact.artifact = this.mockWikiEntry() as Artifact;
    artifact.artifact.collectionList = [{name: 'collection1', id: 1}, {name: 'collection2', id: 2}];
    return artifact;
  }
}
