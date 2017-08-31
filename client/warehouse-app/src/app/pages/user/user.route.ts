import { Routes, RouterModule }  from '@angular/router';

import { UserComponent }    from './user.component';
import { ModuleWithProviders }   from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      
    ]
  }
];

export const Routing: ModuleWithProviders = RouterModule.forChild(routes);