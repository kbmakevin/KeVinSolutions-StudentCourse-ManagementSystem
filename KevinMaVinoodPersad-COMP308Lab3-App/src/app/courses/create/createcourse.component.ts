
import { Router } from '@angular/router';
import { CoursesService } from '../courses.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

interface Course {
  courseCode: String;
  courseName: String;
  section: Number;
  semester: Number;
}

@Component({
  selector: 'app-createcourse',
  templateUrl: './createcourse.component.html',
  styleUrls: ['./createcourse.component.css']
})
export class CreateCourseComponent implements OnInit {

  course: Course = {
    courseCode: 'COMP 211',
    courseName: 'testing',
    section: 2,
    semester: 3
  }
  errorMessage: string;

  constructor(private _router: Router,
    private _coursesService: CoursesService) {

    }

  ngOnInit() {

  }

  create(form: NgForm) {
    console.log("In course create method");

    this._coursesService
    .createCourses(this.course)
    .subscribe(course => 
      this._router.navigate(['courses']),
      error =>this.errorMessage = error)
  };

}