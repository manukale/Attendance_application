import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.css'
})
export class ForgetpasswordComponent {
  user={
    email: '',
  password:''
  }

  isChecked : boolean = false
  
  constructor(){
    this.user.email = '',
    this.user.password = ''
  }

  updatePassword(data : any){
    
    if(!data.email){
      alert('Enter Your Email id')
     }
     else if(data.password.length < 8){
      this.isChecked = true
     } else {
      this.isChecked = false
      console.log('cred:',data);
      console.log(data.password.length);
    }
    
  }
}
