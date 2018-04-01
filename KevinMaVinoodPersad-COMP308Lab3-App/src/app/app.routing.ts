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
import { RoleGuard } from './authentication/role.guard';
import { UpdateComponent } from './students/update/update.component';
import { PersonalGuard } from './authentication/personal.guard';
import { CourseDetailComponent } from './courses/details/coursedetail.component';
import { UpdateCourseComponent } from './courses/update-course/update-course.component';

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
            // only admins can create new students
            { path: 'create', component: CreateComponent, canActivate: [RoleGuard] },
            // 2018.03.31 - 16:53:36 - students can only edit THEIR OWN profiles
            { path: 'update', component: UpdateComponent, canActivate: [PersonalGuard] },
            { path: 'details', component: DetailsComponent },
        ],
    },
    {
        path: 'courses',
        component: CoursesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: ListCoursesComponent },
            { path: 'create', component: CreateCourseComponent, canActivate: [RoleGuard] },
            { path: 'update', component: UpdateCourseComponent, canActivate: [RoleGuard] },
            { path: 'details', component: CourseDetailComponent },
        ]
    },
    // { path: 'profile', redirectTo: 'students/details' },
    { path: '**', redirectTo: 'home' }
];

export const routing = RouterModule.forRoot(appRoutes);
