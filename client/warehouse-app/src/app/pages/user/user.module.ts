import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import { FormsModule }        from '@angular/forms';
import { NgaModule }          from '../../header/share.module';

import { UserComponent }      from './user.component';
import { Routing }            from './user.route';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    Routing
  ],
  declarations: [
    UserComponent
  ],
  providers: [

  ]
})
export class UserModule {}