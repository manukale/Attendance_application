import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SessionStorageService } from '../../services/session-storage.service';
import { LoginService } from '../../services/login.service';
import { UserDataService } from '../../services/user-data.service';

@Component({
  selector: 'app-navbar-teacher',
  standalone:true,
  imports: [RouterModule],
  templateUrl: './navbar-teacher.component.html',
  styleUrl: './navbar-teacher.component.css'
})
export class NavbarTeacherComponent {
currentUser : any
    constructor(private router: Router,  
      private session : SessionStorageService, 
      private loginService : LoginService,
    private userService : UserDataService) { }
  
    ngOnInit(){
      this.currentUser=this.session.getUserData('user')
      console.log('manasi',this.currentUser);
      console.log("User from session:", this.currentUser);
      
    }
    getAttendance(){
      
    }
  
    signOut() {
      this.loginService.userLogOut()
      this.router.navigate(['/'],{})
      this.session.removeUserData()
    }

}
