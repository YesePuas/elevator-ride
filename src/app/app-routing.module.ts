import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './module/auth/auth.component';
import { HomeComponent } from './layout/home/home.component';
import { SignInComponent } from './module/sign-in/sign-in.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'signIn',
    component: SignInComponent,
  },
  {
    path: 'client',
    loadChildren: () =>
      import('./module/client/client.module').then((i) => i.ClientModule),
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
