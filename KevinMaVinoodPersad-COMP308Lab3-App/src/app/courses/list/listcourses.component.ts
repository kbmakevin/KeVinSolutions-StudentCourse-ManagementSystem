
import { Router } from '@angular/router';
import { CoursesService } from '../courses.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

interface Course {
  courseCode: String;
  courseName: String;
  section: Number;
  semester: Number;
}

@Component({
  selector: 'app-listcourse',
  templateUrl: './listcourses.component.html',
  styleUrls: ['./listcourses.component.css']
})
export class ListCoursesComponent implements OnInit {

  course: Course;
  errorMessage: String;

  constructor(private _router: Router,
    private _coursesService: CoursesService) {

    }

  ngOnInit() {
    this._coursesService.listCourses()
    .subscribe((course) => {
      this.course = course;
      console.log(course);
      });
  }

  deleteCourse(code: String) {
    this._coursesService.deleteCourse(code)
    .subscribe(c => this.ngOnInit(),
      error => this.errorMessage = error);
  }

}