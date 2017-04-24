import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import{BackendService} from'./backend.service';
import {RouterModule,Routes} from '@angular/router';
import {RegisterService} from './register/register.service';

import{EqualValidator} from './custom-validator';

import {LoginService} from './login/login.service';

import {HomeService} from './home/home.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {AuthGuard} from './guards/auth.guard';
import { ConnectionComponent } from './connection/connection.component';
import { FeedComponent } from './feed/feed.component';
import { FriendComponent } from './friend/friend.component';
import { SettingComponent } from './setting/setting.component';
import {FriendService} from './feed/friend.service';
import {SettingService} from './setting/setting.service';

 
import { AngularFireModule } from 'angularfire2';
import { IndividualComponent } from './individual/individual.component';
import { CompanyComponent } from './company/company.component';
import { CompleteComponent } from './complete/complete.component'; 			
 
export const firebaseConfig = {   
  apiKey: "AIzaSyC7_hhXPUQ9sRcD32WLhQYdTPniv1U9E1o",
    authDomain: "peerconnect-bc03b.firebaseapp.com",
    databaseURL: "https://peerconnect-bc03b.firebaseio.com",
    projectId: "peerconnect-bc03b",
    storageBucket: "peerconnect-bc03b.appspot.com",
    messagingSenderId: "513065070002"

};
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    NavbarComponent,
    HomeComponent,
    DashboardComponent,
    ConnectionComponent,
    FriendComponent,
    SettingComponent,
    EqualValidator,
    FeedComponent,
    IndividualComponent,
    CompanyComponent,
    CompleteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
      RouterModule.forRoot([
     {path:'',component:HomeComponent},
     {path:'login',component: LoginComponent},
      {path:'register',component: RegisterComponent,
     children:[  {path:'',component:IndividualComponent},
                    {path:'individual',component:IndividualComponent},
                    {path:'organisation',component:CompanyComponent},
                    
        
                ]},
      {path:'dashboard',component: DashboardComponent,canActivate: [AuthGuard],
        children:[  {path:'',component:FeedComponent},
                    {path:'feed',component:FeedComponent},
                    {path:'profile',component:ProfileComponent,
                           children:[  
                             {path:'complete',component:CompleteComponent},
                                    ]},
                    {path:'connection',component:ConnectionComponent},
                    {path:'friends',component:FriendComponent},
                    {path:'settings',component:SettingComponent}
                    
        
                ]

      }
   ])
  ],
  providers: [RegisterService,AuthGuard,FriendService,SettingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
