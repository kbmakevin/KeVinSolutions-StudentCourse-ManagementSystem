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

  student: Student = {

    studentNumber: 300123456,
    password: 'password',
    firstName: 'John',
    lastName: 'Doe',
    address: '123 Example Street',
    city: 'Toronto',
    phoneNumber: '416-123-4456',
    email: 'jdoe@example.com',
    program: 'Software Engineering Technology'

  };
  studentNumber: Number = 52;
  errorMessage: string;

  constructor(private _router: Router,
    private _studentsService: StudentsService) { }

  create() {

    console.log(`inside create component: 
    my student is: ${this.student}
    `);

    console.log(`number is : ${this.studentNumber}`);

    this._studentsService
      .create(this.student)
      .subscribe(createdStudent =>
        this._router.navigate(['/students',
          createdStudent.studentNumber]),
        error => this.errorMessage = error);
  }
}
