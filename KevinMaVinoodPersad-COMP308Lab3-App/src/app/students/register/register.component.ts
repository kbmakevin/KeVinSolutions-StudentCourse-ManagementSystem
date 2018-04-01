
import { Router, ActivatedRoute } from '@angular/router';
import { StudentsService } from '../students.service';
import { CoursesService } from '../../courses/courses.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Student } from '../../interfaces/student';
import { Course } from '../../interfaces/course';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  studentId: String;
  student: Student;
  course: Course;
  selectedId: String;
  errorMessage: string;

  constructor(private _router: Router, private _route: ActivatedRoute,
    private _studentsService: StudentsService, private _coursesService: CoursesService) {
    this._route.queryParams.subscribe(params => this.studentId = params['id']);

  }

  ngOnInit() {
    this._coursesService.listCourses()
      .subscribe((course) => {
        this.course = course;
        console.log(course);
      });

    this._studentsService
      .getStudent(this.studentId)
      .subscribe((res) => {
        this.student = res;
        console.log(this.student);
      });
  }

  // register() {
  //     if(this.selectedId == null) {
  //       console.log("Its null");
  //     } else if(this.selectedId == "") {
  //       console.log("its empty");
  //     } else {
  //         if(this.selectedId != "none") {
  //           let details = {
  //             stdId: this.studentId,
  //             id: this.selectedId
  //           }
  //           this._studentsService
  //           .registerCourse(details)
  //           .subscribe(res => 
  //             this._router.navigate(['/students/details'],  { queryParams: { id: this.studentId } }),
  //               error => this.errorMessage = error);
  //         } else {
  //           console.log("selected value is empty");
  //         }
  //     }

  //   }


  onChange(id) {
    this.selectedId = id;
    console.log(this.selectedId);
  }

}