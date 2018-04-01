
import { CoursesService } from '../courses.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '../../interfaces/course';
import { AuthenticationService } from '../../authentication/authentication.service';
import { AlertService } from '../../alert/alert.service';

@Component({
  selector: 'app-listcourse',
  templateUrl: './listcourses.component.html',
  styleUrls: ['./listcourses.component.css']
})
export class ListCoursesComponent implements OnInit {

  course: Course;

  constructor(
    private _authService: AuthenticationService,
    private _alertService: AlertService,
    private _coursesService: CoursesService) {

  }

  ngOnInit() {
    this._coursesService.listCourses()
      .subscribe((course) => {
        this.course = course;
        // console.log(course);
      });
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
