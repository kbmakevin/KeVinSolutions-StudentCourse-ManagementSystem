import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http, Headers, Request, RequestMethod, Response } from '@angular/http';
import { Course } from '../interfaces/course';

@Injectable()
export class CoursesService {

    private _courseBaseURL = '/api/courses';

    constructor(private _http: Http) { }

    listCourses(): Observable<any> {
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

    deleteCourse(id: any): Observable<any> {
        return this._http
            .delete(this._courseBaseURL + '/' + id)
            //   .get(this._courseBaseURL + '/delete/' + code)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    getCourse(id: any): Observable<any> {
        return this._http
            .get(this._courseBaseURL + '/' + id)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    updateCourse(id: String, course: Course): Observable<any> {
        return this._http
            .put(this._courseBaseURL + '/' + id, course)
            //   .post(this._courseBaseURL + '/updatecourse', c)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    getNotEnrolledStudents(courseId: String) {
        return this._http
            .get(this._courseBaseURL + '/getNotEnrolledStudents/' + courseId)
            .map(res => {
                return res.json();
            })
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error.json().message || 'Server error');
    }
}