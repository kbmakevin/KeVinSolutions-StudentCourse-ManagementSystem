import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AlertService } from '../alert/alert.service';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _authService: AuthenticationService,
    private _alertService: AlertService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (!this._authService.isAdmin()) {
      this._alertService.error('This page is only accessible by the system administrator', true);
      this._router.navigate(['/students/details'],
        { queryParams: { 'id': this._authService.getStudent()._id } });

      // this._router.navigate(['/home']);
      return false;
    }
    return true;
  }
}
