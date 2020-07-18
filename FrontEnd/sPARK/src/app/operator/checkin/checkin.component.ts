import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MapServiceService } from 'src/app/services/map-service.service';
import { VehicleProcessingServiceService } from 'src/app/services/vehicle-processsing-service.service';
import { ParkedVehiclesServiceService } from 'src/app/services/parked-vehicles-service.service';
import { OperatorService } from 'src/app/services/operator-service.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { WebcamImage, WebcamInitError } from 'ngx-webcam';
import { Router } from '@angular/router';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SigninComServiceService } from 'src/app/services/signin-com-service.service';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./checkin.component.css']
})
export class CheckinComponent implements OnInit {
  modalOptions: NgbModalOptions;


  public videoOptions: MediaTrackConstraints = {
    width: { ideal: 1024 },
    height: { ideal: 576 }
  };
  public errors: WebcamInitError[] = [];

  public webcamImage: WebcamImage = null;

  private trigger: Subject<void> = new Subject<void>();

  constructor(
    private modalService: NgbModal,
    private mapservice: MapServiceService,
    private vehService: VehicleProcessingServiceService,
    private parVehService: ParkedVehiclesServiceService,
    private oprService: OperatorService,
    private usrService: UserServiceService,
    private signinCom: SigninComServiceService,
    private toast: ToastrService,
    private router: Router) {
    this.modalOptions = {
      size: 'lg',
      windowClass: 'modal-frame'
    }

  }

  veh
  maps

  tokenNum: string
  checkInTime: string
  category: string
  floor: string
  lane: string

  signObj

  oldpswd: string
  newpswd: string
  rnewpswd: string

  parkingSpace: number
  remParkingSpace: number

  LPNs

  ngOnInit() {
    this.signinCom.oprId$.subscribe(
      data => this.setSignObj(data))
  }

  setSignObj(obj) {
    this.signObj = obj
  }

