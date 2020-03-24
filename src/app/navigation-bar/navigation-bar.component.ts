import {Component, OnInit, OnChanges} from '@angular/core';
import {NavigationEnd, Router, Event} from '@angular/router';
import {log} from 'util';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent {

  navigationBarStatus = {};

  navigationBarItemLinks = ['home', 'museum-list', 'search', 'about'];
  navigationBarItemNames = ['Home', 'Museum List', 'Search', 'About'];

  DEFAULT_NAVIGATION_BAR_STATUS = 'nav-item';
  ACTIVE_NAVIGATION_BAR_STATUS = 'nav-item active';

  private setAllLinksInactive(): void {
    for (const link of this.navigationBarItemLinks) {
      this.navigationBarStatus[link] = this.DEFAULT_NAVIGATION_BAR_STATUS;
    }
  }

  constructor(private router: Router) {
    this.setAllLinksInactive();
    router.events.subscribe((value: Event) => {
      if (value instanceof NavigationEnd) {
        this.highlight(router.routerState.snapshot.url.split('/')[1]);
      }
      return;
    });
  }

  public highlight(link: string): void {
    this.setAllLinksInactive();
    this.navigationBarStatus[link] = this.ACTIVE_NAVIGATION_BAR_STATUS;
  }

}
