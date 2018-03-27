import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http, Headers, Request, RequestMethod, Response } from '@angular/http';




@Injectable()
export class CoursesService {

    private _baseURL = '/api/courses';

    constructor(private _http: Http) { }

}