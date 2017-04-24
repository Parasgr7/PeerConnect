import { Component, OnInit,Input } from '@angular/core';
import {Complete} from './../comp.interface';

import { Router } from '@angular/router';
import{RegisterService} from './../register/register.service';
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
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.css']
})
export class CompleteComponent implements OnInit {
public user: Complete;

@Input() folder: string;
dp:string;
fileList : FirebaseListObservable<Image[]>;
    imageList : Observable<Image[]>;
  constructor(private complete:RegisterService,private router:Router,public af: AngularFire) { }

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
                console.log('Uploaded file!  Storing the reference at',`/${this.folder}/images/`);
              this.dp=snapshot.downloadURL;

            });
            
        }
   }

onsubmit(value:Complete)
{
console.log(value);
this.complete.complete(value).subscribe(data=>{

});

}



}
