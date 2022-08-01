import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { SharedModule } from 'src/app/shared/shared.module';

import { ProfilesComponent } from './components/users/profiles.component';

const routes: Routes = [
  {
    path: '', component: ProfilesComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'ROLE_ADMIN'
    }
  }
];

@NgModule({
  declarations: [ProfilesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ProtectedModule { }
