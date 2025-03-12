import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserDataService } from '../../services/user-data.service';
import { HttpClientModule } from '@angular/common/http';
import { SessionStorageService } from '../../services/session-storage.service';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';
import { log } from 'node:console';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, HttpClientModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userData: any[] = [];
  role : any =''
  isPasswordVisible: boolean = false;

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
    this.userService.fetchUserData('user/getUser').subscribe((res) => {
      this.userData = res;
    });
  }

  ngOnInit() {
    this.fetchData();
  }
  togglePassword() {
    this.isPasswordVisible = true;
  }

  loginForm(data: any) {
    // if (data.role === '' || data.email === '' || data.password === '') {
    //   alert('Please Fill All The Details...')
    // }
    this.userService.fetchUserDataByEmail('user/getUserByEmail',data.email).subscribe((res) => {
      
      this.session.storeUserData(this.user_key ,res)
    })
     this.userService.loginUser('user/loginUser',data).subscribe((res) => {
     
      if(res.msg === 'Login Successful'){
        alert(res.msg)
        
        this.loginService.userLogin();

        if(res.role === 'Teacher') {
                this.router.navigate(['/home'], {})   
              }
        if(res.role === 'Student') {
                this.router.navigate(['/studentHome'], {})   
              }
        if(res.role === 'Admin') {
                this.router.navigate(['/adminHome'], {})   
              }
      }else{
        alert(res.msg)
      }
      
    });
    
    // console.log('role:',this.role);
    

    // for (let index = 0; index < this.userData.length; index++) {

    //   if (data.email === this.userData[index].email && data.password === this.userData[index].password && data.role === this.userData[index].role) {
    //     alert('Login Successfully...')
    //     this.loginService.userLogin();
    //     this.isUserMatched = true
        
    //     this.session.storeUserData(this.user_key ,
    //     this.userData[index])

    //     if (this.userData[index].role === 'Teacher') {
    //       this.router.navigate(['/home'], {
    //       })   
    //     }
    //     if (this.userData[index].role === 'Admin') {

    //       // console.log('Admin');
    //       this.router.navigate(['/adminHome'], {
    //       })

    //     }
    //     if (this.userData[index].role === 'Student') {
    //       this.router.navigate(['/studentHome'], {
    //       })

    //     }
    //   }

    // }
    // if (this.isUserMatched === false) {
    //   alert('Check Your Credentials')

    // }
  }

  forgetPassword(){
    console.log('forgetPassword');
    // this.router.navigateByUrl('/forgetPassword');
    // this.router.navigate(['/forgetPassword'], { skipLocationChange: false });

    this.router.navigate(['/forgetPassword'], {})   
  }
}
