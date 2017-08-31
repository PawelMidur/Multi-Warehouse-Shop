import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders }  from '@angular/core';

import { AuthGuard } from "../auth/auth-guard";
import { PagesComponent } from './pages.component';

export const routes: Routes = [
	{
		path: 'dashboard',
		component: PagesComponent,
		canActivate: [ AuthGuard ],
		children: [
			{ path: '', loadChildren: 'app/pages/dashboard/dashboard.module#DashboardModule' }
		]
	},
	{
		path: 'user',
		component: PagesComponent,
		canActivate: [ AuthGuard ],
		children: [
			{ path: '', loadChildren: 'app/pages/user/user.module#UserModule' }
		]
	}
];

export const Routing: ModuleWithProviders = RouterModule.forChild(routes);