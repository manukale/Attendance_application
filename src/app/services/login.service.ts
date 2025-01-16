import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private isLogin = false

  constructor() { }

  userLogin(){
    this.isLogin = true
  }
  userLogOut(){
    this.isLogin = false
  }

  isUserLogin(): boolean {
    return this.isLogin
  }
}
