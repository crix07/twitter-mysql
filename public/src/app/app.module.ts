import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { RegisterComponent } from './components/register/register.component';
import { UserComponent } from './components/user/user.component';
import { UserService } from './services/user.service';
import { PublicationsService } from './services/publications.service';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';
import { NopagefoundComponent } from './components/nopagefound/nopagefound.component';
import { APP_ROUTES } from './app.routes';

import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { VerifyComponent } from './components/verify/verify.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    RegisterComponent,
    UserComponent,
    HomeComponent,
    NopagefoundComponent,
    VerifyComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    APP_ROUTES

  ],
  providers: [
    UserService,
    PublicationsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
