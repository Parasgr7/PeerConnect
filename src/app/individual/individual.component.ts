import { Component, OnInit } from '@angular/core';
import {User} from './../user.interface';
import{RegisterService} from './../register/register.service';
import {Router } from '@angular/router';
@Component({
  selector: 'app-individual',
  templateUrl: './individual.component.html',
  styleUrls: ['./individual.component.css']
})
export class IndividualComponent implements OnInit {


 public user: User;
 arr=[];
 
  constructor(private register:RegisterService,private router:Router) { }

  ngOnInit() {
      this.user = {    name:'',
                       companyname:'',
                        username: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                        market:'',
                        location:''
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
