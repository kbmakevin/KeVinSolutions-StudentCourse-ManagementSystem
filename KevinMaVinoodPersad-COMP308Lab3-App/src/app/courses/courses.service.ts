import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http, Headers, Request, RequestMethod, Response } from '@angular/http';




@Injectable()
export class CoursesService {

    private _courseBaseURL = '/api/courses';

    constructor(private _http: Http) { }

    listCourses() {
        return this._http
            .get(this._courseBaseURL)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error.json().message || 'Server error');
      }
}