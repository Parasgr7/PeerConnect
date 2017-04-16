import { Injectable } from '@angular/core';
import {Http,Headers,Response} from '@angular/http';

import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class FriendService {


  constructor(private http:Http) { }
  url1:string='https://newsapi.org/v1/articles?source=techcrunch&sortBy=latest&apiKey=314d7740d67246d198122f60ac8b9a8e';
  url2:string='https://newsapi.org/v1/articles?source=engadget&sortBy=latest&apiKey=314d7740d67246d198122f60ac8b9a8e';

    apiFetch():Observable<any> {

    return this.http.get(this.url1).map((res:Response)=>res.json().articles);


  }
      apFetch():Observable<any> {

    return this.http.get(this.url2).map((res:Response)=>res.json().articles);


  }

}
