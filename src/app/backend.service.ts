import { Injectable } from '@angular/core';
import {Http,Headers,Response} from '@angular/http';
import {User} from './user.interface';
import {Observable} from 'rxjs/Observable';
import {Entry} from './entry';
import 'rxjs/add/operator/map';

@Injectable()
export class BackendService {

  constructor(private http:Http) {}

  submit(value:User):Observable<any> {
    const body= JSON.stringify(value);
    const headers=new Headers({'Content-type':'application/json'});
    return this.http.post('http://localhost:4200/api/insert',body,{headers:headers});


  }
  sub(value:Entry): Observable<any> {
  const body= JSON.stringify(value);
    const headers=new Headers({'Content-type':'application/json'});
    return this.http.post('http://localhost:4200/api/login',body,{headers:headers});


  }
   
   fetch():Observable<any>{
     return this.http.get('http://localhost:4200/api/display'). map((res:Response)=>res.json());
   }

}
