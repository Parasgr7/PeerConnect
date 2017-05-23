import { Component, OnInit } from '@angular/core';
import{RegisterService} from './../register/register.service';
import{Router} from '@angular/router';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
value:boolean;
  constructor(private auth:RegisterService,private router:Router) { }

  ngOnInit() {
  }
delete()
{
  if(confirm('Are you confirm you want to delete your account permanently'))
  {
    
    this.auth.delete1().subscribe(data=>console.log(data));
    this.auth.logout();
    console.log('Succesfully Logged out');
    this.router.navigate(['/login']);
    return false;
  }
  
}
}
