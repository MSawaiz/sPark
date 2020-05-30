import { Component } from '@angular/core';
import { SigninComServiceService } from './services/signin-com-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[SigninComServiceService],
})
export class AppComponent {
  title = 'sPARK';
}
