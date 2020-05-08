import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Mode} from '../mode';

/**
 * Create a museum/collection/artifact
 */
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  /**
   * Category of new object
   */
  category: string;
  /**
   * If category is not museum, stores the id of the museum to which this new object will belong
   */
  museumId: string;

  /**
   * Create mode. Passed as a parameter to app-edit-or-create.
   */
  readonly create = Mode.CREATE;

  /**
   * Constructor
   *
   * @param route The current Url
   */
  constructor(private route: ActivatedRoute) {
  }

  /**
   * Analyze the parameters in the Url to retrieve category and museum id information
   */
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.category = params.get('category');

      if (this.category !== 'museum') {
        this.museumId = params.get('museumId');
      }
    });
  }

}
