import { Component, OnInit } from '@angular/core';
import {User} from './../user.interface';
import{RegisterService} from './../register/register.service';
import {Router } from '@angular/router';
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

 public user: User;
 arr=[];
 
  constructor(private register:RegisterService,private router:Router) { }

  ngOnInit() {
     this.user = {      name:'',
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
     console.log(bro);
     if(bro.success)
     {
       this.router.navigate(['/login']);

     }else{
       this.router.navigate(['/register']);

     }
   });


    }
}
