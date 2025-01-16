import { Component } from '@angular/core';
import { NavbarTeacherComponent } from "../navbar-teacher/navbar-teacher.component";
import { UserDataService } from '../../services/user-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SessionStorageService } from '../../services/session-storage.service';
import { NavbarStudentComponent } from "../navbar-student/navbar-student.component";
import { NavbarAdminComponent } from "../navbar-admin/navbar-admin.component";

@Component({
  selector: 'app-attendance',
  standalone:true,
  imports: [NavbarTeacherComponent, CommonModule, NavbarStudentComponent, NavbarAdminComponent],
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.css'
})
export class AttendanceComponent {

  id : string =''
  studentName : any
  attendance : any[] =[]
  currentUser : any
  constructor(private route : ActivatedRoute,private userservice : UserDataService , private session : SessionStorageService ){  }

  ngOnInit(){
    this.currentUser=this.session.getUserData('user') 
    // console.log('attendance history',this.currentUser);
    
    this.route.params.subscribe((p) => {
      // console.log(p['id']);
      this.id = p['id']
    });

    this.route.queryParamMap.subscribe((ele)=>{

      this.studentName = ele.get('name')
    })
    this.userservice.fetchUserData('attendance').subscribe((res)=>{
      // console.log(res);
      for (let i = 0; i < res.length; i++) {
        if (res[i].studId === this.id) {
          this.attendance.push(res[i])
        }
      }
    })

  }
  
}
