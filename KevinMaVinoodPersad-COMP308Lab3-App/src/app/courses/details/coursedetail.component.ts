
import { ActivatedRoute, Router } from '@angular/router';
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
    courseCode: String;
    courseName: String;
    section: Number;
    semester: Number;
    students: Student[];
  }

@Component({
    selector: 'app-coursedetails',
    templateUrl: './coursedetail.component.html',
    styleUrls: ['./detail.component.css']
  })

  export class CourseDetailComponent implements OnInit {
    courseId: string;
    student: Student;
    errorMessage: string;
    hasStudents: Boolean = false;
    course: Course;

  constructor(private _route: ActivatedRoute, private _router: Router, private _coursesService: CoursesService) {
            this._route.queryParams.subscribe(params => this.courseId = params['id']);
         }

    ngOnInit() {
        this._coursesService
        .getCourse(this.courseId)
        .subscribe((res) => {
            this.course = res;
            if (this.course.students.length > 0) {
                this.hasStudents = true;
            }
            
        });
    }

    dropStudent(id) {
      console.log(id + ',' + this.courseId);
      
      let details = {
        cId: this.courseId,
        stdId: id
      }
      this._coursesService
        .dropStudent(details)
        .subscribe(res =>
          this._router.navigate(['/courses/coursedetails'], { queryParams: { id: this.courseId } }),
          error => this.errorMessage = error);
        }

  }