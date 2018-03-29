import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { Router } from '@angular/router';
import { Credentials } from '../interfaces/credentials';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  errorMessage: string;
  credentials: Credentials = {
    studentNumber: 300000000,
    password: ''
  };
  constructor(
    private _authService: AuthenticationService,
    private _router: Router) { }

  login() {
    this._authService.login(this.credentials)
      .subscribe(result =>
        this._router.navigate(['/home']),
        error => this.errorMessage = error);
  }
}
