import { Injectable } from '@angular/core';
import { log } from 'console';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }
  storeUserData(key: string , value :any) {
    if (typeof value === "object") {
      sessionStorage.setItem(key, JSON.stringify(value)); 
    } else {
      sessionStorage.setItem(key, value); 
    }
      
  }

  getUserData(key:string){
 
    const data = sessionStorage.getItem(key)
    // return data 
    console.log('getUserData::',data);
    
    return data ? JSON.parse(data) : null
   
  }

  removeUserData(){
    sessionStorage.clear()
  }

}
