import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http, Headers, Request, RequestMethod, Response } from '@angular/http';


@Injectable()
export class StudentsService {

  private _baseURL = '/api/students';

  constructor(private _http: Http) { }

  create(student: any): Observable<any> {
    return this._http
      .post(this._baseURL, student)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  listStudents(): Observable<any> {
    return this._http
      .get(this._baseURL)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error.json().message || 'Server error');
  }
}
