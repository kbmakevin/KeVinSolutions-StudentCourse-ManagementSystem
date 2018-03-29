import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './authentication.service';

// 2018.03.28 - 17:57:03 - created
@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private _router: Router,
    private _authService: AuthenticationService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!this._authService.isLoggedIn()) {
      // if not logged in, redirect to login page with the return url
      this._router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
    // logged in so return true
    return true;
  }
}
