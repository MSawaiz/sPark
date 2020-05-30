import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FeeServiceService } from 'src/app/services/fee-service.service';
import { NgbModalOptions, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-fee',
  templateUrl: './view-fee.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./view-fee.component.css']
})
export class ViewFeeComponent implements OnInit {
  modalOptions: NgbModalOptions;
  closeResult: string;

  fee

  dayname: String
  udayname: String
  day: [{
    name: String,
    peakStartTime: String,
    peakEndTime: String
  }]
  peakPrice: Number
  normalPrice: Number
  perPeakTime: Number
  perNormalTime: Number
  fine: Number

  constructor(
    private feeSrevice: FeeServiceService,
    private toast: ToastrService,
    private modalService: NgbModal
  ) {
    this.modalOptions = {
      windowClass: 'modal-frame'
    }
  }

  ngOnInit() {
    this.getFee()
  }

  getFee() {
    this.feeSrevice.doGet().subscribe(
      data => { this.fee = data },
      err => console.error(err))
  }

  edtfee(modal) {
    this.getFee()
    this.open(modal)
    this.udayname = null
    this.peakPrice = this.fee.Rate.peakPrice
    this.normalPrice = this.fee.Rate.normalPrice
    this.perPeakTime = this.fee.Rate.perPeakTime
    this.perNormalTime = this.fee.Rate.perNormalTime
    this.fine = this.fee.fine
    this.day = this.fee.day
  }

  updfee() {
    var ret;
    let obj = {
      day: this.day,
      Rate: {
        peakPrice: this.peakPrice,
        normalPrice: this.normalPrice,
        perPeakTime: this.perPeakTime,
        perNormalTime: this.perNormalTime
      },
      fine: this.fine
    }
    this.feeSrevice.doUpdate(obj).subscribe(
      data => { ret = data },
      err => console.error(err),
      () => this.toast.success("Fee successfully updated!")
    )
    this.getFee()
  }


  open(content) {
    this.modalService.open(content, this.modalOptions).result.then((result) => {
    });
  }
}