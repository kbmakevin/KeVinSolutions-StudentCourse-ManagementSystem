
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from '../courses.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Student } from '../../interfaces/student';
import { Course } from '../../interfaces/course';
import { AuthenticationService } from '../../authentication/authentication.service';
import { StudentsService } from '../../students/students.service';
import { AlertService } from '../../alert/alert.service';

@Component({
  selector: 'app-coursedetails',
  templateUrl: './coursedetail.component.html',
  styleUrls: ['./detail.component.css']
})

export class CourseDetailComponent implements OnInit {
  courseId: string;
  currentStudent: Student;
  course: Course;
  isAdminView: Boolean;
  hasStudents: Boolean;

  isEnrolled: Boolean;

  constructor(
    private _route: ActivatedRoute,
    private _authService: AuthenticationService,
    private _alertService: AlertService,
    private _studentsService: StudentsService,
    private _coursesService: CoursesService) {
    this._route.queryParams.subscribe(params => this.courseId = params['id']);
    this.currentStudent = this._authService.getStudent();
  }

  ngOnInit() {
    this._coursesService
      .getCourse(this.courseId)
      .subscribe((res) => {
        this.course = res;
        this.isAdminView = this._authService.isAdmin();
        if (this.course.students.length > 0) {
          this.hasStudents = true;
          this.isEnrolled = this._isCurrentStudentEnrolledInThisCourse();
        }
        // console.log('this.isEnrolled: ' + this.isEnrolled);

        // this.isEnrolled = this._isCurrentStudentEnrolledInThisCourse();
        // this.isEnrolled = this.course.students.indexOf(this._authService.getStudent()) > -1;

        // this.isEnrolled = this.course.students.includes(this._authService.getStudent());

        // console.log('this course\'s students');
        // this.course.students.forEach(s => {
        //   console.log('this course contains student: ' + s._id);
        // });

        // console.log('current student id: ' + this._authService.getStudent()._id);

        // console.log('current student enrolled in this class: ' + (this.course.students.indexOf(this._authService.getStudent()) > -1));

        // display currently enrolled students at bottom of view

      });
  }

  enrollInCourse() {
    this._studentsService
      .enrollInCourse({ courseId: this.courseId, studentId: this.currentStudent._id })
      .subscribe(res => {
        this._alertService.success(`Student (#${this.currentStudent.studentNumber}) has successfully registered in this course (${this.course.courseCode})!`, false);
        this.ngOnInit();
      },
        error => this._alertService.error(error));
  }

  dropCourse() {
    this._studentsService
      .dropCourse({ courseId: this.courseId, studentId: this.currentStudent._id })
      .subscribe(res => {
        this._alertService.success(`Student (#${this.currentStudent.studentNumber}) has successfully dropped this course (${this.course.courseCode})!`, true);
        this.ngOnInit();
        window.location.reload();
      },
        error => this._alertService.error(error));
  }

  dropStudent(studentId: String, studentNumber: Number) {
    this._studentsService
      .dropCourse({ courseId: this.courseId, studentId: studentId })
      .subscribe(res => {
        this._alertService.success(`Student (#${studentNumber}) has successfully dropped this course (${this.course.courseCode})!`, true);
        this.ngOnInit();
        window.location.reload();
      },
        error => this._alertService.error(error));
  }

  // helper methods
  private _isCurrentStudentEnrolledInThisCourse(): Boolean {
    let result = false;

    // console.log('current student id: ' + this.currentStudent._id);
    this.course.students.forEach(s => {
      // console.log('student ids enrolled: ' + s._id);
      // console.log(s._id === this.currentStudent._id);
      if (s._id === this.currentStudent._id) {
        // console.log('they are equal!');
        result = true;
        return result;
        // break;
        // return true;
      }
    });
    // console.log('i made it down here');
    // return false;
    return result;
  }
}
