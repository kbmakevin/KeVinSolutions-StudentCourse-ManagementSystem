
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
    studentNum: string;
    student: Student;
    errorMessage: string;
    NoEdit: Boolean = true;

    course: Course;
    courses: Course[];

    constructor(private _route: ActivatedRoute, private _studentsService: StudentsService) {
            this._route.queryParams.subscribe(params => this.studentNum = params['id']);
            
         }

    ngOnInit() {
        let s = +this.studentNum;

        this._studentsService
        .getStudent(s)
        .subscribe((res) => {
            this.student = res;
        });

        console.log(this.student);
    }

    editStudentCourse() {
        if(!this.NoEdit) {
            this.NoEdit = true;
        }
        else {
            this.NoEdit = false;
        }
    }
        
  }