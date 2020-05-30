import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { MainComponent } from './main/main.component';
import { ViewOperatorListComponent } from './view-operator-list/view-operator-list.component';
import { AddOperatorComponent } from './add-operator/add-operator.component';
import { FormsModule } from '@angular/forms';
import { ViewMapComponent } from './view-map/view-map.component';
import { ViewFeeComponent } from './view-fee/view-fee.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ParkedVehiclesComponent } from './parked-vehicles/parked-vehicles.component';
import { VehicleArchiveComponent } from './vehicle-archive/vehicle-archive.component';
import { AddMapComponent } from './add-map/add-map.component';
import { AdminChangePasswordComponent } from './admin-change-password/admin-change-password.component';

@NgModule({
  declarations: [
    MainComponent,
    ViewOperatorListComponent,
    AddOperatorComponent,
    ViewMapComponent,
    ViewFeeComponent,
    ParkedVehiclesComponent,
    VehicleArchiveComponent,
    AddMapComponent,
    AdminChangePasswordComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    NgbModule
  ],
  exports: [AddOperatorComponent],
  bootstrap: [AddOperatorComponent]
})
export class AdminModule { }
