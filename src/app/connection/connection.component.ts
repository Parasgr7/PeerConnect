import { Component, OnInit } from '@angular/core';

import {RegisterService} from './../register/register.service';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent implements OnInit {
data:Object;
arr:Object;
user=[];
i:any;
picks = [];
organ=[];
list=[];
j:any;
friend=[];
id:any;
  constructor(private peer:RegisterService) { }

  ngOnInit() {

  
this.peer.getFriends().subscribe(data=>
            {     this.arr=data;

              console.log(this.arr);
              
                  
            });
 
    
    
    
}
addFriend(val){

    this.peer.setFriend(val).subscribe(data=>{
      console.log(data);

    });

}


 

  


  
}
