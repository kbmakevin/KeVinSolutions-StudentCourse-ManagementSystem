
import { Router } from '@angular/router';
import { CoursesService } from '../courses.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

interface Student {
  studentNumber: Number;
  password: String;
  firstName: String;
  lastName: String;
  address: String;
  city: String;
  phoneNumber: String;
  email: String;
  program: String;
  courses: Course[];
}

interface Course {
  _id: String;
  courseCode: String;
  courseName: String;
  section: Number;
  semester: Number;
  students: Student[];
}

@Component({
  selector: 'app-listcourse',
  templateUrl: './listcourses.component.html',
  styleUrls: ['./listcourses.component.css']
})
export class ListCoursesComponent implements OnInit {

  editableCourse: Course = {
    _id: "default",
    courseCode: "default",
    courseName: "default",
    section: 2,
    semester: 2,
    students: []
  }
  course: Course;
  errorMessage: String;
  code: String;
  // editableCourse: Course;

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

  editCourse(c: Course) {
    this.editableCourse = c
  }

  saveChanges() {
   console.log(this.editableCourse);

   let updatedCourse = {
     _id: this.editableCourse._id,
     courseCode: this.editableCourse.courseCode,
     courseName: this.editableCourse.courseName,
     section: this.editableCourse.section,
     semester: this.editableCourse.semester,
     students: this.editableCourse.students
   }

      this._coursesService
      .updateCourse(updatedCourse)
      .subscribe(course => 
        this.cancelEdit(),
        error =>this.errorMessage = error)
  }

  cancelEdit() {
    if(this.editableCourse.courseCode != "default") {
      this.editableCourse = {
        _id: "default",
        courseCode: "default",
        courseName: "default",
        section: 2,
        semester: 2,
        students: []
      }
    }
    console.log(this.editableCourse.courseCode);
  }

}