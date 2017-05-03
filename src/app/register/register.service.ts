import { Injectable } from '@angular/core';
import {Http,Headers,Response} from '@angular/http';
import {User} from './../user.interface';
import {Observable} from 'rxjs/Observable';
import {Entry} from './../entry';
import {tokenNotExpired} from 'angular2-jwt';

import 'rxjs/add/operator/map';


@Injectable()
export class RegisterService {
  authToken:any;

 user:any;
 id:any;

  constructor(private http:Http) {}

 register(value:User)
 {  const body= JSON.stringify(value);
   let headers= new Headers();
   headers.append('Content-Type','application/json'); 
   
    return this.http.post('http://localhost:3000/api/register',body,{headers:headers})
          .map(res=>res.json());


  }
 setFriend(value)
 {  const body= JSON.stringify(value);
   let headers= new Headers();
   this.loadToken();

  headers.append('Authorization',this.authToken);

   headers.append('Content-Type','application/json'); 
   
    return this.http.put('http://localhost:3000/api/setFriend/'+this.id.id,body,{headers:headers}).map(res=>res.json());


  }
  setCompany(value)
 {  const body= JSON.stringify(value);
   let headers= new Headers();
   this.loadToken();

  headers.append('Authorization',this.authToken);

   headers.append('Content-Type','application/json'); 
   
    return this.http.put('http://localhost:3000/api/setCompany/'+this.id.id,body,{headers:headers}).map(res=>res.json());


  }



login(value:Entry)
{
  const body= JSON.stringify(value);
   let headers= new Headers();

   headers.append('Content-Type','application/json');
   
    return this.http.post('http://localhost:3000/api/authenticate',body,{headers:headers})
          .map(res=>res.json());


}
getProfile(){
  let headers= new Headers();
  this.loadToken();
  headers.append('Authorization',this.authToken);
   
   headers.append('Content-Type','application/json');
   
    return this.http.get('http://localhost:3000/api/profile/'+this.id.id,{headers:headers})
          .map(res=>res.json());

}


  getFriends():Observable<any> 
  {
    let headers= new Headers();
  this.loadToken();
  headers.append('Authorization',this.authToken);
   
   headers.append('Content-Type','application/json');

    return this.http.get('http://localhost:3000/api/friends',{headers:headers}).map((res:Response)=>res.json());

  }

 fetchFriend():Observable<any> 
  {
    let headers= new Headers();
  this.loadToken();
  headers.append('Authorization',this.authToken);
   
   headers.append('Content-Type','application/json');

    return this.http.get('http://localhost:3000/api/fetchFriend/'+this.id.id,{headers:headers}).map((res:Response)=>res.json().friend);

  }
fetchCompany():Observable<any> 
  {
    let headers= new Headers();
  this.loadToken();
  headers.append('Authorization',this.authToken);
   
   headers.append('Content-Type','application/json');

    return this.http.get('http://localhost:3000/api/fetchCompany/'+this.id.id,{headers:headers}).map((res:Response)=>res.json().company);

  }

refCompany(val1,val2,val3):Observable<any>
{ const body=JSON.stringify({"mail1": val1, "mail2": val2,"user":this.id.name});
   let headers= new Headers();
 this.loadToken();
   headers.append('Content-Type','application/json');

  headers.append('Authorization',this.authToken);
   
    return this.http.post('http://localhost:3000/api/refCompany',body,{headers:headers})
          .map(res=>res.json());


}

refIndividual(val1,val2):Observable<any>
{const body=JSON.stringify({"mail1": val1, "mail2": val2,"user":this.id.name});
   let headers= new Headers();
 this.loadToken();
   headers.append('Content-Type','application/json');

  headers.append('Authorization',this.authToken);
   
    return this.http.post('http://localhost:3000/api/refIndividual',body,{headers:headers})
          .map(res=>res.json());


}

followFriend(id)
{
  const body=JSON.stringify({"id":id});
let headers= new Headers();
  this.loadToken();
  headers.append('Authorization',this.authToken);
   
   headers.append('Content-Type','application/json');

    return this.http.post('http://localhost:3000/api/followFriend/'+this.id.id,body,{headers:headers}).map((res:Response)=>res.json());

}
followCompany(id)
{
  const body=JSON.stringify({"id":id});
let headers= new Headers();
  this.loadToken();
  headers.append('Authorization',this.authToken);
   
   headers.append('Content-Type','application/json');

    return this.http.post('http://localhost:3000/api/followCompany/'+this.id.id,body,{headers:headers}).map((res:Response)=>res.json());

}

complete(val1)
{
      const body= JSON.stringify(val1);
     
        let headers= new Headers();
        this.loadToken();
        headers.append('Content-Type','application/json'); 

  headers.append('Authorization',this.authToken);
   
          return this.http.put('http://localhost:3000/api/complete/'+this.id.id,body,{headers:headers})
          .map(res=>res.json());

}
complete1(val1)
{
      const body= JSON.stringify(val1);
     
        let headers= new Headers();
        this.loadToken();
        headers.append('Content-Type','application/json'); 

  headers.append('Authorization',this.authToken);
   
          return this.http.put('http://localhost:3000/api/complete1/'+this.id.id,body,{headers:headers})
          .map(res=>res.json());

}

image(dp)
{
  const body= JSON.stringify({"dp":dp});

        let headers= new Headers();
        this.loadToken();

        headers.append('Content-Type','application/json'); 
        headers.append('Authorization',this.authToken);
   
          return this.http.put('http://localhost:3000/api/image/'+this.id.id,body,{headers:headers})
          .map(res=>res.json());
          
}


delete()
{

        let headers= new Headers();
        this.loadToken();
        headers.append('Content-Type','application/json'); 

  headers.append('Authorization',this.authToken);
   
          return this.http.get('http://localhost:3000/api/delete',{headers:headers})
          .map(res=>res.json());


}

 storeUserData(token,user)
 {
   localStorage.setItem('id_token',token);
   localStorage.setItem('user', JSON.stringify(user));
   this.authToken=token;
   this.user=user; 

    }
  logout()
  {
    this.authToken= null;
    this.user= null;
    localStorage.clear();
  
  }
  loggedIn(){
    return tokenNotExpired('id_token');
  }

  loadToken(){
    const token=localStorage.getItem('id_token');
    const user=localStorage.getItem('user');
    this.authToken=token; 
    this.id=JSON.parse(user);
    
  }

}
