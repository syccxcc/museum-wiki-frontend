import {Edit} from '../edit';
import {Artifact} from '../artifact';
import {Collection} from '../collection';
import {Museum} from '../museum';

/**
 * Builder for edit class
 */
export class EditBuilder {
  /**
   * The edit prepared by this builder
   */
  edit: Edit;

  /**
   * Creates an empty edit object
   */
  constructor() {
    this.edit = new Edit();
  }

  /**
   * Builder method for id
   *
   * @param id Id of edit
   */
  id(id: number): EditBuilder {
    this.edit.id = id;
    return this;
  }

  /**
   * Builder method for type
   *
   * @param type Type
   */
  type(type: string): EditBuilder {
    this.edit.type = type;
    return this;
  }

  /**
   * Builder method for category
   *
   * @param category Category
   */
  category(category: string): EditBuilder {
    this.edit.category = category;
    return this;
  }

  /**
   * Builder method for artifact
   *
   * @param value Artifact
   */
  artifact(value: Artifact): EditBuilder {
    this.edit.artifact = value;
    return this;
  }

  /**
   * Builder method for collection
   *
   * @param value Collection
   */
  collection(value: Collection): EditBuilder {
    this.edit.collection = value;
    return this;
  }

  /**
   * Builder method for museum
   *
   * @param value Museum
   */
  museum(value: Museum): EditBuilder {
    this.edit.museum = value;
    return this;
  }

  /**
   * Builder method for approval status
   *
   * @param value Approval status
   */
  approvalStatus(value: string): EditBuilder {
    this.edit.approvalStatus = value;
    return this;
  }

  /**
   * Builder method for reviewer username
   *
   * @param value Username of the reviewer
   */
  reviewerUsername(value: string): EditBuilder {
    this.edit.reviewerUsername = value;
    return this;
  }

  /**
   * Builder method for date of edit
   *
   * @param value Date
   */
  date(value: string): EditBuilder {
    if (value) {
      this.edit.date = value;
    }
    return this;
  }

  /**
   * Create the desired edit object
   */
  build(): Edit {
    return this.edit;
  }
}
