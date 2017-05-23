
import { Component,OnInit } from '@angular/core';
import{TranslateService} from 'ng2-translate';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  

  
    public message;
    constructor()
    {
       /* translate.addLangs(['en','fr','cn','hi']);
        translate.setDefaultLang('en');

        let browserLang=translate.getBrowserLang();
        //translate.use(browserLang.match(/en|fr|cn|hi/)? browserLang:'en');
    */
  
    }
    
    
    ngOnInit() 
    {

    }





}
