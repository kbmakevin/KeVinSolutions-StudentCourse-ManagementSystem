import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { StudentsModule } from './students/students.module';

import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { CoursesComponent } from './courses/courses.component';

const appRoutes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
];

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpModule,
    HomeModule,
    StudentsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
