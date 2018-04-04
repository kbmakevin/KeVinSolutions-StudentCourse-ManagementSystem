
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

  availableCourses: Course[];
  enrolledCourses: Course[];
  currentStudentId: String;
  isAdmin: Boolean;

  constructor(
    private _authService: AuthenticationService,
    private _studentService: StudentsService,
    private _alertService: AlertService,
    private _coursesService: CoursesService) {

  }

  ngOnInit() {

    this.currentStudentId = this._authService.getStudent()._id;

    this.isAdmin = this._authService.isAdmin();

    // enrolled courses only for student display
    if (!this.isAdmin) {
      // if (!this._authService.isAdmin()) {
      this._studentService.getEnrolledCourses(this.currentStudentId)
        .subscribe(c => {
          this.enrolledCourses = c;
        },
          error => this._alertService.error(error));
    }

    // avail courses received for both student and admin display
    this._studentService.getAvailableCourses(this.currentStudentId)
      .subscribe(c => {
        this.availableCourses = c;
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
