import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ViewOperatorListComponent } from './view-operator-list/view-operator-list.component';
import { AddOperatorComponent } from './add-operator/add-operator.component';
import { ViewFeeComponent } from './view-fee/view-fee.component';
import { ParkedVehiclesComponent } from './parked-vehicles/parked-vehicles.component';
import { VehicleArchiveComponent } from './vehicle-archive/vehicle-archive.component';
import { ViewMapComponent } from './view-map/view-map.component';
import { AddMapComponent } from './add-map/add-map.component';
import { AdminChangePasswordComponent } from './admin-change-password/admin-change-password.component';

const routes: Routes = [{
  path: '',
  component: MainComponent,
  children: [
    { path: 'voptrlist', component: ViewOperatorListComponent },
    { path: 'addopr', component: AddOperatorComponent },
    { path: 'viewfee', component: ViewFeeComponent },
    { path: 'parkveh', component: ParkedVehiclesComponent },
    { path: 'veharch', component: VehicleArchiveComponent },
    { path: 'map', component: ViewMapComponent },
    { path: 'changepassword', component: AdminChangePasswordComponent}
  ]
},
{ path: "addmap", component: AddMapComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
