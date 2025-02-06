import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SessionStorageService } from '../../services/session-storage.service';
import { LoginService } from '../../services/login.service';
import { UserDataService } from '../../services/user-data.service';

@Component({
  selector: 'app-navbar-admin',
  standalone:true,
  imports: [RouterModule],
  templateUrl: './navbar-admin.component.html',
  styleUrl: './navbar-admin.component.css'
})
export class NavbarAdminComponent {
  currentUser : any
  student :any
 constructor(private router: Router,  private session : SessionStorageService , private loginService : LoginService,
  private userService : UserDataService
 ) { }
  
    ngOnInit(){
      this.currentUser=this.session.getUserData('user')
      // console.log('manasi',this.currentUser);    
    }

    signOut() {
      this.loginService.userLogOut()
      this.router.navigate(['/'],{})
      this.session.removeUserData()
    }

    showAllStudent(){
      this.student=this.userService.fetchUserData('user/getUser').subscribe((res)=>{

        for (let i = 0; i < this.student.length; i++) {
          
          if(this.student.role=== 'Student'){
            this.student.push()
          }
          
        }
  console.log('student:',this.student);
      })

    }
}
