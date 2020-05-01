import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Museum} from '../../models/museum';
import {Collection} from '../../models/collection';
import {Artifact} from '../../models/artifact';
import {EditService} from '../../services/edit.service';
import {Edit} from '../../models/edit';
import {ProtoEdit} from '../../services/object-prototypes/proto-edit';
import {HttpErrorResponse} from '@angular/common/http';
import {capitalizeFirstLetter} from '../../helper/capitalize-first-letter';

@Component({
  selector: 'app-view-edit',
  templateUrl: './view-edit.component.html',
  styleUrls: ['./view-edit.component.css']
})
export class ViewEditComponent implements OnInit {

  editId: string;
  category: string;
  type: string;

  edit: Edit;

  currentEntry: Museum | Collection | Artifact;
  changedEntry: Museum | Collection | Artifact;

  loadingEdit = true;
  errorEdit = false;

  displayCurrent = true;
  displayChanged = true;

  capitalizeFirstLetter = capitalizeFirstLetter;

  constructor(private activatedRoute: ActivatedRoute,
              private editService: EditService) {
  }

  fetchCurrent(): void {
    return;
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.editId = params.get('editId');
      this.editService.getEdit(this.editId).subscribe((res: ProtoEdit) => {
        this.edit = ProtoEdit.toEdit(res);
        this.category = this.edit.category;
        this.type = this.edit.type.toLowerCase();
        this.changedEntry = this.edit[this.category];
        switch (this.type) {
          case 'create':
            this.displayCurrent = false;
            break;
          case 'delete':
            this.displayChanged = false;
            break;
        }
        if (this.displayCurrent) {
          this.fetchCurrent();
        }
        this.loadingEdit = false;
      }, (err: HttpErrorResponse) => {
        this.errorEdit = true;
        console.log(err);
      });
    });
  }

}
