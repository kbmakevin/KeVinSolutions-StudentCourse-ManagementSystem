import { Component } from '@angular/core';
import { Student } from '../interfaces/student';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  currentUser: Student;

  title = 'home component';
  constructor() {
    // 2018.03.28 - 19:54:04 - even tho we receive from API as JSON obj, need to parse again because sessionStorage stores data as strings
    this.currentUser = JSON.parse(sessionStorage.getItem('currentStudent'));
  }
}
