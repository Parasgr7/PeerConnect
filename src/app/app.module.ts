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

@NgModule({
  declarations: [
  AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    NavbarComponent,
    HomeComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
      RouterModule.forRoot([
     {path:'',component:HomeComponent},
     {path:'login',component: LoginComponent},
      {path:'register',component: RegisterComponent},
      {path:'profile',component: ProfileComponent,canActivate: [AuthGuard]},
      {path:'dashboard',component: DashboardComponent,canActivate: [AuthGuard]}

   ])
  ],
  providers: [RegisterService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
