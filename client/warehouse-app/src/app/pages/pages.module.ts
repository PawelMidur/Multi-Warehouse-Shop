import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import 'hammerjs';

import { Routing }        from './pages.route';
import { NgaModule }      from '../header/share.module';

import { PagesComponent } from './pages.component';

@NgModule({
	imports: [
		CommonModule,
		NgaModule,
		Routing
	],
	declarations: [ 
		PagesComponent
	],
	providers: [ ]
})

export class PagesModule{}