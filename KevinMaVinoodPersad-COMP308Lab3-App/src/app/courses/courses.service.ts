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

    createCourses(course: any): Observable<any> {
        return this._http
        .post(this._courseBaseURL, course)
        .map((res: Response) => res.json())
        .catch(this.handleError);
    }

    deleteCourse(code: any): Observable<any> {
        return this._http
        .get(this._courseBaseURL + '/delete/' + code)
        .map((res: Response) =>res.json())
        .catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error.json().message || 'Server error');
      }
}