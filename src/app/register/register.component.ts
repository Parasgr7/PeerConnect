import { Component, OnInit } from '@angular/core';
import {User} from './../user.interface';
import{RegisterService} from './register.service';
import {Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

 public user: User;
 arr=[];
 
  constructor(private register:RegisterService,private router:Router) {}

  ngOnInit() {
    this.user = {
                        username: '',
                        email: '',
                        password: '',
                        confirmPassword: ''
                    }
  }
 onsubmit(value:User,isValid:boolean)
 {
   console.log(value);
   this.register.register(value).subscribe(bro => {
     if(bro.success)
     {
       this.router.navigate(['/login']);

     }else{
       this.router.navigate(['/register']);

     }
   });


    }
   
}
