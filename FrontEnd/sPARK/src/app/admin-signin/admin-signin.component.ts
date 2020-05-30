import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service.service';
import { Router } from '@angular/router';
import { SigninComServiceService } from '../services/signin-com-service.service';
import { ToastrService } from 'ngx-toastr'

declare const doQuit: any

@Component({
  selector: 'app-admin-signin',
  templateUrl: './admin-signin.component.html',
  styleUrls: ['./admin-signin.component.css']
})
export class AdminSigninComponent implements OnInit {

  constructor(
    private usrService: UserServiceService,
    private router: Router,
    private signinCom: SigninComServiceService,
    private toast: ToastrService) { }

  username: string = 'admin'
  password

  ngOnInit() {
  }


  checkUser() {
    let usr = {
      username: this.username,
      password: this.password
    }
    var ret
    this.usrService.doPost(usr).subscribe(
      data => { ret = data },
      err => console.error(err),
      () => {
        if (ret != null) {
          this.toast.success('Login successful')
          setTimeout(() => {
            let obj1 = {
              id: ret._id,
            }
            this.signinCom.getOprId(obj1)
          }, 500)

          if (ret.firstTime)
            this.router.navigate(["/admin/addmap"])
          else
            this.router.navigate(["/admin"])

        }
        else
          this.toast.error('Incorrect password')
      }
    )
  }

  close() {
    doQuit()
  }
}