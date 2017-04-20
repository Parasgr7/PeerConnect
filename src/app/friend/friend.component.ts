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
comp:any;
indi:any;

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
  refCompany(value,name)
  {
this.comp=(<HTMLInputElement>document.getElementById('company')).value
console.log(value);

this.peer.refCompany(value,this.comp,name).subscribe((data)=>{
  console.log(data);
});
  }

  refIndividual(val)
  {

this.indi=(<HTMLInputElement>document.getElementById('individual')).value
console.log(val);
this.peer.refIndividual(val,this.indi).subscribe((data)=>{
  console.log(data);
});

  }
  
 


}
