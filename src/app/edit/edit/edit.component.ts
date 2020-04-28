import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  category: string;
  museumId: number;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.category = params.get('category');

      if (this.category !== 'museum') {
        this.museumId = parseInt(params.get('museumId'), 10);
      }
    });
  }

}
