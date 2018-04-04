
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesService } from '../courses.service';
import { Course } from '../../interfaces/course';
import { AlertService } from '../../alert/alert.service';

@Component({
  selector: 'app-createcourse',
  templateUrl: './createcourse.component.html',
  styleUrls: ['./createcourse.component.css']
})
export class CreateCourseComponent {

  course: Course = {
    courseCode: 'COMP308',
    courseName: 'Emerging Technologies',
    section: 2,
    semester: 3
  };

  constructor(private _router: Router,
    private _alertService: AlertService,
    private _coursesService: CoursesService) {

  }

  create() {
    this._coursesService
      .createCourses(this.course)
      .subscribe(createdCourse => {
        this._alertService.success(`Course (${createdCourse.courseCode}) successfully created`, true);
        this._router.navigate(['/courses/details'],
          { queryParams: { 'id': createdCourse._id } }
        );
      },
        error => this._alertService.error(error));
  }
}
