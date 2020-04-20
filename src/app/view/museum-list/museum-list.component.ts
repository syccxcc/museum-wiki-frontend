import {Component, OnInit} from '@angular/core';
import {Museum} from '../../models/Museum';
import {Router} from '@angular/router';
import {MuseumService} from '../../services/museum.service';

@Component({
  selector: 'app-museum-list',
  templateUrl: './museum-list.component.html',
  styleUrls: ['./museum-list.component.css']
})
export class MuseumListComponent implements OnInit {

  museums: Museum[] = [];
  loading = true;
  error = false;

  constructor(private router: Router,
              private museumService: MuseumService) {
    // TODO: limit length of introduction, and add pagination
  }

  ngOnInit(): void {
    this.museumService.getMuseumList().then((museums: Museum[]) => {
        this.museums = museums;
        this.loading = false;
      },
      (error => {
        this.error = true;
        console.log(error);
      }));
  }

  public sortByName(): void {
    this.museums.sort((museum1, museum2) => museum1.name > museum2.name ? 1 : -1);
  }

  public goToMuseum(id: string) {
    this.router.navigateByUrl('/view/museum/' + id).then();
  }

}
