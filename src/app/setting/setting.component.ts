import { Component, OnInit } from '@angular/core';

import{RegisterService} from './../register/register.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {


  constructor(private profile:RegisterService) { }

  ngOnInit() {
  }
delete()
{
this.profile.delete().subscribe(data=>{
  console.log(data)

});
}

}
