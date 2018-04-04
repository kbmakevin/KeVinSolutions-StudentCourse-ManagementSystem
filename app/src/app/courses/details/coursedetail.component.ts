
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
  showNotEnrolledStudents: Boolean;
  notEnrolledStudents: Student[];

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
    this.showNotEnrolledStudents = false;

    this._coursesService
      .getCourse(this.courseId)
      .subscribe((res) => {
        this.course = res;
        this.isAdminView = this._authService.isAdmin();
        if (this.course.students.length > 0) {
          this.hasStudents = true;
          this.isEnrolled = this._isCurrentStudentEnrolledInThisCourse();
        }
      });
  }

  // invoked by students to add themselves to THIS course
  // enrollInCourse() {
  // 2018.04.04 - 14:50:08 - since I couldn't declare two enrollInCourse methods with overloadding...
  // optional studentId arg - when called by admin
  enrollInCourse(studentId?: String, studentNumber?: Number) {
    this._studentsService
      // admin ? use arg : use authenticated student's id
      .enrollInCourse({ courseId: this.courseId, studentId: studentId ? studentId : this.currentStudent._id })
      .subscribe(res => {
        this._alertService.success(`Student (#${studentNumber ? studentNumber : this.currentStudent.studentNumber}) has successfully registered in this course (${this.course.courseCode})!`, false);
        this.ngOnInit();
      },
        error => this._alertService.error(error));
  }

  // can't do this because typescript doesn't let me overload...
  // invoked by sys admin to add A student to THIS course
  // enrollInCourse(studentId: String) {
  // }

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

  getNotEnrolledStudents() {
    this._coursesService
      .getNotEnrolledStudents(this.courseId)
      .subscribe(res => {
        this.showNotEnrolledStudents = true;
        this.notEnrolledStudents = res;
      },
        error => this._alertService.error(error));
  }

  // helper methods
  private _isCurrentStudentEnrolledInThisCourse(): Boolean {
    let result = false;
    this.course.students.forEach(s => {
      if (s._id === this.currentStudent._id) {
        result = true;
        return result;
      }
    });
    return result;
  }
}
