import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RoutingModule } from './routing.module';

import { SharedModule } from '../shared/shared.module';

import { RegisterFormComponent } from './pages/auth/register-form/register-form.component';
import { NotFoundComponent } from './pages/error/notfound/notfound.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [RegisterFormComponent, NotFoundComponent, LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    RoutingModule,
    SharedModule
  ], 
  exports: [
    RoutingModule,
    RouterModule
  ]
})

export class FeaturesModule { }