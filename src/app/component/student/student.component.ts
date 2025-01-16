import { Component } from '@angular/core';
import { UserDataService } from '../../services/user-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionStorageService } from '../../services/session-storage.service';
import { CommonModule } from '@angular/common';
import { NavbarTeacherComponent } from "../navbar-teacher/navbar-teacher.component";


@Component({
  selector: 'app-student',
  standalone:true,
  imports: [ NavbarTeacherComponent,CommonModule],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent {
  student: any[] = [];
  currentUser: any
  constructor(private router: Router, private userService: UserDataService, private route: ActivatedRoute, private session: SessionStorageService) { }

  ngOnInit() {
    this.currentUser = this.session.getUserData('user')
    this.student = []
    this.userService.fetchUserData('user').subscribe((res) => {
      // console.log(res);
      for (let i = 0; i < res.length; i++) {
        if (res[i].role === 'Student' && res[i].dept === this.currentUser.dept) {
          this.student.push(res[i])
        }
      }
      // console.log(this.student);
    });
  }
  showAttendance(data : any){
    
    this.router.navigate(['/attendance',data.id],{
      queryParams:{
name : data.name
      }
    }
    )
  }
  showStudentProfile(data : any){
    this.router.navigate(['/studentProfile',data.id]),{
      queryParams:{
        name : data.name,
        dept:data.dept,
        role:data.role,
        photo:data.photo,
        email:data.email

      }
    }
  }

}
