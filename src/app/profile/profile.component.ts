import { Component, OnInit,Input} from '@angular/core';
import{RegisterService} from './../register/register.service';
import { Router } from '@angular/router';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs';
import * as firebase from "firebase";


interface Image {
    path: string;
    filename: string;
    downloadURL?: string;
    $key?: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
data:Object;
arr:Object;
i:any;
picks = [];
randomIndex:number;
numbersArr = [];
ranArr=[];

@Input() folder: string;
dp:string;
fileList : FirebaseListObservable<Image[]>;
    imageList : Observable<Image[]>;

  constructor(private profile:RegisterService,private router:Router,public af: AngularFire) { }

  ngOnInit() {
    this.profile.getProfile().subscribe(profile=>{
      this.data=profile.user;
      console.log(profile.user._id);
    },err=>{
      console.log(err);
      return false;
      
    });

     this.profile.getFriends().subscribe(data=>
            {     this.arr=data;

                  this.i=Object.keys(this.arr).length;
                  
                  for ( var j = 0; j <this.i; j++ ) 
                  { 
                      this.numbersArr.push(j);
                  }
                
                   while (this.picks.length <10)
                   {
                        this.randomIndex = Math.floor(Math.random() * this.numbersArr.length);
                        
                        this.picks.push(this.numbersArr[this.randomIndex]);
                        this.numbersArr.splice(this.randomIndex, 1);
                   }
                   console.log(this.picks);
                   for(var k=0;k<this.picks.length;k++)
                   {
                     this.ranArr.push(data[this.picks[k]]);
                   }
                   

           });
           this.picks=[];
    
    
  }
    upload() {
        let storageRef = firebase.storage().ref();

        let success = false;
        for (let selectedFile of [(<HTMLInputElement>document.getElementById('file')).files[0]]) {
            console.log(selectedFile);
            let router = this.router;
            let af = this.af;
            let folder = this.folder;
            let path = `/${this.folder}/${selectedFile.name}`;
            var iRef = storageRef.child(path);
            iRef.put(selectedFile).then((snapshot) => {
                console.log('Uploaded a blob or file! Now storing the reference at',`/${this.folder}/images/`);
              this.dp=snapshot.downloadURL;

            });
            
        }
        

}

}
