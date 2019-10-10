import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


const appRoutes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'feed', loadChildren:'./components/feed/feed.module#FeedModule'},
  {path:'login',loadChildren:'./components/login/login.module#LoginModule'},
  {path:'register',loadChildren:'./components/register/register.module#RegisterModule'}
];

@NgModule({
  imports:[RouterModule.forRoot(appRoutes)],
  exports:[RouterModule],
  providers:[],
})

export class AppRoutingModule { }
