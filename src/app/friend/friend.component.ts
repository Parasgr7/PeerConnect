import { Component, OnInit } from '@angular/core';
import {RegisterService} from './../register/register.service';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {

arr:Object;
user=[];
i:any;
picks = [];

  constructor(private peer:RegisterService) { }

  ngOnInit() {
    this.peer.getFriends().subscribe(data=>
            {     this.arr=data;
                  
            });
    
    

  }
  
  addFriend(val){
    this.user.push(val);
    console.log(this.user);
}


}
