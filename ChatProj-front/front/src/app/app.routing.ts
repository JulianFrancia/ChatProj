import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


const appRoutes: Routes = [
    { path: 'login',
      loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule) },
      { path: 'register',
      loadChildren: () => import('./components/register/register.module').then(m => m.RegisterModule) },
      { path: 'feed',
      loadChildren: () => import('./components/feed/feed.module').then(m => m.FeedModule) },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      }
];

@NgModule({
  imports:[RouterModule.forRoot(appRoutes)],
  exports:[RouterModule],
  providers:[],
})

export class AppRoutingModule { }
