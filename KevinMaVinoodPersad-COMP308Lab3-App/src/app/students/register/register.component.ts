
import { Router, ActivatedRoute } from '@angular/router';
import { StudentsService } from '../students.service';
import { CoursesService } from '../../courses/courses.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

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
    semester: Number;
  }

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  studentNum: String;
  student: Student;
  course: Course;
  selectedId: String;
  errorMessage: string;

  constructor(private _router: Router,private _route: ActivatedRoute,
    private _studentsService: StudentsService, private _coursesService: CoursesService) {
        this._route.queryParams.subscribe(params => this.studentNum = params['id']);
        
     }

  ngOnInit() {
    this._coursesService.listCourses()
    .subscribe((course) => {
      this.course = course;
      console.log(course);
      });

    this._studentsService
    .getStudent(this.studentNum)
    .subscribe((res) => {
        this.student = res
        console.log(this.student);
    });
  }

  register() {
      let details = {
          stdNum: this.studentNum,
          id: this.selectedId
      }
    this._studentsService
    .registerCourse(details)
    .subscribe((res) => {
        this.student = res
        console.log(this.student);
    });
  }

  onChange(id) {
      this.selectedId = id;
  }

}