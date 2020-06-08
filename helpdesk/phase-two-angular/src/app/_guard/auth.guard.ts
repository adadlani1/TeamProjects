import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

// @ts-ignore
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public router: Router) {
  }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('role'))
      //if logged in return true
      return true;
    // not logged in so redirects to login page
    this.router.navigate([''], {queryParams: {returnUrl: state.url}});
    return false;
  }

}
