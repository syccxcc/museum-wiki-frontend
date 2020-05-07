import {Component} from '@angular/core';
import {NavigationEnd, Router, Event} from '@angular/router';
import {UserInfoService} from '../../services/user/user-info.service';

/**
 * the top navigation bar of the program
 */
@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent {

  /**
   * the urls of navigation bar items
   */
  navigationBarItemLinks = ['', 'home'];
  /**
   * the displayed name of navigation bar items
   */
  navigationBarItemNames = ['', 'Home'];

  /**
   * setup the navigation bar based on the login status
   * and start tracking the login status so that the navbar is always changed
   * whenever there's a change to login status
   *
   * @param router routes to the destination page when a button is clicked
   * @param userInfoService provides user login info
   */
  constructor(private router: Router,
              private userInfoService: UserInfoService) {
    this.adjustNavbarBasedOnLoginStatus(userInfoService.isLoggedIn);
    this.userInfoService.trackLoginStatus().subscribe((loggedIn: boolean) => {
        this.adjustNavbarBasedOnLoginStatus(loggedIn);
      }
    );
  }

  /**
   * change the navigation bar based on the login status of the user
   *
   * @param loggedIn whether the user is logged in
   */
  private adjustNavbarBasedOnLoginStatus(loggedIn: boolean): void {
    if (loggedIn) {
      this.navigationBarItemNames[0] = 'User Profile';
      this.navigationBarItemLinks[0] = 'user-profile';
    } else {
      this.navigationBarItemLinks[0] = 'login';
      this.navigationBarItemNames[0] = 'Login';
    }
  }

  /**
   * navigate to a certain url
   *
   * @param link the target url of routing
   */
  public navigate(link: string): void {
    this.router.navigateByUrl(link);
  }

}
