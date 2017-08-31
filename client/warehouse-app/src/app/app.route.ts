import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
	{ path: 'login', redirectTo: 'login', pathMatch: 'full' },
	{ path: 'dashboard', redirectTo: 'dashboard', pathMatch: 'full' },

	{ path: '**', redirectTo: '/dashboard' },
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(routes);