
import { ActivatedRoute } from '@angular/router';
import { StudentsService } from '../students.service';
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
    semester:Number;
  }

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css']
  })

  export class DetailsComponent implements OnInit {
    studentId: string;
    student: Student;
    errorMessage: string;
    registered: Boolean = false;
    course: Course;

    constructor(private _route: ActivatedRoute,  private _studentsService: StudentsService) {
            this._route.queryParams.subscribe(params => this.studentId = params['id']);
            
         }

    ngOnInit() {

        this._studentsService
        .getStudent(this.studentId)
        .subscribe((res) => {
            this.student = res;
            if(this.student.courses.length > 0) {
                this.registered = true;
            }
        });

        console.log(this.registered);
    }

    dropCourse(c_id: string) {
        console.log("Inside drop course in student module");
        this._studentsService
        .dropCourse(this.studentId, c_id)
        .subscribe((res) => {
            this.ngOnInit();
        });
    }
  }