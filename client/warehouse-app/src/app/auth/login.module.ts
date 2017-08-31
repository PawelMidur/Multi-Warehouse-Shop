import { NgModule }             from '@angular/core';
import { CommonModule }         from '@angular/common';
import { FormsModule, 
         ReactiveFormsModule 
        }                       from '@angular/forms';
import { NgaModule }            from '../header/share.module';

import { LoginComponent } from './login/login.component';
import { LoginViewComponent } from './login/login-view.component';
import { Routing }        from './login.route';

import { AuthService } from "./auth.service";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    Routing
  ],
  declarations: [
    LoginComponent,
    LoginViewComponent
  ],
  providers: [
    AuthService
  ],
})
export class LoginModule {}