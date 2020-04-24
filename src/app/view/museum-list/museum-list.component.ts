import {Component, OnInit} from '@angular/core';
import {Museum} from '../../models/museum';
import {Router} from '@angular/router';
import {MuseumService} from '../../services/wiki-entry/museum.service';

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
  }

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

  public goToMuseum(id: string) {
    this.router.navigateByUrl('/view/museum/' + id).then();
  }

}
