import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserDataService } from '../../services/user-data.service';
import { HttpClientModule } from '@angular/common/http';
import { SessionStorageService } from '../../services/session-storage.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userData: any[] = [];
  user: {
    email: '',
    password: '',
    role: ''
  }
  user_key = 'user'
  isUserMatched = false
  constructor(private router: Router, private userService: UserDataService , private session : SessionStorageService , private loginService : LoginService) {
    this.user = {
      email: '',
      password: '',
      role: ''
    }
  }
  fetchData() {
    this.userService.fetchUserData('user').subscribe((res) => {
      this.userData = res;
    });
  }

  ngOnInit() {
    this.fetchData();
  }
  
  loginForm(data: any) {
    // console.log(this.userData, 'res in fetch data');
    if (data.role === '' || data.email === '' || data.password === '') {
      // console.log('role is not selected');
      alert('Please Fill All The Details...')

    }

    for (let index = 0; index < this.userData.length; index++) {

      if (data.email === this.userData[index].email && data.password === this.userData[index].password && data.role === this.userData[index].role) {
        alert('Login Successfully...')
        this.loginService.userLogin();
        this.isUserMatched = true
        
        this.session.storeUserData(this.user_key ,
        //   {id: this.userData[index].id,
        //   name : this.userData[index].name , 
        //   role : this.userData[index].role , 
        //   dept:this.userData[index].dept,
        //   email:this.userData[index].email,
        //   photo : this.userData[index].photo,
        //   password : this.userData[index].password
        // }  
        this.userData[index])

        if (this.userData[index].role === 'Teacher') {
          this.router.navigate(['/home'], {
            queryParams: {
              name: this.userData[index].name,
              role: this.userData[index].role,
              dept: this.userData[index].dept,
            }
          })   //query.param
          // break;
        }
        if (this.userData[index].role === 'Admin') {

          // console.log('Admin');
          this.router.navigate(['/adminHome'], {
            // queryParams : this.userData[index].name && this.userData[index].role
            // queryParams: {
            //   name: this.userData[index].name,
            //   role: this.userData[index].role,
            //   dept: this.userData[index].dept,
            // }
          })

        }
        if (this.userData[index].role === 'Student') {
          this.router.navigate(['/studentHome'], {
            // queryParams : this.userData[index].name && this.userData[index].role
            // queryParams: {
            //   name: this.userData[index].name,
            //   role: this.userData[index].role,
            //   dept: this.userData[index].dept,
            // }
          })

        }
      }
      // else{
      //   alert('Check Your Credentials...')
      //   break;
      // }

    }
    if (this.isUserMatched === false) {
      alert('Check Your Credentials')

    }
  }
}
