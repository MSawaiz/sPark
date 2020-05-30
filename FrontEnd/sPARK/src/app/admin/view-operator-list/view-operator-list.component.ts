import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { OperatorService } from 'src/app/services/operator-service.service';
import { MapServiceService } from 'src/app/services/map-service.service'
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

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
    this.getOpr()
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
    this.getOpr();
  }

  showAct(id, modal) {
    this.open(modal)
    for (let opr of this.operators.opr) {
      if (opr._id == id) {
        this.loggingAct = opr.loggingActivity.reverse()
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

  open(content) {
    this.modalService.open(content, this.modalOptions).result.then((result) => {
    });
  }
}