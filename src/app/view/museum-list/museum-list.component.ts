import {Component, OnInit} from '@angular/core';
import {Museum} from '../../models/museum';
import {Router} from '@angular/router';
import {MuseumService} from '../../services/wiki-entry/museum.service';

/**
 * Display a list of all museums
 */
@Component({
  selector: 'app-museum-list',
  templateUrl: './museum-list.component.html',
  styleUrls: ['./museum-list.component.css']
})
export class MuseumListComponent implements OnInit {

  /**
   * Museum list
   */
  museums: Museum[] = [];
  /**
   * Whether the app is waiting for backend response
   */
  loading = true;
  /**
   * Whether the app encountered a network error while trying to connect to backend
   */
  error = false;

  /**
   * Constructor
   *
   * @param router Routes to museum view
   * @param museumService Helps retrieve museum list from backend
   */
  constructor(private router: Router,
              private museumService: MuseumService) {
  }

  /**
   * On initialization, get the list of all museums from museum service
   */
  ngOnInit(): void {
    this.museumService.getMuseumList().subscribe(
      (museums: Museum[]) => {
        this.museums = this.museums.concat(museums);
        this.loading = false;
      },
      error => {
        this.error = true;
        console.log(error);
      });
  }

  /**
   * Go to the view of a certain museum
   *
   * @param id The id of the destination museum
   */
  public goToMuseum(id: string) {
    this.router.navigateByUrl('/view/museum/' + id).then();
  }

}
