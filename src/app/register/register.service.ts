import { Injectable } from '@angular/core';
import {Http,Headers,Response} from '@angular/http';
import {User} from './../user.interface';
import {Observable} from 'rxjs/Observable';
import {Entry} from './../entry';
import {tokenNotExpired} from 'angular2-jwt';

import 'rxjs/add/operator/map';


@Injectable()
export class RegisterService {
  authToken:any;

 user:any;

  constructor(private http:Http) {}

 register(value:User)
 {  const body= JSON.stringify(value);
   let headers= new Headers();
   headers.append('Content-Type','application/json'); 
   
    return this.http.post('http://localhost:3000/api/register',body,{headers:headers})
          .map(res=>res.json());


  }
login(value:Entry)
{
  const body= JSON.stringify(value);
   let headers= new Headers();
   headers.append('Content-Type','application/json');
   
    return this.http.post('http://localhost:3000/api/authenticate',body,{headers:headers})
          .map(res=>res.json());


}
getProfile(){
  let headers= new Headers();
  this.loadToken();
  headers.append('Authorization',this.authToken);
   
   headers.append('Content-Type','application/json');
   
    return this.http.get('http://localhost:3000/api/profile',{headers:headers})
          .map(res=>res.json());

}

 storeUserData(token,user)
 {
   localStorage.setItem('id_token',token);
   localStorage.setItem('user', JSON.stringify(user));
   this.authToken=token;
   this.user=user; 

    }
  logout()
  {
    this.authToken= null;
    this.user= null;
    localStorage.clear();
  
  }
  loggedIn(){
    return tokenNotExpired('id_token');
  }

  loadToken(){
    const token=localStorage.getItem('id_token');
    this.authToken=token; 
  }

}