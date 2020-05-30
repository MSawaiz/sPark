import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperatorRoutingModule } from './operator-routing.module';
import { CheckinComponent } from './checkin/checkin.component';
import { CheckoutComponent } from './checkout/checkout.component';
import {WebcamModule} from 'ngx-webcam';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material';

@NgModule({
  declarations: [CheckinComponent, CheckoutComponent],
  imports: [
    CommonModule,
    OperatorRoutingModule,
    WebcamModule,
    NgbModule,
    FormsModule,
    MatTableModule,
  ]
})
export class OperatorModule { }
