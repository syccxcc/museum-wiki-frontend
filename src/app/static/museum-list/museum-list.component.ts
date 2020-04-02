import {Component, OnInit} from '@angular/core';
import {Museum} from '../../models/Museum';
import {NavigationBarComponent} from '../navigation-bar/navigation-bar.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-museum-list',
  templateUrl: './museum-list.component.html',
  styleUrls: ['./museum-list.component.css']
})
export class MuseumListComponent implements OnInit {

  museums: Museum[] = [
    new Museum('Pfaffmann Museum', 'A museum created by Pfaffmann.', 'p', 1),
    new Museum('Smith Museum', 'A museum created by Smith', 's', 1),
    new Museum('Lekso Museum', 'A museum created by Lekso', 'l', 1)];

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  public sortByName(): void {
    this.museums.sort((museum1, museum2) => museum1.name > museum2.name ? 1 : -1);
  }

  public goToMuseum(id: string) {
    this.router.navigateByUrl('/view/museum/' + id).then();
  }

}
