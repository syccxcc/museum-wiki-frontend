import {Component, Input, OnInit, } from '@angular/core';
import {WikiEntry} from '../../models/wiki-entry';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EXAMPLE_DESCRIPTION} from '../../user/registration/ExampleDescription';

@Component({
  selector: 'app-wiki-entry-editor',
  templateUrl: './wiki-entry-editor.component.html',
  styleUrls: ['./wiki-entry-editor.component.css']
})
export class WikiEntryEditorComponent implements OnInit {

  private static readonly URL_VALIDATION_REGEX = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

  @Input() previousWikiEntry;

  public wikiEntryFormGroup: FormGroup;

  constructor() {
  }

  ngOnInit(): void {
    let prevName = '';
    let prevIntroduction = '';
    let prevImage = '';
    let prevDescription = EXAMPLE_DESCRIPTION;
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
        image: new FormControl(prevImage, Validators.pattern(WikiEntryEditorComponent.URL_VALIDATION_REGEX)),
        description: new FormControl(prevDescription)
      });
  }

  public getWikiEntry(): WikiEntry {
    return new WikiEntry(
      this.wikiEntryFormGroup.get('name').value,
      this.wikiEntryFormGroup.get('introduction').value,
      this.wikiEntryFormGroup.get('description').value,
      this.wikiEntryFormGroup.get('image').value,
      '');
  }

}
