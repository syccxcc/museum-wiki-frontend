import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})

/**
 * records the previous ActivatedRouteSnapshot that is accessed
 */
export class PreviousRouteService {

  private route: ActivatedRouteSnapshot;

  constructor(private router: Router) {
    this.route = undefined;
  }

  get previousRoute(): ActivatedRouteSnapshot {
    return this.route;
  }

  set previousRoute(previousRoute: ActivatedRouteSnapshot) {
    this.route = previousRoute;
  }

  public toPreviousRoute(): Promise<boolean> {
    return this.router.navigateByUrl(this.route.url.join('/'));
  }
}
