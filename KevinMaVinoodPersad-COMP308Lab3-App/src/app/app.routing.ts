import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { StudentsComponent } from './students/students.component';
import { ListComponent } from './students/list/list.component';
import { CreateComponent } from './students/create/create.component';
import { DetailsComponent } from './students/details/details.component';
import { CoursesComponent } from './courses/courses.component';
import { ListCoursesComponent } from './courses/list/listcourses.component';
import { CreateCourseComponent } from './courses/create/createcourse.component';
import { AuthGuard } from './authentication/auth.guard';

// 2018.03.30 - 12:34:17 - created app.routing for all routes in application

const appRoutes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    {
        path: 'students',
        component: StudentsComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: ListComponent },
            { path: 'create', component: CreateComponent },
            { path: 'details', component: DetailsComponent },
        ],
    },
    {
        path: 'courses',
        component: CoursesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: ListCoursesComponent },
            { path: 'create', component: CreateCourseComponent }
        ]
    },
    { path: '**', redirectTo: 'home' }
];

export const routing = RouterModule.forRoot(appRoutes);
