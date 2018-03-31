import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentsService } from '../students.service';
import { Student } from '../../interfaces/student';
import { AlertService } from '../../alert/alert.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  public studentId: String;
  public student: Student;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _alertService: AlertService,
    private _studentService: StudentsService) {
    this._route.queryParams.subscribe(params => this.studentId = params['id']);
  }

  ngOnInit() {
    this._studentService
      .getStudent(this.studentId)
      .subscribe(student => this.student = student);
  }

  update() {
    this._studentService
      .updateStudent(this.studentId, this.student)
      .subscribe(updatedStudent => {
        this._alertService.success(`Student (#${updatedStudent.studentNumber}) successfully updated`, true);
        this._router.navigate(['/students/details'],
          { queryParams: { 'id': updatedStudent._id } }
        );
      },
        error => this._alertService.error(error));

  }
}
