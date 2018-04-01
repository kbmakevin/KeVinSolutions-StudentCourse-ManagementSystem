// import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http, Headers, Request, RequestMethod, Response } from '@angular/http';
import { Student } from '../interfaces/student';


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

  private handleError(error: Response) {
    return Observable.throw(error.json().message || 'Server error');
  }
}
