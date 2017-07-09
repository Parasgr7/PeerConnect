import { Component, OnInit,Input } from '@angular/core';
import {Complete} from './../comp.interface';

import {Complete2} from './../complete2.interface';
import { Router } from '@angular/router';
import{RegisterService} from './../register/register.service';
// import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs';
// import * as firebase from "firebase";


interface Image {
    path: string;
    filename: string;
    downloadURL?: string;
    $key?: string;
}

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.css']
})
export class CompleteComponent implements OnInit {
public user: Complete;
public user1:Complete2;

@Input() folder: string;
dp:string;
data;
// fileList : FirebaseListObservable<Image[]>;
    imageList : Observable<Image[]>;
  constructor(private complete:RegisterService,private router:Router) { }

  ngOnInit() {
        this.user = {     
                        college:'',
                        address:'',
                        gender:'',
                        role:'',
                        skills:'',
                        resume:'',
                        accomplish:'',
                     

                    }
        this.user1={
                         jobs:'',
                        website:'',
                        size:'',
                        product:'',
                        whyus:''
        }
                 
                     this.complete.getProfile().subscribe(profile=>{
                            this.data=profile
                            console.log(this.data);
                        },err=>{
                        console.log(err);
                        return false;
                        
                    });
                    


   }


//    upload() {
//         let storageRef = firebase.storage().ref();

//         let success = false;
//         for (let selectedFile of [(<HTMLInputElement>document.getElementById('file')).files[0]]) {
//             console.log(selectedFile);
//             let router = this.router;
//             let af = this.af;
//             let folder = this.folder;
//             let path = `/${this.folder}/${selectedFile.name}`;
//             var iRef = storageRef.child(path);
//             iRef.put(selectedFile).then((snapshot) => {
//                 console.log('Uploaded file!  Storing the reference at',`/${this.folder}/images/`);
//               this.dp=snapshot.downloadURL;
//               if(this.dp)
//               {
//                 this.complete.image(this.dp).subscribe(data=>{});
//               }

//             });
            
//         }
//    }

onsubmit(value:Complete)
{
console.log(value);
this.complete.complete(value).subscribe(data=>{});

}
onsubmit1(value:Complete2)
{
console.log(value);
this.complete.complete1(value).subscribe(data=>{});

}





}
