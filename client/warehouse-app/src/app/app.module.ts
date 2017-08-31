import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule, BaseRequestOptions, Http } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Routing...
import { Routing } from './app.route';

// AppComponent is our top level component
import { AppComponent } from './app.component';
import { NgaModule } from './header/share.module';

import { PagesModule } from "./pages/pages.module";
import { LoginModule } from "./auth/login.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    NgaModule.forRoot(),
    PagesModule,
    LoginModule,
    Routing,
    BrowserAnimationsModule,
  ],
  providers: [ ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
