import { Router } from '@angular/router';
import { StudentsService } from '../students.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from '../../authentication/authentication.service';
import { Student } from '../../interfaces/student';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  student: Student;

  constructor(
    private _authService: AuthenticationService,
    private _studentsService: StudentsService) {
  }

  ngOnInit() {
    this._studentsService.listStudents()
      .subscribe((student) => {
        this.student = student;
        // console.log(student);
      });
  }

}
