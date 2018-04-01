import { ActivatedRoute } from '@angular/router';
import { StudentsService } from '../students.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Student } from '../../interfaces/student';
import { AuthenticationService } from '../../authentication/authentication.service';


@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit {
    studentId: string;
    student: Student;
    isMyProfile: Boolean;

    constructor(
        private _route: ActivatedRoute,
        private _authService: AuthenticationService,
        private _studentsService: StudentsService) {
        this._route.queryParams.subscribe(params => this.studentId = params['id']);
    }

    ngOnInit() {

        this._studentsService
            .getStudent(this.studentId)
            .subscribe((res) => {
                this.student = res;
                if (this._authService.isAdmin()) {
                    // 2018.03.31 - 20:43:40 - every profile belongs to admin :)
                    this.isMyProfile = true;
                } else {
                    // 2018.03.31 - 20:42:17 - student can only update THEIR OWN profile
                    this.isMyProfile = this._authService.getStudent()._id === this.studentId;
                }
            });

    }
}
