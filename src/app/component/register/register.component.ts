import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserDataService } from '../../services/user-data.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone:true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule,HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  userData:any[] =[]
  myForm : FormGroup;

  constructor(private builderObj: FormBuilder, private userService : UserDataService, private router : Router){
    this.myForm = this.builderObj.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.email,Validators.required]],
      dept: ['', [Validators.required]],
      password: ['', [Validators.minLength(8),Validators.required]],
      role: ['', [Validators.required]],
    })
  }

registerUser(){
  if (this.myForm.valid) {
    // console.log(this.myForm.value, 'value of reactive form ');
    this.userService.addUserData(this.myForm.value , 'user/registerUser').subscribe((res)=> {
      alert("User Register Successfully")
      this.router.navigate(['/login'],{})

    })
  } else {
    console.log(this.myForm, 'error from forms ');
  }
}
}

