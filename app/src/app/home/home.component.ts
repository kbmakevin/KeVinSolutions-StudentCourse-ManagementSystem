import { Component, OnInit } from '@angular/core';
import { Student } from '../interfaces/student';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser: Student;

  title = 'home component';
  constructor(
    private _router: Router,
    private _authService: AuthenticationService) {
  }

  ngOnInit() {
    if (!this._authService.isAdmin()) {
      this._router.navigate(['/students/details'],
        { queryParams: { 'id': this._authService.getStudent()._id } });
    }
  }
}
