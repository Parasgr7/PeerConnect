import { Component, OnInit,Input } from '@angular/core';
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
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @Input() folder: string;
dp:string;
fileList : FirebaseListObservable<Image[]>;
    imageList : Observable<Image[]>;
  constructor(public af: AngularFire, public router: Router) { }

  ngOnInit() {
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
