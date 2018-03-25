
import { Router } from '@angular/router';
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

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  student: Student;
  errorMessage: string;

  constructor(private _router: Router,
    private _studentsService: StudentsService) {
        
     }

  ngOnInit() {
    this._studentsService.listStudents()
    .subscribe((student) => {
      this.student = student;
      console.log(student);
      });
  }

}
