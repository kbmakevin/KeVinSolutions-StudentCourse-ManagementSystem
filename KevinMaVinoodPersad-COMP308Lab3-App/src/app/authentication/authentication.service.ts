import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Credentials } from '../interfaces/credentials';

@Injectable()
export class AuthenticationService {
  // public student;
  private _baseURL = '/api/students';

  constructor(private _http: Http) { }

  isLoggedIn(): boolean {
    // return this.student;
    // console.log(`inside auth service checking if loggedin: ${sessionStorage.getItem('currentStudent') !== null}`);
    return sessionStorage.getItem('currentStudent') !== null;
  }

  login(credentials: Credentials): Observable<any> {
    // perform a request with 'post' http method
    return this._http
      .post(this._baseURL + '/login', credentials)
      // .map(res => this.student = res.json())
      .map(res => {
        sessionStorage.setItem('currentStudent', res.text());
      })
      .catch(this._handleError);
  }

  // 2018.03.28 - 22:03:42
  logout() {
    // remove student from session storage to log user out
    sessionStorage.removeItem('currentStudent');
    // this.student = undefined;
  }

  private _handleError(error: Response) {
    return Observable.throw(error.json().message || 'Server error');
  }
}
