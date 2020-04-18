import {Component, OnInit, OnChanges} from '@angular/core';
import {NavigationEnd, Router, Event} from '@angular/router';
import {log} from 'util';
import {UserInfoService} from '../../services/user/user-info.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent {

  navBarCollapse: boolean;

  navigationBarStatus = {};

  navigationBarItemLinks = ['user-profile', 'home', 'museum-list', 'search', 'about'];
  navigationBarItemNames = ['', 'Home', 'Museum List', 'Search', 'About'];

  DEFAULT_NAVIGATION_BAR_STATUS = 'nav-item';
  ACTIVE_NAVIGATION_BAR_STATUS = 'nav-item active';

  constructor(private router: Router,
              private userInfoService: UserInfoService) {
    this.navBarCollapse = true;

    this.userInfoService.trackLoginStatus().subscribe((loggedIn: boolean) => {
        if (loggedIn) {
          this.navigationBarItemNames[0] = 'Username: ' + userInfoService.getBasicUserInfo().username;
        } else {
          this.navigationBarItemLinks[0] = 'login';
          this.navigationBarItemNames[0] = 'Login';
        }
      }
    );

    this.setAllLinksInactive();
    router.events.subscribe((value: Event) => {
      if (value instanceof NavigationEnd) {
        this.highlight(router.routerState.snapshot.url.split('/')[1]);
      }
      return;
    });
  }

  private setAllLinksInactive(): void {
    for (const link of this.navigationBarItemLinks) {
      this.navigationBarStatus[link] = this.DEFAULT_NAVIGATION_BAR_STATUS;
    }
  }

  public highlight(link: string): void {
    this.setAllLinksInactive();
    this.navigationBarStatus[link] = this.ACTIVE_NAVIGATION_BAR_STATUS;
  }

  public expandNavBar(): void {
    this.navBarCollapse = !this.navBarCollapse;
  }

  public navigate(link: string): void {
    this.navBarCollapse = true;
    this.router.navigateByUrl(link);
  }

}
