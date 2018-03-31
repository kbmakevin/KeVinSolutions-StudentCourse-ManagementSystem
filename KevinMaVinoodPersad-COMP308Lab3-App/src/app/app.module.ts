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
import { routing } from '../app/app.routing';
import { AuthGuard } from './authentication/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    StudentsModule,
    CoursesModule,
    routing
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    AlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
