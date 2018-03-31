import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './authentication.service';
import { AlertService } from '../alert/alert.service';

@Injectable()
export class PersonalGuard implements CanActivate {

  private _idParam: string;
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _authService: AuthenticationService,
    private _alertService: AlertService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // if user is admin, can do anything he wants, return true.
    if (!this._authService.isAdmin()) {
      // if the id param contained in the url does not match the authenticated student's id, restrict access
      this._route.queryParams.subscribe(params => this._idParam = params['id']);

      if (this._idParam !== this._authService.getStudent()._id) {

        this._alertService.error(`Unauthorized access!`, true);
        this._router.navigate(['/students/details'],
          { queryParams: { 'id': this._authService.getStudent()._id } });

        return false;
      }
    }

    return true;
  }
}
