import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminSigninComponent } from './admin-signin/admin-signin.component';
import { OperatorSigninComponent } from './operator-signin/operator-signin.component';


const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule)
  },
  {
    path: 'opt',
    loadChildren: () => import('./operator/operator.module').then(mod => mod.OperatorModule)
  },
  {
    path:'', component:HomeComponent
  },
  {
    path:'adminsignin', component:AdminSigninComponent
  },
  {
    path:'optsignin', component:OperatorSigninComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
