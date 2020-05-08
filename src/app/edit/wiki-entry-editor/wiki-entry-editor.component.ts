import {Component, Input, OnInit,} from '@angular/core';
import {WikiEntry} from '../../models/wiki-entry';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EXAMPLE_DESCRIPTION} from '../../user/registration/ExampleDescription';
import {WikiEntryBuilder} from '../../models/builders/wiki-entry-builder';
import {MuseumBuilder} from '../../models/builders/museum-builder';

@Component({
  selector: 'app-wiki-entry-editor',
  templateUrl: './wiki-entry-editor.component.html',
  styleUrls: ['./wiki-entry-editor.component.css']
})
export class WikiEntryEditorComponent implements OnInit {

  /**
   * credits: @stephenhay
   * Currently unused because it overkills sometimes
   */
  private static readonly URL_VALIDATION_REGEX = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

  /**
   * The previous version of the wiki entry, if there is any
   */
  @Input() previousWikiEntry: WikiEntry;

  /**
   * A form group containing all fields for a new wiki entry
   */
  public wikiEntryFormGroup: FormGroup;

  /**
   * Constructor
   */
  constructor() {
  }

  /**
   * Initialize form group
   */
  ngOnInit(): void {
    let prevName = '';
    let prevIntroduction = '';
    let prevImage = '';
    let prevDescription = '';
    if (this.previousWikiEntry) {
      prevName = this.previousWikiEntry.name;
      prevIntroduction = this.previousWikiEntry.introduction;
      prevImage = this.previousWikiEntry.image;
      prevDescription = this.previousWikiEntry.description;
    }
    this.wikiEntryFormGroup = new FormGroup(
      {
        name: new FormControl(prevName, Validators.required),
        introduction: new FormControl(prevIntroduction, Validators.required),
        image: new FormControl(prevImage,), // Validators.pattern(WikiEntryEditorComponent.URL_VALIDATION_REGEX)),
        description: new FormControl(prevDescription)
      });
  }

  /**
   * Return the new wiki entry created by user input
   */
  public getWikiEntry(): WikiEntry {
    const form = this.wikiEntryFormGroup;
    return new WikiEntryBuilder<MuseumBuilder, WikiEntry>(WikiEntry)
      .name(form.get('name').value)
      .introduction(form.get('introduction').value)
      .description(form.get('description').value)
      .image(form.get('image').value)
      .id(this.previousWikiEntry?.id)
      .build();
  }

}
