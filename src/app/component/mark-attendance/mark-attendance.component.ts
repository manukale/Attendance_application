import { Component } from '@angular/core';
import { NavbarStudentComponent } from "../navbar-student/navbar-student.component";
import { FormsModule } from '@angular/forms';
import { SessionStorageService } from '../../services/session-storage.service';
import { UserDataService } from '../../services/user-data.service';

@Component({
  selector: 'app-mark-attendance',
  standalone:true,
  imports: [NavbarStudentComponent,FormsModule],
  templateUrl: './mark-attendance.component.html',
  styleUrl: './mark-attendance.component.css'
})
export class MarkAttendanceComponent {
  currentUser:any
  date:string =''
  punchin: string=''
  punchout:string = ''
  ispresent = false

  constructor(private session: SessionStorageService , private userservice : UserDataService){}
  ngOnInit(){
this.currentUser= this.session.getUserData('user')
  }

  addAttendance(data : any){
    console.log('current User: ',this.currentUser);
    
    data.user = this.currentUser._id
    data.name = this.currentUser.name
    data.dept = this.currentUser.dept
    
// console.log('mark-attendance:',data);
this.userservice.addAttendanceData(data , 'attendance/addAttendance').subscribe((ele)=>{
  alert('Attendance Mark Successfully')

})

  }
}
