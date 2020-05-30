import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MapServiceService } from 'src/app/services/map-service.service'
import { FeeServiceService } from 'src/app/services/fee-service.service'
import { VehicleProcessingServiceService } from 'src/app/services/vehicle-processsing-service.service'
import { UserServiceService } from 'src/app/services/user-service.service'
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SigninComServiceService } from 'src/app/services/signin-com-service.service';


@Component({
  selector: 'app-add-map',
  templateUrl: './add-map.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./add-map.component.css']
})
export class AddMapComponent implements OnInit {
  modalOptions: NgbModalOptions;
  maps
  floor: [{
    name: Number,
    lane: [{
      name: String,
      size: Number,
      remSize: Number
    }]
  }]

  lane: [{
    name: String,
    size: Number,
    remSize: Number
  }]

  flrcount: number = 0;
  entrancePosts: Number = 1;
  exitPosts: Number = 1;
  floors: Number;

  dlfloor: Boolean[]

  adminID: string

  constructor(
    private mapservice: MapServiceService,
    private feeservice: FeeServiceService,
    private vehservice: VehicleProcessingServiceService,
    private userservice: UserServiceService,
    private modalService: NgbModal,
    private toast: ToastrService,
    private signinCom: SigninComServiceService,
    private router: Router) {
    this.modalOptions = {
      size: 'lg',
      windowClass: 'modal-frame'
    }
  }

  ngOnInit() {
    this.signinCom.oprId$.subscribe(
      data => this.setId(data))
    this.maps = {
      floor: [],
      post: {
        entrancePost: [],
        exitPost: []
      }
    }
  }

  setId(obj) {
    this.adminID = obj.id
  }

  addFlr(mdl) {
    this.lane = [{
      name: null,
      size: null,
      remSize: null
    }]

    this.floor = [{
      name: this.flrcount,
      lane: this.lane
    }]
    this.open(mdl)

  }

  addLane() {
    this.lane.push({ name: null, size: null, remSize: null })
  }

  dltLane(index) {
    this.lane.splice(index, 1)
  }

  apdFlr() {
    this.toast.success('Floor entered')
    this.maps.floor.push({ name: this.maps.floor.length, lane: this.lane })
    this.flrcount += 1
  }

  deleteFloor(abc) {
    this.dlfloor = new Array(this.maps.floor.length)
    this.open(abc)
  }

  dltFloor() {

    for (let i = 0; i < this.dlfloor.length; i++) {
      if (this.dlfloor[i] == true) {
        this.maps.floor.splice(i, 1)
        this.dlfloor.splice(i, 1)
        i--
      }
    }
    this.flrcount -= 1;
  }

  addMap() {
    this.maps.post.entrancePost = []
    this.maps.post.exitPost = []

    var ret
    for (let i = 0; i < this.entrancePosts; i++) {
      let obj = "en " + (i + 1)
      this.maps.post.entrancePost.push({ name: obj })
    }
    for (let i = 0; i < this.exitPosts; i++) {
      let obj = "ex " + (i + 1)
      this.maps.post.exitPost.push({ name: obj })
    }
    this.mapservice.doPost(this.maps).subscribe(
      data => { ret = data },
      err => console.error(err),
      () => {
        this.toast.success('Map added successfully')
        this.feeservice.doPost().subscribe()
        this.vehservice.doPost().subscribe()
        var obj = {
          id: this.adminID
        }
        this.userservice.doUpdateFT(obj).subscribe()
        this.router.navigate(["/admin"])
      }
    )
  }

  open(content) {
    this.modalService.open(content, this.modalOptions).result.then((result) => {
    });
  }

  logout() {
    this.router.navigate(["/adminsignin"])
  }
}
