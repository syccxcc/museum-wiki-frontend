import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Mode} from '../mode';
import {GetByCategoryService} from '../../services/get-by-category.service';
import {ProtoMuseum} from '../../services/object-prototypes/proto-museum';
import {ProtoCollection} from '../../services/object-prototypes/proto-collection';
import {ProtoArtifact} from '../../services/object-prototypes/proto-artifact';
import {Museum} from '../../models/museum';
import {Collection} from '../../models/collection';
import {Artifact} from '../../models/artifact';
import {HttpErrorResponse} from '@angular/common/http';
import {PrototypeBuilder} from '../../models/builders/prototype-builder';
import {ProjectConfig} from '../../config/ProjectConfig';
import {ProjectConfigService} from '../../services/config/project-config.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  category: string;
  id: number | string;

  museumId: number;

  edit = Mode.EDIT;

  existingObject: Museum | Collection | Artifact;

  loading: boolean;
  error: boolean;

  constructor(private route: ActivatedRoute,
              private getByCategoryService: GetByCategoryService,
              private projectConfigService: ProjectConfigService) {
    this.loading = true;
    this.error = false;

    // TODO: when showing collection list, use disabled checkboxes just like create/edit artifact
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.category = params.get('category');

      this.id = params.get('id');
    });

    this.getByCategoryService
      .getByCategoryAndId(this.category, this.id).subscribe(
      (res: ProtoMuseum | ProtoCollection | ProtoArtifact) => {
        const prototype = {};
        prototype[this.category] = res;
        this.existingObject = PrototypeBuilder.buildFromPrototype(prototype);
        if (this.projectConfigService.getProjectConfig().isLogging()) {
          console.log('Existing object of type ' + this.category);
          console.log(this.existingObject);
        }
        if (this.category !== 'museum') {
          this.museumId = res.museum.id;
        }
        this.loading = false;
      },
      (err: HttpErrorResponse) => {
        this.error = true;
        console.log(err);
      });

  }
}
