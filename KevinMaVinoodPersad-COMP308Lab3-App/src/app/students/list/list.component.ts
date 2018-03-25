
import { Router } from '@angular/router';
import { StudentsService } from '../students.service';
import { Component, OnInit } from '@angular/core';

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


  private students: Student[] = [];
  errorMessage: string;

  constructor(private _router: Router,
    private _studentsService: StudentsService) {
        
     }

  ngOnInit() {
    this._studentsService.listStudents()
    .subscribe((student) => {
      this.students.push(student);
      });

    console.log(this.students);
  }

}
