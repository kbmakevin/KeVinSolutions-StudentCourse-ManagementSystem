import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { StudentsModule } from './students/students.module';
import { CoursesModule } from './courses/courses.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthenticationService } from './authentication/authentication.service';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from './alert/alert.component';
import { AlertService } from './alert/alert.service';

const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpModule,
    StudentsModule,
    CoursesModule
  ],
  providers: [AuthenticationService, AlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
