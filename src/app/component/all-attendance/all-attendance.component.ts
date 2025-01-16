import { Component } from '@angular/core';
import { UserDataService } from '../../services/user-data.service';
import { CommonModule } from '@angular/common';
import { SessionStorageService } from '../../services/session-storage.service';
import { NavbarTeacherComponent } from '../navbar-teacher/navbar-teacher.component';

@Component({
  selector: 'app-all-attendance',
  standalone:true,
  imports: [NavbarTeacherComponent,CommonModule],
  templateUrl: './all-attendance.component.html',
  styleUrl: './all-attendance.component.css'
})
export class AllAttendanceComponent {
  attendance:any[]=[]
  currentUser : any
constructor(private session : SessionStorageService,private userservice : UserDataService){}

ngOnInit(){
  this.currentUser=this.session.getUserData('user') 
  this.userservice.fetchUserData('attendance').subscribe((res)=>{
    console.log(this.currentUser);
    for (let i = 0; i < res.length; i++) {
      if (res[i].dept === this.currentUser.dept) {
        console.log('manasi');
        
        this.attendance.push(res[i])
      }
    }
    // this.attendance = res
    
  })
}
}
