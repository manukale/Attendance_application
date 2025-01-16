import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }
  storeUserData(key: string , value :any) {
    console.log("value session storage:",value);
    
    sessionStorage.setItem(key ,JSON.stringify(value))
      
  }

  getUserData(key:string){
 
    const data = sessionStorage.getItem(key)
    return data ? JSON.parse(data) : null
   
  }

  removeUserData(){
    sessionStorage.clear()
  }

}
