
import { CoursesService } from '../courses.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '../../interfaces/course';
import { AuthenticationService } from '../../authentication/authentication.service';
import { AlertService } from '../../alert/alert.service';
import { StudentsService } from '../../students/students.service';

@Component({
  selector: 'app-listcourse',
  templateUrl: './listcourses.component.html',
  styleUrls: ['./listcourses.component.css']
})
export class ListCoursesComponent implements OnInit {

  // course: Course;
  availableCourses: Course[];
  enrolledCourses: Course[];
  currentStudentId: String;

  constructor(
    private _authService: AuthenticationService,
    private _studentService: StudentsService,
    private _alertService: AlertService,
    private _coursesService: CoursesService) {

  }

  ngOnInit() {
    // this._coursesService.listCourses()
    //   .subscribe((course) => {
    //     this.course = course;
    //     // console.log(course);
    //   });

    this.currentStudentId = this._authService.getStudent()._id;

    // enrolled courses only for student display
    if (!this._authService.isAdmin()) {
      // this.enrolledCourses = this._authService.getStudent().courses;
      this._studentService.getEnrolledCourses(this.currentStudentId)
        .subscribe(c => {
          // console.log('inside ng component; courses: ' + c);
          this.enrolledCourses = c;
          // console.log(`this.enrolledCourses: ${this.enrolledCourses}`);
        },
          error => this._alertService.error(error));
      // console.log(`this.enrolledCourses: ${this.enrolledCourses}`);
    }

    // avail courses received for both student and admin display
    this._studentService.getAvailableCourses(this.currentStudentId)
      .subscribe(c => {
        this.availableCourses = c;
        // console.log(`this.availableCourses: ${this.availableCourses}`);
      },
        error => this._alertService.error(error));
  }

  deleteCourse(id: any, code: String) {
    this._coursesService.deleteCourse(id)
      .subscribe(c => {
        this._alertService.success(`Course (${code}) successfully deleted`, true);
        this.ngOnInit();
      },
        error => this._alertService.error(error));
  }

}
