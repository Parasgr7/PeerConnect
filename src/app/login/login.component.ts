import { Component, OnInit } from '@angular/core';
import {Entry} from './../entry';
import {RegisterService} from './../register/register.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 public entry: Entry;
  constructor(private login:RegisterService,private router:Router) { }

  ngOnInit() {
               
        this.entry={
          uname: '',
          password: ''

        }
  }
   onlog(value:Entry)
 {
   console.log(value);
   this.login.login(value).subscribe(data => {
     if(data.success)
     {
      this.login.storeUserData(data.token,data.user);
      console.log('Logged In');

     this.router.navigate(['dashboard']);

     }
     else{
 console.log(data.msg);
     this.router.navigate(['login']);
     }

 });
}
}
       
 

