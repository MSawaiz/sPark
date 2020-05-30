import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VehicleProcessingServiceService } from 'src/app/services/vehicle-processsing-service.service';
import { ParkedVehiclesServiceService } from 'src/app/services/parked-vehicles-service.service';
import { VehicleArchiveServiceService } from 'src/app/services/vehicle-archive-service.service';
import { FeeServiceService } from 'src/app/services/fee-service.service';
import { MapServiceService } from 'src/app/services/map-service.service';
import { OperatorService } from 'src/app/services/operator-service.service';
import { SigninComServiceService } from 'src/app/services/signin-com-service.service';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { WebcamImage, WebcamInitError } from 'ngx-webcam';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';
import { ToastrService } from 'ngx-toastr'
import { MatTableDataSource } from '@angular/material/table';

export interface Vehicles {
  LPN: string;
}


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  modalOptions: NgbModalOptions;

  public videoOptions: MediaTrackConstraints = {
    width: { ideal: 1024 },
    height: { ideal: 576 }
  };
  public errors: WebcamInitError[] = [];

  public webcamImage: WebcamImage = null;

  private trigger: Subject<void> = new Subject<void>();

  constructor(private modalService: NgbModal,
    private vehService: VehicleProcessingServiceService,
    private parVehService: ParkedVehiclesServiceService,
    private archVehService: VehicleArchiveServiceService,
    private feeSrevice: FeeServiceService,
    private mapService: MapServiceService,
    private oprService: OperatorService,
    private usrService: UserServiceService,
    private signinCom: SigninComServiceService,
    private router: Router,
    private toast: ToastrService) {

    this.modalOptions = {
      size: 'lg',
      windowClass: 'modal-frame'
    }
  }

  veh
  maps
  fee

  tokenNum: string
  checkInTime
  checkOutTime
  category: string
  floor: string
  lane: string
  fine: number
  bill: number
  remBal: number
  recBal: number
  day: number

  signObj

  oldpswd: string
  newpswd: string
  rnewpswd: string

  ngOnInit() {
    this.signinCom.oprId$.subscribe(
      data => this.setSignObj(data))
    this.getFee()
    this.getAllLPN()
  }

  setSignObj(obj) {
    this.signObj = obj
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  getFee() {
    this.feeSrevice.doGet().subscribe(
      data => { this.fee = data },
      err => console.error(err))
  }

  proceedCk(modal) {

    //this needs to be checked after bilal validation
    if (this.tokenNum != undefined && this.tokenNum != '' && this.tokenNum != null)
      this.getVeh(modal)
    else {
      this.trigger.next();
      var img = { image: this.webcamImage.imageAsBase64 };
      this.getToken(img, modal)
    }
  }

  getToken(image, modal) {
    this.vehService.doLPNIdn(image).subscribe(
      data => { this.veh = data },
      err => console.error(err),
      () => {
        if (this.veh.objects[0] != undefined) {
          console.log(this.veh)
          this.tokenNum = this.veh.objects[0].licenseplateAnnotation.attributes.system.string.name
          console.log(this.tokenNum)
          this.getVeh(modal)
        }
        else {
          this.toast.error('Vehicle identification failed')
        }
      }
    );
  }

  getVeh(modal) {
    let obj = JSON.stringify({
      LPN: this.tokenNum.toUpperCase(),
    })
    this.parVehService.doGet(obj).subscribe(
      data => {
        this.veh = data
      },
      err => console.error(err),
      () => {
        if (this.veh[0] != undefined) {
          var datetime = new Date()
          this.tokenNum = this.veh[0].vehicle.licensePlateNumber
          this.category = this.veh[0].vehicle.category
          this.checkInTime = this.veh[0].checkinTime
          this.checkOutTime = datetime.getDate().toString().padStart(2, "0") + "-" + (datetime.getMonth() + 1).toString().padStart(2, "0")
            + "-" + datetime.getFullYear() + " " + datetime.getHours().toString().padStart(2, "0") + ":" +
            datetime.getMinutes().toString().padStart(2, "0") + ":" + datetime.getSeconds().toString().padStart(2, "0")
          this.day = datetime.getDay()
          this.floor = this.veh[0].location.floor
          this.lane = this.veh[0].location.lane
          this.fine = this.veh[0].fine

          this.calculateBill()
          this.open(modal)
        }
        else
          this.toast.error('Vehicle identification failed')
      })
  }

  calculateBill() {
    var date = new Date()

    var peakPrice = this.fee.Rate.peakPrice
    var peakPriceTime = this.fee.Rate.perPeakTime
    var normalPrice = this.fee.Rate.normalPrice
    var normalPriceTime = this.fee.Rate.perNormalTime
    var peakStartTime = date.getFullYear() + "-" + date.getMonth().toString().padStart(2, "0")
      + "-" + date.getDate().toString().padStart(2, "0") + "T" + this.fee.day[this.day].peakStartTime + ":00"
    var peakEndTime = date.getFullYear() + "-" + date.getMonth().toString().padStart(2, "0")
      + "-" + date.getDate().toString().padStart(2, "0") + "T" + this.fee.day[this.day].peakEndTime + ":00"

    var cindate = this.checkInTime.split(" ")[0]
    var cintime = this.checkInTime.split(" ")[1]
    var coutdate = this.checkOutTime.split(" ")[0]
    var couttime = this.checkOutTime.split(" ")[1]
    var cinhr = cintime.split(":")[0]
    var cinmin = cintime.split(":")[1]
    var cinsec = cintime.split(":")[2]
    var ciny = cindate.split("-")[2]
    var cinm = cindate.split("-")[1]
    var cind = cindate.split("-")[0]

    var cint = ciny + "-" + cinm + "-" + cind + "T" + cinhr + ":" + cinmin + ":" + cinsec

    var couthr = (couttime.split(":")[0])
    var coutmin = (couttime.split(":")[1])
    var coutsec = (couttime.split(":")[2])
    var couty = (coutdate.split("-")[2])
    var coutm = (coutdate.split("-")[1])
    var coutd = (coutdate.split("-")[0])

    var cout = couty + "-" + coutm + "-" + coutd + "T" + couthr + ":" + coutmin + ":" + coutsec

    var cintt = new Date(cint)
    var coutt = new Date(cout)
    var peakStart = new Date(peakStartTime)
    var peakEnd = new Date(peakEndTime)

    if (cintime >= peakStartTime && couttime <= peakEndTime) {
      this.bill = Math.floor(((Number(coutt) - Number(cintt)) / 60000) * peakPrice / peakPriceTime + this.fine)
    }
    else if ((cintt < peakStart) && (coutt >= peakStart && coutt <= peakEnd)) {
      this.bill = Math.floor(((Number(peakStart) - Number(cintt)) / 60000 * normalPrice / normalPriceTime)
        + ((Number(coutt) - Number(peakStart)) / 60000 * peakPrice / peakPriceTime) + this.fine)
    }
    else if ((coutt < peakEnd) && (cintt >= peakStart && cintt <= peakEnd)) {
      this.bill = Math.floor(((Number(coutt) - Number(peakEnd)) / 60000 * normalPrice / normalPriceTime)
        + ((Number(peakEnd) - Number(cintt)) / 60000 * peakPrice / peakPriceTime) + this.fine)
    }
    else if (cintt < peakStart && coutt > peakEnd) {
      this.bill = Math.floor(((Number(peakStart) - Number(cintt)) / 60000 * normalPrice / normalPriceTime)
        + ((Number(coutt) - Number(peakEnd)) / 60000 * normalPrice / normalPriceTime)
        + ((Number(peakEnd) - Number(peakStart)) / 60000 * peakPrice / peakPriceTime) + this.fine)
    }
    else {
      this.bill = Math.floor((Number(coutt) - Number(cintt)) / 60000 * normalPrice / normalPriceTime + this.fine)
    }
    this.recBal = this.bill
    this.remBal = 0
  }

  checkoutVeh() {
    let vehicle = {
      LPN: this.tokenNum,
      checkout: this.checkOutTime,
      fee: this.bill
    }
    var sucs
    this.archVehService.doPost(vehicle).subscribe(
      data => { sucs = data },
      err => console.error(err),
      () => {
        this.tokenNum = null
        this.updateMap(sucs)
      }
    )
  }

  updateMap(sucs) {
    this.mapService.doGet().subscribe(
      data => { this.maps = data },
      err => console.error(err),
      () => {
        console.log("1")
        var size: number

        if (this.category == "Small") {
          size = 1.6 + 0.8
        }
        else if (this.category == "Medium") {
          size = 1.8 + 0.9
        }
        else if (this.category == "Large") {
          size = 2 + 1
        }
        else {
          size = 2.2 + 1.1
        }

        this.maps.floor[Number(this.floor) - 1].lane[this.maps.floor[Number(this.floor) - 1].lane.findIndex(x => x.name == this.lane)].remSize += size

        var ret
        this.mapService.doUpdate(this.maps).subscribe(
          data => { ret = data },
          err => console.error(err),
          () => {
            this.toast.success('Vehicle checkout successful!')
          }
        )

      }
    )
  }

  remainBal() {
    this.remBal = this.recBal - this.bill
  }

  open(content) {
    this.modalService.open(content, this.modalOptions).result.then((result) => {
    });
  }

  logout() {

    var ret
    this.oprService.doGetOpr(this.signObj.id).subscribe(
      data => { ret = data },
      err => console.error(err),
      () => {
        this.updateOprAct(ret.loggingActivity)
      }
    )

    this.router.navigate(["/optsignin"])
    this.toast.success("Sign out successful!")

  }

  updateOprAct(logAct) {

    let datetime = new Date()
    let signoutTime = datetime.getDate().toString().padStart(2, "0") + "-" + (datetime.getMonth() + 1).toString().padStart(2, "0")
      + "-" + datetime.getFullYear() + " " + datetime.getHours().toString().padStart(2, "0") + ":" +
      datetime.getMinutes().toString().padStart(2, "0") + ":" + datetime.getSeconds().toString().padStart(2, "0")

    logAct[logAct.length - 1].signoutTime = signoutTime

    let obj = {
      loggingActivity: logAct,
      id: this.signObj.id
    }

    var ret
    this.oprService.doUpdateAct(obj).subscribe(
      data => { ret = data },
      err => console.error(err),
    )
  }

  updatePass() {

    let obj = {
      oldPass: this.oldpswd,
      newPass: this.newpswd,
      id: this.signObj.id
    }
    var ret
    this.usrService.doUpdate(obj).subscribe(
      data => { ret = data },
      err => console.error(err),
      () => {
        if (ret != null) {
          this.toast.info(ret)
        }
      }
    )
  }

  allLPN: Vehicles[]
  displayedColumns: string[] = ['LPN'];
  dataSource;
  

  getAllLPN() {
    this.parVehService.doGetAllLPN().subscribe(
      data => { this.allLPN = data },
      err => console.error(err),
      () => {
        console.log(this.allLPN);
        this.dataSource = new MatTableDataSource(this.allLPN);
      })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}