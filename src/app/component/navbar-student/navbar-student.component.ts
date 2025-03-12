import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SessionStorageService } from '../../services/session-storage.service';
import { LoginService } from '../../services/login.service';
import { UserDataService } from '../../services/user-data.service';

@Component({
  selector: 'app-navbar-student',
  standalone:true,
  imports: [RouterModule],
  templateUrl: './navbar-student.component.html',
  styleUrl: './navbar-student.component.css'
})
export class NavbarStudentComponent {

currentUser : any
img:any
    constructor(private router: Router,  
      private session : SessionStorageService, 
      private userservice : UserDataService, 
      private loginService : LoginService) { }
  
    ngOnInit(){
      this.currentUser=this.session.getUserData('user')
      this.img = this.userservice.URL+this.currentUser.photo
      
    }
  
    signOut() {
      this.loginService.userLogOut()
      this.router.navigate(['/'],{})
      this.session.removeUserData()
    }
    addAttendance(data:any){
      const { _id, ...newData } = data;
      newData.user = data._id
      
  this.userservice.addAttendanceData(newData , `attendance/addAttendance`).subscribe((ele)=>{
    alert('Attendance Mark Successfully')
  
  })
    }

    attendanceHistory(data : any){
      console.log('attendance history:',data);
      
      this.router.navigate(['/attendance', data._id],{
        queryParams:{
          name : data.name
        }
      }
      )
    }
}
