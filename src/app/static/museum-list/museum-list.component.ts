import {Component, OnInit} from '@angular/core';
import {Museum} from '../../models/Museum';
import {NavigationBarComponent} from '../navigation-bar/navigation-bar.component';
import {Router} from '@angular/router';
import {MuseumService} from '../../services/museum.service';

@Component({
  selector: 'app-museum-list',
  templateUrl: './museum-list.component.html',
  styleUrls: ['./museum-list.component.css']
})
export class MuseumListComponent implements OnInit {

  museums: Museum[] = [];

  constructor(private router: Router, private museumService: MuseumService) {
  }

  ngOnInit(): void {
    this.museumService.getMuseumList().then((museums: Museum[]) => {
      this.museums = museums;
    });
  }

  public sortByName(): void {
    this.museums.sort((museum1, museum2) => museum1.name > museum2.name ? 1 : -1);
  }

  public goToMuseum(id: string) {
    this.router.navigateByUrl('/view/museum/' + id).then();
  }

}
