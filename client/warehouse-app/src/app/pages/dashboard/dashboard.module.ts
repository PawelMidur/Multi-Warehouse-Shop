import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import { FormsModule }        from '@angular/forms';
import { NgaModule }          from '../../header/share.module';

import { DashboardComponent } from './dashboard.component';
import { Routing }            from './dashboard.route';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    Routing
  ],
  declarations: [
    DashboardComponent
  ],
  providers: [

  ]
})
export class DashboardModule {}