  public triggerSnapshot(): void {
    this.trigger.next();
    var img = { image: this.webcamImage.imageAsBase64 };
    this.getToken(img)
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

  getToken(image) {
    this.tokenNum = null
    this.checkInTime = null
    this.lane = null
    this.floor = null
    this.category = null
    this.vehService.doVehIdn(image).subscribe(
      data => { this.veh = data },
      err => console.error(err),
      () => {
        this.parVehService.doGetAllLPN().subscribe(
          data => { this.LPNs = data },
          err => console.error(err),
          () => {
            if (this.veh.objects[0] != undefined && this.veh.objects[0].vehicleAnnotation.licenseplate != undefined) {
              var datetime = new Date()
              this.tokenNum = this.veh.objects[0].vehicleAnnotation.licenseplate.attributes.system.string.name
              var newToken = true
              for (var LPN of this.LPNs) {
                if (LPN.LPN == this.tokenNum)
                  newToken = false
              }
              if (newToken) {
                this.checkInTime = datetime.getDate().toString().padStart(2, "0") + "-" + (datetime.getMonth() + 1).toString().padStart(2, "0")
                  + "-" + datetime.getFullYear() + " " + datetime.getHours().toString().padStart(2, "0") + ":" +
                  datetime.getMinutes().toString().padStart(2, "0") + ":" + datetime.getSeconds().toString().padStart(2, "0")
                var veh = {
                  make: this.veh.objects[0].vehicleAnnotation.attributes.system.make.name,
                  model: this.veh.objects[0].vehicleAnnotation.attributes.system.model.name
                }
                var ret
                this.vehService.doGetCat(veh).subscribe(
                  data => { ret = data },
                  err => console.error(err),
                  () => {
                    this.category = ret
                  })
                this.getLane()
              }
              else
              this.toast.warning('Vehicle already exists')              
            }
            else
              this.toast.error('Vehicle identification failed')

          })
      }
    );
  }

  getLane() {
    this.mapservice.doGet().subscribe(
      data => { this.maps = data },
      err => console.error(err),
      () => {
        var size: number
        var foundLoc: any
        if (this.category == "Small") {
          size = 1.6 + 0.8
        }
        else if (this.category == "Medium") {
          size = 1.8 + 0.9
        }
        else if (this.category == "Large") {
          size = 2 + 1
        }
        else if (this.category == "XLarge") {
          size = 2.2 + 1.1
        }
        else {
          this.category = "Unidentified"
          size = 2.2 + 1.1
        }
        let tree = new AvlTree()
        let root = null
        let obj: object
        this.parkingSpace = 0
        this.remParkingSpace = 0
        for (let i = 0; i < this.maps.floor.length; i++) {
          for (let j = 0; j < this.maps.floor[i].lane.length; j++) {
            this.parkingSpace += this.maps.floor[i].lane[j].size
            this.remParkingSpace += this.maps.floor[i].lane[j].remSize
            obj = { floor: i, lane: j, laneD: this.maps.floor[i].lane[j] }
            root = tree.insert(root, obj)
          }
        }
        foundLoc = tree.findMin(root, size)
        if (foundLoc != undefined) {
          this.floor = foundLoc.floor + 1
          this.lane = foundLoc.laneD.name

          this.maps.floor[foundLoc.floor].lane[foundLoc.lane].remSize -= size

          let vehicle = {
            tokenId: this.tokenNum,
            checkin: this.checkInTime,
            category: this.category,
            floor: this.floor,
            lane: this.lane
          }
          var ret
          this.parVehService.doPost(vehicle).subscribe(
            data => { ret = data },
            err => console.error(err),
            () => {
              if (ret == "OK") {
                this.mapservice.doUpdate(this.maps).subscribe(
                  data => { ret = data },
                  err => console.error(err),
                  () => {
                    this.toast.success('Vehicle check in successful!')
                    if (this.remParkingSpace < (this.parkingSpace * 0.15))
                      this.toast.warning("Low parking space")
                  }
                )
              }
            }
          )
        }
        else
          this.toast.info("Space full for " + this.category + " vehicles")
      }
    )
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
      err => console.error(err)
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

  open(content) {
    this.modalService.open(content, this.modalOptions).result.then((result) => {
    });
  }
}

class treeNode {
  val: number
  height: number
  left: number
  right: number

  constructor(val: number) {
    this.val = val
    this.height = 1
    this.left = null
    this.right = null
  }
}

class AvlTree {
  node
  balance: number
  insert(root, key) {

    if (root == null) {
      this.node = new treeNode(key)
      return this.node
    }
    else if (key < root.val.laneD.remSize) {
      root.left = this.insert(root.left, key)
    }
    else
      root.right = this.insert(root.right, key)

    root.height = 1 + Math.max(this.getHeight(root.left),
      this.getHeight(root.right))

    this.balance = this.getBalance(root)

    if (this.balance > 1 && key < root.left.val.laneD.remSize)
      return this.rightRotate(root)

    if (this.balance < -1 && key > root.right.val.laneD.remSize)
      return this.leftRotate(root)

    if (this.balance > 1 && key > root.left.val.laneD.remSize) {
      root.left = this.leftRotate(root.left)
      return this.rightRotate(root)
    }

    if (this.balance < -1 && key < root.right.val.laneD.remSize) {
      root.right = this.rightRotate(root.right)
      return this.leftRotate(root)
    }
    return root
  }

  leftRotate(z) {
    var y = z.right
    var T2 = y.left
    y.left = z
    z.right = T2

    z.height = 1 + Math.max(this.getHeight(z.left),
      this.getHeight(z.right))
    y.height = 1 + Math.max(this.getHeight(y.left),
      this.getHeight(y.right))

    return y
  }

  rightRotate(z) {
    var y = z.left
    var T3 = y.right

    y.right = z
    z.left = T3

    z.height = 1 + Math.max(this.getHeight(z.left),
      this.getHeight(z.right))
    y.height = 1 + Math.max(this.getHeight(y.left),
      this.getHeight(y.right))

    return y
  }

  getHeight(root): number {
    if (root == null)
      return 0
    return root.height
  }

  getBalance(root): number {
    if (root == null)
      return 0
    return this.getHeight(root.left) - this.getHeight(root.right)
  }

  findMin(root, size) {

    while (root != null) {

      if (root.left == null) {
        if (size <= root.val.laneD.remSize) {
          return root.val
        }
        root = root.right
      }
      else {
        var pre = root.left
        while (pre.right != null && pre.right != root)
          pre = pre.right

        if (pre.right == null) {
          pre.right = root
          root = root.left
        }
        else {
          pre.right = null
          if (size <= root.val.laneD.remSize) {
            return root.val
          }
          root = root.right
        }
      }
    }
  }
}