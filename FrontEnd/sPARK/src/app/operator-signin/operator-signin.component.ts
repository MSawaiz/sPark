import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service.service';
import { OperatorService } from 'src/app/services/operator-service.service';
import { SigninComServiceService } from 'src/app/services/signin-com-service.service';
import { ToastrService } from 'ngx-toastr'
import { Router } from '@angular/router';

declare const doQuit: any

@Component({
  selector: 'app-operator-signin',
  templateUrl: './operator-signin.component.html',
  styleUrls: ['./operator-signin.component.css']
})
export class OperatorSigninComponent implements OnInit {

  username: string
  password: string
  loggingActivity

  constructor(
    private usrService: UserServiceService,
    private oprService: OperatorService,
    private router: Router,
    private signinCom: SigninComServiceService,
    private toast: ToastrService) { }

  ngOnInit() { }

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
          this.checkDuty(ret._id)
        }
        else
        this.toast.error('Incorrect username or password')
      }
    )
  }

  checkDuty(oprID) {
    var ret
    this.oprService.doGetOpr(oprID).subscribe(
      data => { ret = data },
      err => console.error(err),
      () => {
        let post = ret.duty.dutyPost.substring(0, 2)
        this.loggingActivity = ret.loggingActivity
        if (post == "en") {
          this.router.navigate(["/opt/checkin"])
          this.addActivity(ret)
        } else if (post == "ex") {
          this.router.navigate(["/opt/checkout"])
          this.addActivity(ret)
        } else
        this.toast.error('Sign in failed')
      }
    )
  }

  addActivity(oprObj) {
    let datetime = new Date()
    let act = {
      signinTime: datetime.getDate().toString().padStart(2, "0") + "-" + (datetime.getMonth() + 1).toString().padStart(2, "0")
        + "-" + datetime.getFullYear() + " " + datetime.getHours().toString().padStart(2, "0") + ":" +
        datetime.getMinutes().toString().padStart(2, "0") + ":" + datetime.getSeconds().toString().padStart(2, "0"),
      dutyPost: oprObj.duty.dutyPost,
      signoutTime: null
    }
    this.loggingActivity.push(act)
    let obj = {
      id: oprObj._id,
      loggingActivity: this.loggingActivity
    }
    var ret
    this.oprService.doUpdateAct(obj).subscribe(
      data => { ret = data },
      err => console.error(err),
      () => {
        this.toast.success('Login successful')
      }
    )

    setTimeout(() => {
      let obj1 = {
        id: oprObj._id,
        signin: act.signinTime
      }
      this.signinCom.getOprId(obj1)
    }, 500)
  }

  close() {
    doQuit()
  }
}
