import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service.service';
import { Router } from '@angular/router';
import { SigninComServiceService } from 'src/app/services/signin-com-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-change-password',
  templateUrl: './admin-change-password.component.html',
  styleUrls: ['./admin-change-password.component.css']
})
export class AdminChangePasswordComponent implements OnInit {

  constructor(
    private usrService: UserServiceService,
    private signinCom: SigninComServiceService,
    private toast: ToastrService,
    private router: Router
  ) { }

  oldpswd: string
  newpswd: string
  rnewpswd: string

  admId

  ngOnInit() {
    this.signinCom.oprId$.subscribe(
      data => this.setAdmId(data))
  }

  setAdmId(obj) {
    this.admId = obj.id
  }

  updatePass() {

    let obj = {
      oldPass: this.oldpswd,
      newPass: this.newpswd,
      id: this.admId
    }
    var ret
    this.usrService.doUpdate(obj).subscribe(
      data => { ret = data },
      err => console.error(err),
      () => {
        if (ret != null) {
          if (ret == "updated") {
            this.router.navigateByUrl("/admin", { skipLocationChange: true }).then(() => {
              this.router.navigate(["/admin/changepassword"]);
              this.toast.success("Password successfully updated!")
              setTimeout(() => {
                let obj1 = {
                  id: this.admId,
                }
                this.signinCom.getOprId(obj1)
              }, 500)
            });
          }
          else {
            this.toast.error("Old Password is incorrect!")
          }
        }
      }
    )
  }
}
