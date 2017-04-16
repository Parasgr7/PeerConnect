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
arr:Object;
i:any;
picks = [];
randomIndex:number;
numbersArr = [];
ranArr=[];

  constructor(private profile:RegisterService,private router:Router) { }

  ngOnInit() {
    this.profile.getProfile().subscribe(profile=>{
      this.data=profile.user;
      console.log(this.data);
    },err=>{
      console.log(err);
      return false;
      
    });

     this.profile.getFriends().subscribe(data=>
            {     this.arr=data;

                  this.i=Object.keys(this.arr).length;
                  
                  for ( var j = 0; j <this.i; j++ ) 
                  { 
                      this.numbersArr.push(j);
                  }
                
                   while (this.picks.length <5)
                   {
                        this.randomIndex = Math.floor(Math.random() * this.numbersArr.length);
                        
                        this.picks.push(this.numbersArr[this.randomIndex]);
                        this.numbersArr.splice(this.randomIndex, 1);
                   }
                   console.log(this.picks);
                   for(var k=0;k<this.picks.length;k++)
                   {
                     this.ranArr.push(data[this.picks[k]]);
                   }
                   

           });
           this.picks=[];
    
    
  }

}
