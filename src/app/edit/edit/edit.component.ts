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

/**
 * Edit an existing entry
 */
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  /**
   * Category of the entry to be edited.
   */
  category: string;
  /**
   * Id of edited entry.
   */
  id: number | string;

  /**
   * If category is not museum, this will be id of museum to which the entry belongs.
   */
  museumId: number;

  /**
   * Edit object passed as a parameter to the editor
   */
  readonly edit = Mode.EDIT;

  /**
   * The existing museum/collection/artifact
   */
  existingObject: Museum | Collection | Artifact;

  /**
   * Whether the program is waiting for backend server's response
   */
  loading: boolean;
  /**
   * Whether there's an error when trying to retrieve server data
   */
  error: boolean;

  /**
   * Constructor.
   *
   * @param route The current Url.
   * @param getByCategoryService Gets a corresponding object of a certain category and id.
   * @param projectConfigService Project configuration for determining whether the program should log in console.
   */
  constructor(private route: ActivatedRoute,
              private getByCategoryService: GetByCategoryService,
              private projectConfigService: ProjectConfigService) {
    this.loading = true;
    this.error = false;
  }

  /**
   * Analyze the url and make a request for the existing object.
   * After the object is received, show the edit page which contains information
   * of the original object.
   */
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
