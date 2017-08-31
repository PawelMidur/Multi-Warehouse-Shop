import { NgModule, ModuleWithProviders }      from '@angular/core';
import { CommonModule }                       from '@angular/common';
import { ReactiveFormsModule, FormsModule }   from '@angular/forms';
import { RouterModule }                       from '@angular/router';

import { MaterialModule }                     from '@angular/material';
import { FlexLayoutModule }                   from '@angular/flex-layout';

import { PerfectScrollbarModule }             from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface }    from 'ngx-perfect-scrollbar';

import { AuthGuard } from "../auth/auth-guard";

import { CollapsedDirective } from './directive/collapsed.directive';

import { TopToolbarComponent } from "./top-toolbar/top-toolbar.component";
import { TopSearchComponent } from "./top-toolbar/top-search/top-search.component";
import { SidebarComponent } from './sidebar/sidebar.component';

const NGA_COMPONENTS = [
  TopToolbarComponent,
  TopSearchComponent,
  SidebarComponent
];

const NGA_DIRECTIVES = [
  CollapsedDirective,
];

const NGA_PIPES = [

];

const NGA_SERVICES = [
  AuthGuard
];

const NGA_VALIDATORS = [

];

@NgModule({
  declarations: [
    ...NGA_COMPONENTS,
    ...NGA_PIPES,
    ...NGA_DIRECTIVES,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    
    MaterialModule,
    FlexLayoutModule,
    PerfectScrollbarModule,
  ],
  exports: [
    MaterialModule,
    FlexLayoutModule,

    ...NGA_COMPONENTS,
    ...NGA_PIPES,
    ...NGA_DIRECTIVES,
    
  ]
})
export class NgaModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders> {
      ngModule: NgaModule,
      providers: [
        ...NGA_VALIDATORS,
        ...NGA_SERVICES
      ],
    };
  }
}