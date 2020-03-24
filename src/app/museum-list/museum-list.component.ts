import {Component, OnInit} from '@angular/core';
import {Museum} from '../models/Museum';
import {NavigationBarComponent} from '../navigation-bar/navigation-bar.component';

@Component({
  selector: 'app-museum-list',
  templateUrl: './museum-list.component.html',
  styleUrls: ['./museum-list.component.css']
})
export class MuseumListComponent implements OnInit {

  museums: Museum[] = [
    new Museum('Pfaffmann Museum', 'A museum created by Pfaffmann.', 1),
    new Museum('Smith Museum', 'A museum created by Smith', 1),
    new Museum('Lekso Museum', 'A museum created by Lekso', 1)];

  ngOnInit(): void {
  }

  private sortByName(): void {
    this.museums.sort((museum1, museum2) => museum1.name > museum2.name ? 1 : -1);
  }

}
