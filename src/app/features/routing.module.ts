import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './pages/error/notfound/notfound.component';

const routes: Routes = [
  { path:'profile/:id', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule) },
  { path:'protected', loadChildren: () => import('./protected/protected.module').then(m => m.ProtectedModule)},
  { path:'login', component: LoginComponent },
  { path:'register', component: RegisterComponent },
  { path:'error', component: NotFoundComponent },
  { path:'', redirectTo: 'login', pathMatch: "full" },
  { path:'**', redirectTo:'error' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class RoutingModule { }