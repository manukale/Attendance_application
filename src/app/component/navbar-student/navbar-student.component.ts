import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SessionStorageService } from '../../services/session-storage.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-navbar-student',
  standalone:true,
  imports: [RouterModule],
  templateUrl: './navbar-student.component.html',
  styleUrl: './navbar-student.component.css'
})
export class NavbarStudentComponent {

currentUser : any
    constructor(private router: Router,  private session : SessionStorageService, private route : ActivatedRoute, private loginService : LoginService) { }
  
    ngOnInit(){
      this.currentUser=this.session.getUserData('user')
      
    }
  
    signOut() {
      this.loginService.userLogOut()
      this.router.navigate(['/'],{})
      this.session.removeUserData()
    }

    attendanceHistory(data : any){
      // console.log("studentNavbar",data);
      
      this.router.navigate(['/attendance', data.id],{
        queryParams:{
          name : data.name
        }
      }
      )
    }
}
