import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlSegment, UrlSegmentGroup, UrlTree} from '@angular/router';
import {UserInfoService} from '../user-info.service';
import {PreviousRouteService} from '../previous-route.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate {

  constructor(private userInfoService: UserInfoService,
              private previousRouteService: PreviousRouteService) {
  }

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
