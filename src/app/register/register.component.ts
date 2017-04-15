import { Component, OnInit } from '@angular/core';
import {User} from './../user.interface';
import{RegisterService} from './register.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

 public user: User;
 arr=[];
 
  constructor(private register:RegisterService) {}

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
   this.register.register(value).subscribe(bro => {this.arr=bro;console.log(bro);});


    }
   
}
