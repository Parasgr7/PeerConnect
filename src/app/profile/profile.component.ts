import { Component, OnInit } from '@angular/core';
import{RegisterService} from './../register/register.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
data:Object;
  constructor(private profile:RegisterService,private router:Router) { }

  ngOnInit() {
    this.profile.getProfile().subscribe(profile=>{
      this.data=profile.user;
      console.log(this.data);
    },err=>{
      console.log(err);
      return false;
      
    });
    
  }

}
