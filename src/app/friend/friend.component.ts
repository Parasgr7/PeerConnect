import { Component, OnInit } from '@angular/core';


import {RegisterService} from './../register/register.service';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {

arr1:any;
arr2:any;
lengthCompany:any;

lengthFriend:any;

  constructor(private peer:RegisterService) { }

  ngOnInit() {

    this.peer.fetchFriend().subscribe(data=>
            {    
                this.arr1=data;
                this.lengthFriend=Object.keys(this.arr1).length;
              
            });
    this.peer.fetchCompany().subscribe(data=>
            {    
                this.arr2=data;
                this.lengthCompany=Object.keys(this.arr2).length;
              
            });
    

  }
  
 


}
