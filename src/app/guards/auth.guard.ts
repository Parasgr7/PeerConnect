import { Injectable } from '@angular/core';
import{Router,CanActivate} from '@angular/router';

import{RegisterService} from './../register/register.service';

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private auth:RegisterService,private router:Router){}

canActivate(){
    if(this.auth.loggedIn()){
        return true; 
    }else{ 
        this.router.navigate(['/login']);
        return false;
    } 
 
} 
} 
