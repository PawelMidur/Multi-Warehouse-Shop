import { Routes, RouterModule }  from '@angular/router';

import { DashboardComponent }    from './dashboard.component';
import { ModuleWithProviders }   from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      
    ]
  }
];

export const Routing: ModuleWithProviders = RouterModule.forChild(routes);