import { Component, OnInit } from '@angular/core';
import{RegisterService} from './../register/register.service';
import{Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public auth:RegisterService,private router:Router) { }

  ngOnInit() {

  } 
logoutClick()
{ 
this.auth.logout();
console.log('Succesfully Logged out');
this.router.navigate(['/login']);
return false;

}

}
