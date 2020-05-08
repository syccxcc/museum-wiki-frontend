import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlSegment, UrlSegmentGroup, UrlTree} from '@angular/router';
import {UserInfoService} from './user-info.service';
import {PreviousRouteService} from '../previous-route.service';

/**
 * Prevents the user from accessing a page if user is not logged in
 */
@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate {

  /**
   * Constructor
   *
   * @param userInfoService Checks whether user is logged in
   * @param previousRouteService Stores the blocked destination to this service to be used later
   */
  constructor(private userInfoService: UserInfoService,
              private previousRouteService: PreviousRouteService) {
  }

  /**
   * Whether a certain route can be activated.
   * If so, return true and continue navigation.
   * If not, return a urlTree which leads to the login page.
   *
   * @param route The url
   * @param state The state of the router
   */
  public canActivate(route: ActivatedRouteSnapshot,
                     state: RouterStateSnapshot): UrlTree | boolean {
    if (this.userInfoService.isLoggedIn) {
      return true;
    }
    const urlTree: UrlTree = new UrlTree();
    urlTree.root = new UrlSegmentGroup([new UrlSegment('login', {})], {});
    urlTree.queryParams = {};
    this.previousRouteService.previousRoute = route;
    return urlTree;
  }
}
