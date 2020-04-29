import {Component, Input, OnInit} from '@angular/core';
import {WikiEntry} from '../../../models/wiki-entry';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-museum-list',
  templateUrl: './user-museum-list.component.html',
  styleUrls: ['./user-museum-list.component.css']
})
export class UserMuseumListComponent implements OnInit {

  @Input() list: WikiEntry[];

  columnsToDisplay = ['Id', 'Name', 'Actions'];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  view(entry: WikiEntry): void {
    this.router.navigateByUrl('/view/museum/' + entry.id);
  }

  delete(entry: WikiEntry): void {
    alert('Not implemented');
    // TODO: implement delete
  }

}
