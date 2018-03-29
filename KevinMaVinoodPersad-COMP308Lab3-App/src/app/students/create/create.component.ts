import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StudentsService } from '../students.service';
import { Student } from '../../interfaces/student';

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
  errorMessage: string;

  constructor(private _router: Router,
    private _studentsService: StudentsService) { }

  create() {
    this._studentsService
      .create(this.student)
      .subscribe(createdStudent =>
        // 2018.03.27 - 09:31:28 - updated route
        this._router.navigate(['/students/details'],
          { queryParams: { 'id': createdStudent.studentNumber } }
        ),
        error => this.errorMessage = error);
  }
}
