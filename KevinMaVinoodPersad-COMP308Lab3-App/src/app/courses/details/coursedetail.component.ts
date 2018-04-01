
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from '../courses.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Student } from '../../interfaces/student';
import { Course } from '../../interfaces/course';
import { AuthenticationService } from '../../authentication/authentication.service';

@Component({
  selector: 'app-coursedetails',
  templateUrl: './coursedetail.component.html',
  styleUrls: ['./detail.component.css']
})

export class CourseDetailComponent implements OnInit {
  courseId: string;
  course: Course;
  isAdminView: Boolean;
  // hasStudents: Boolean = false;

  constructor(
    private _route: ActivatedRoute,
    private _authService: AuthenticationService,
    private _coursesService: CoursesService) {
    this._route.queryParams.subscribe(params => this.courseId = params['id']);
  }

  ngOnInit() {
    this._coursesService
      .getCourse(this.courseId)
      .subscribe((res) => {
        this.course = res;
        this.isAdminView = this._authService.isAdmin();
        // if (this.course.students.length > 0) {
        //   this.hasStudents = true;
        // }

      });
  }

  // dropStudent(id) {
  //   console.log(id + ',' + this.courseId);

  //   let details = {
  //     cId: this.courseId,
  //     stdId: id
  //   }
  //   this._coursesService
  //     .dropStudent(details)
  //     .subscribe(res =>
  //       this._router.navigate(['/courses/coursedetails'], { queryParams: { id: this.courseId } }),
  //       error => this.errorMessage = error);
  // }

}
