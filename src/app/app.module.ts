import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import{BackendService} from'./backend.service';
import {RouterModule,Routes} from '@angular/router';
import {RegisterService} from './register/register.service';

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
    FeedComponent,
    FriendComponent,
    SettingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
      RouterModule.forRoot([
     {path:'',component:HomeComponent},
     {path:'login',component: LoginComponent},
      {path:'register',component: RegisterComponent},
      {path:'dashboard',component: DashboardComponent,canActivate: [AuthGuard],
        children:[  {path:'feed',component:FeedComponent},
                    {path:'profile',component:ProfileComponent},
                    {path:'connection',component:ConnectionComponent},
                    {path:'friends',component:FriendComponent},
                    {path:'settings',component:SettingComponent}
                    
        
                ]

      }
   ])
  ],
  providers: [RegisterService,AuthGuard,FriendService],
  bootstrap: [AppComponent]
})
export class AppModule { }
