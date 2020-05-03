import {Component} from '@angular/core';
import {NavigationEnd, Router, Event} from '@angular/router';
import {UserInfoService} from '../../services/user/user-info.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent {

  navBarCollapse: boolean;

  navigationBarStatus = {};

  navigationBarItemLinks = ['', 'home'];
  navigationBarItemNames = ['', 'Home'];

  readonly DEFAULT_NAVIGATION_BAR_STATUS = 'nav-item';
  readonly ACTIVE_NAVIGATION_BAR_STATUS = 'nav-item active';

  constructor(private router: Router,
              private userInfoService: UserInfoService) {
    this.navBarCollapse = true;
    this.adjustNavbarBasedOnLoginStatus(userInfoService.isLoggedIn);
    this.userInfoService.trackLoginStatus().subscribe((loggedIn: boolean) => {
        this.adjustNavbarBasedOnLoginStatus(loggedIn);
      }
    );

  }

  private adjustNavbarBasedOnLoginStatus(loggedIn: boolean): void {
    if (loggedIn) {
      this.navigationBarItemNames[0] = 'User Profile';
      this.navigationBarItemLinks[0] = 'user-profile';
    } else {
      this.navigationBarItemLinks[0] = 'login';
      this.navigationBarItemNames[0] = 'Login';
    }
  }

  public expandNavBar(): void {
    this.navBarCollapse = !this.navBarCollapse;
  }

  public navigate(link: string): void {
    this.navBarCollapse = true;
    this.router.navigateByUrl(link);
  }

}
