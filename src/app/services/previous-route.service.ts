import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot} from '@angular/router';

@Injectable({
  providedIn: 'root'
})

/**
 * records the previous ActivatedRouteSnapshot that is accessed
 */
export class PreviousRouteService {

  private route: ActivatedRouteSnapshot;

  constructor() {
    this.route = null;
  }

  get previousRoute(): ActivatedRouteSnapshot {
    return this.route;
  }

  set previousRoute(previousRoute: ActivatedRouteSnapshot) {
    this.route = previousRoute;
  }
}
