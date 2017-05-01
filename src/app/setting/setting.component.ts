import { Component, OnInit } from '@angular/core';

import{RegisterService} from './../register/register.service';
declare var $:any;

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
 ngAfterViewInit() {
        
        $('.SeeMore2').click(function(){
        var $this = $(this);
        $this.toggleClass('SeeMore2');
        if($this.hasClass('SeeMore2')){
            $this.text('See More');         
        } else {
            $this.text('Off');
          $('button').prop('disabled', true);
        }
    });
    }

}
