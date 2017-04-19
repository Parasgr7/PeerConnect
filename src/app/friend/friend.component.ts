import { Component, OnInit } from '@angular/core';


import {RegisterService} from './../register/register.service';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {

arr:any;
leng:any;

  constructor(private peer:RegisterService) { }

  ngOnInit() {

    this.peer.getFri().subscribe(data=>
            {    
                this.arr=data;
                console.log(this.arr);
                this.leng=Object.keys(this.arr).length
              
              
                  
            });
    

  }
  
 


}
