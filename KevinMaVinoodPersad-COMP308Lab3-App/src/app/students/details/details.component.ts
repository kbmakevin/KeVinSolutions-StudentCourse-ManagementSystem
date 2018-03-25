
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

    course: Course = {
        courseCode: "COMP 308",
        courseName: "Emergin Tech",
        section: 2,
        semester:4
    }

    course2: Course = {
        courseCode: "COMP 231",
        courseName: "Java EE",
        section: 3,
        semester:3
    }

    courses: Course[] = [this.course, this.course2];

    constructor(private _route: ActivatedRoute, private _studentsService: StudentsService) {
            this._route.queryParams.subscribe(params => this.studentNum = params['id']);
            
         }

    ngOnInit() {
        let s = +this.studentNum;

        this._studentsService
        .getStudent(s)
        .subscribe((res) => {
            this.student = res
            console.log(this.student);
        });
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