import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { OperatorService } from 'src/app/services/operator-service.service';
import { MapServiceService } from 'src/app/services/map-service.service'
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { summaryFileName } from '@angular/compiler/src/aot/util';
import { SafeMethodCall } from '@angular/compiler';

@Component({
  selector: 'app-view-operator-list',
  templateUrl: './view-operator-list.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./view-operator-list.component.css']
})
export class ViewOperatorListComponent implements OnInit {

  modalOptions: NgbModalOptions;

  operators
  posts

  opid: String
  fname: String
  lname: String
  uname: String
  pass: String
  dst: String
  det: String
  dp: String
  img: String
  imgName: string
  loggingAct
  filterAct

  cidatef: String = null
  citimef: String = null
  cidatet: String = null
  citimet: String = null
  codatef: String = null
  cotimef: String = null
  codatet: String = null
  cotimet: String = null

  constructor(
    private oprService: OperatorService,
    private mapservice: MapServiceService,
    private toast: ToastrService,
    private modalService: NgbModal) {
    this.modalOptions = {
      size: 'lg',
      windowClass: 'modal-frame'
    }
  }

  ngOnInit() {
    this.getOpr()
    this.getMap()
  }

  getOpr() {
    this.oprService.doGet().subscribe(
      data => { this.operators = data },
      err => console.error(err))
  }

  getMap() {
    this.mapservice.doGet().subscribe(
      data => { this.posts = data },
      err => console.error(err))
  }

  delOpr(id) {
    var ret
    this.oprService.doDelete(id).subscribe(
      data => { ret = data },
      err => console.error(err),
      () => this.toast.success("Operator deleted successfully!")
    )
    setTimeout(() => this.getOpr(), 500)
  }

