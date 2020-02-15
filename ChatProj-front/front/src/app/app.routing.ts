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
      { path: 'forgot-password',
      loadChildren: () => import('./components/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule) },
      { path: 'resetpwd',
      loadChildren: () => import('./components/reset-pwd/reset-pwd.module').then(m => m.ResetPwdModule) },
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
