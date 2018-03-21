import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StudentsService } from '../students.service';

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
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  student: Student;
  errorMessage: string;

  constructor(private _router: Router,
    private _studentsService: StudentsService) { }

  create() {
    this._studentsService
      .create(this.student)
      .subscribe(createdStudent =>
        this._router.navigate(['/students',
          createdStudent.studentNumber]),
        error => this.errorMessage = error);
  }
}