  upload(event) {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      this.img = reader.result.toString()
    }
  }

  updOpr() {
    var ret;

    let opr = {
      id: this.opid,
      fname: this.fname,
      lname: this.lname,
      uname: this.uname,
      pass: this.pass,
      dst: this.dst,
      det: this.det,
      dp: this.dp,
      img: this.img,
      imgName: this.imgName
    }
    this.oprService.doUpdate(opr).subscribe(
      data => { ret = data },
      err => console.error(err),
      () => this.toast.success("Operator updated successfully!")
    )
    setTimeout(() => this.getOpr(), 500)
  }

  showAct(id, modal) {
    this.open(modal)
    for (let opr of this.operators.opr) {
      if (opr._id == id) {
        this.loggingAct = opr.loggingActivity.reverse()
        this.filterAct = opr.loggingActivity.reverse()
        this.opid = id
      }
    }
  }

  showOpr(id, modal) {
    this.open(modal)
    for (let opr of this.operators.opr) {
      if (opr._id == id) {
        this.opid = opr._id, this.fname = opr.firstName, this.lname = opr.lastName,
          this.uname = opr.username, this.pass = opr.password, this.dst = opr.duty.dutyStartTime,
          this.det = opr.duty.dutyEndTime, this.dp = opr.duty.dutyPost, this.img = opr.image,
          this.imgName = opr.imgName
      }
    }
    for (let opr of this.operators.usr) {
      if (opr._id == id) {
        this.uname = opr.username, this.pass = opr.password
      }
    }
  }

  edtOpr(id, modal) {
    this.showOpr(id, modal)
    this.pass = null
  }

  refresh(id) {
    console.log(id)
    this.getOpr();
    for (let opr of this.operators.opr) {
      if (opr._id == id) {
        this.loggingAct = opr.loggingActivity.reverse()
        this.opid = id
      }
    }
  }

  search() {

    var logAct = this.filterAct
    this.loggingAct = []
    var signinStart = null
    var signinEnd = null
    var signoutStart = null
    var signoutEnd = null

    if (this.cidatef == '') this.cidatef = null
    if (this.citimef == '') this.citimef = null
    if (this.codatef == '') this.codatef = null
    if (this.cotimef == '') this.cotimef = null
    if (this.cidatet == '') this.cidatet = null
    if (this.citimet == '') this.citimet = null
    if (this.codatet == '') this.codatet = null
    if (this.cotimet == '') this.cotimet = null


    if (this.cidatef != null && this.citimef != null)
      signinStart = new Date(this.cidatef + "T" + this.citimef)
    else if (this.cidatef != null && this.citimef == null)
      signinStart = new Date(this.cidatef + "T00:00:00")
    else
      signinStart = new Date("2018-01-01T00:00:00")

    if (this.cidatet != null && this.citimet != null)
      signinEnd = new Date(this.cidatet + "T" + this.citimet)
    else if (this.cidatet != null && this.citimet == null)
      signinEnd = new Date(this.cidatet + "T23:59:59")
    else
      signinEnd = new Date()

    if (this.codatef != null && this.cotimef != null)
      signoutStart = new Date(this.codatef + "T" + this.cotimef)
    else if (this.codatef != null && this.cotimef == null)
      signoutStart = new Date(this.codatef + "T00:00:00")
    else
      signoutStart = new Date("2018-01-01T00:00:00")

    if (this.codatet != null && this.cotimet != null)
      signoutEnd = new Date(this.codatet + "T" + this.cotimet)
    else if (this.codatet != null && this.cotimet == null)
      signoutEnd = new Date(this.codatet + "T23:59:59")
    else
      signoutEnd = new Date()

    for (var act of logAct) {

      if (act.signoutTime != null) {
        var log = act.signinTime.split(" ")
        var logDate = log[0].split("-")
        var sint = new Date(logDate[2] + "-" + logDate[1] + "-" + logDate[0] + "T" + log[1])

        log = act.signoutTime.split(" ")
        logDate = log[0].split("-")
        var soutt = new Date(logDate[2] + "-" + logDate[1] + "-" + logDate[0] + "T" + log[1])

        if (this.cidatef != null && this.cidatet != null && this.codatef != null && this.codatet != null) {
          if ((sint.getTime() >= signinStart.getTime() && sint.getTime() <= signinEnd.getTime())
            && (soutt.getTime() >= signoutStart.getTime() && soutt.getTime() <= signoutEnd.getTime())) {
            this.loggingAct.push(act)
            console.log("1")
          }
        }
        else if (this.codatet == null && this.cidatef != null && this.cidatet != null && this.codatef != null) {
          if (sint.getTime() >= signinStart.getTime() && sint.getTime() <= signinEnd.getTime()
            && soutt.getTime() >= signoutStart.getTime()) {
            this.loggingAct.push(act)
            console.log("2")
          }
        }
        else if (this.cidatef != null && this.cidatet != null && this.codatef == null && this.codatet != null) {
          if (sint.getTime() >= signinStart.getTime() && sint.getTime() <= signinEnd.getTime()
            && soutt.getTime() <= signoutEnd.getTime()) {
            this.loggingAct.push(act)
            console.log("3")
          }
        }
        else if (this.cidatef != null && this.cidatet == null && this.codatef != null && this.codatet != null) {
          if (sint.getTime() >= signinStart.getTime() && soutt.getTime() >= signoutStart.getTime()
            && soutt.getTime() <= signoutEnd.getTime()) {
            this.loggingAct.push(act)
            console.log("4")
          }
        }
        else if (this.cidatef == null && this.cidatet != null && this.codatef != null && this.codatet != null) {
          if (sint.getTime() <= signinEnd.getTime() && soutt.getTime() >= signoutStart.getTime()
            && soutt.getTime() <= signoutEnd.getTime()) {
            this.loggingAct.push(act)
            console.log("5")
          }
        }
        else if (this.cidatef != null && this.cidatet != null && this.codatef == null && this.codatet == null) {
          if (sint.getTime() >= signinStart.getTime() && sint.getTime() <= signinEnd.getTime()) {
            this.loggingAct.push(act)
            console.log("6")
          }
        }
        else if (this.cidatef == null && this.cidatet == null && this.codatef != null && this.codatet != null) {
          if (soutt.getTime() >= signoutStart.getTime() && soutt.getTime() <= signoutEnd.getTime()) {
            this.loggingAct.push(act)
            console.log("7")
          }
        }
        else if (this.cidatef != null && this.cidatet == null && this.codatef != null && this.codatet == null) {
          if (sint.getTime() >= signinStart.getTime() && sint.getTime() >= signoutStart.getTime()) {
            this.loggingAct.push(act)
            console.log("8")
          }
        }
        else if (this.cidatef == null && this.cidatet != null && this.codatef == null && this.codatet != null) {
          if (sint.getTime() <= signinEnd.getTime() && soutt.getTime() <= signoutEnd.getTime()) {
            this.loggingAct.push(act)
            console.log("9")
          }
        }
        else if (this.cidatef != null && this.cidatet == null && this.codatef == null && this.codatet != null) {
          if (sint.getTime() >= signinStart.getTime() && soutt.getTime() <= signoutEnd.getTime()) {
            this.loggingAct.push(act)
            console.log("10")
          }
        }
        else if (this.cidatef == null && this.cidatet != null && this.codatef != null && this.codatet == null) {
          if (soutt.getTime() <= signinEnd.getTime() && soutt.getTime() >= signoutStart.getTime()) {
            this.loggingAct.push(act)
            console.log("11")
          }
        }
        else if (this.cidatef != null && this.cidatet == null && this.codatef == null && this.codatet == null) {
          if (sint.getTime() >= signinStart.getTime()) {
            this.loggingAct.push(act)
            console.log("12")
          }
        }
        else if (this.cidatef == null && this.cidatet != null && this.codatef == null && this.codatet == null) {
          if (sint.getTime() <= signinEnd.getTime()) {
            this.loggingAct.push(act)
            console.log("13")
          }
        }
        else if (this.cidatef == null && this.cidatet == null && this.codatef != null && this.codatet == null) {
          if (soutt.getTime() >= signoutStart.getTime()) {
            this.loggingAct.push(act)
            console.log("14")
          }
        }
        else if (this.cidatef == null && this.cidatet == null && this.codatef == null && this.codatet != null) {
          if (soutt.getTime() <= signoutEnd.getTime()) {
            this.loggingAct.push(act)
            console.log("15")
          }
        }
      }
    }
    if (this.cidatef == null && this.citimef == null && this.codatef == null && this.cotimef == null
      && this.cidatet == null && this.citimet == null && this.codatet == null && this.cotimet == null)
      this.loggingAct = this.filterAct
    else {
      this.cidatef = null
      this.citimef = null
      this.codatef = null
      this.cotimef = null
      this.cidatet = null
      this.citimet = null
      this.codatet = null
      this.cotimet = null
    }
  }

  open(content) {
    this.modalService.open(content, this.modalOptions).result.then((result) => {
    });
  }
}