import { Routes, RouterModule, CanActivate } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuardService as AuthService } from './services/auth-guard.service';


const appRoutes: Routes = [
    { path: 'login',
      loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule) },
      { path: 'register',
      loadChildren: () => import('./components/register/register.module').then(m => m.RegisterModule) },
      { path: 'feed',
      loadChildren: () => import('./components/feed/feed.module').then(m => m.FeedModule), canActivate: [AuthService] },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [],
})

export class AppRoutingModule { }
