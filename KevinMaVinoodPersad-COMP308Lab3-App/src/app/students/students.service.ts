// import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http, Headers, Request, RequestMethod, Response } from '@angular/http';
import { Student } from '../interfaces/student';
import { CourseRegistration } from '../interfaces/course-registration';

@Injectable()
export class StudentsService {
  private _baseURL = '/api/students';
  private _courseBaseURL = '/api/courses';

  constructor(private _http: Http) { }

  // Student CRUD ==============================================================
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

  getStudent(id: any): Observable<any> {
    return this._http
      .get(this._baseURL + '/' + id)
      .map((res: Response) => res.json())
      // .catch((err: any) => console.log(err));
      .catch(this.handleError);
  }

  updateStudent(id: String, student: Student): Observable<any> {
    return this._http
      .put(this._baseURL + '/' + id, student)
      .map(res => res.json())
      .catch(this.handleError);
  }

  deleteStudent(id: String): Observable<any> {
    return this._http
      .delete(this._baseURL + '/' + id)
      .map(res => res.json())
      .catch(this.handleError);
  }

  // Course Manipulation =========================================================
  enrollInCourse(courseRegistration: CourseRegistration) {
    return this._http
      .post(this._baseURL + '/courses', courseRegistration)
      .map(res => res.json())
      .catch(this.handleError);
  }

  dropCourse(courseRegistration: CourseRegistration) {
    return this._http
      .delete(this._baseURL + '/courses/' + JSON.stringify(courseRegistration))
      .map(res => res.json())
      .catch(this.handleError);
  }

  getEnrolledCourses(studentId: String) {
    return this._http
      .get(this._courseBaseURL + '/getEnrolled/' + studentId)
      .map((res: Response) => {
        // console.log('inside ng service; getEnrolledCourses res: ' + JSON.stringify(res.json()));
        return res.json();
      })
      .catch(this.handleError);
  }

  getAvailableCourses(studentId: String) {
    return this._http
      .get(this._courseBaseURL + '/getAvailable/' + studentId)
      .map(res => {
        // console.log('inside ng service; getAvailableCourses res: ' + JSON.stringify(res.json()));
        return res.json();
      })
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error.json().message || 'Server error');
  }
}
