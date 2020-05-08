import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router} from '@angular/router';

/**
 * Records the previous ActivatedRouteSnapshot that is accessed
 */
@Injectable({
  providedIn: 'root'
})
export class PreviousRouteService {

  /**
   * previous route
   */
  private route: ActivatedRouteSnapshot;

  /**
   * Constructor
   *
   * @param router Routes to the previous route
   */
  constructor(private router: Router) {
    this.route = undefined;
  }

  /**
   * Getter
   */
  get previousRoute(): ActivatedRouteSnapshot {
    return this.route;
  }

  /**
   * Setter
   *
   * @param previousRoute Route that the user previously tried to access
   */
  set previousRoute(previousRoute: ActivatedRouteSnapshot) {
    this.route = previousRoute;
  }

  /**
   * Let the router route the user to the link the user previously tries to access
   */
  public toPreviousRoute(): Promise<boolean> {
    return this.router.navigateByUrl(this.route.url.join('/'));
  }
}
