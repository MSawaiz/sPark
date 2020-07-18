import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MapServiceService } from 'src/app/services/map-service.service';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-map',
  templateUrl: './view-map.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./view-map.component.css']
})
export class ViewMapComponent implements OnInit {

  modalOptions: NgbModalOptions;

  maps
  entrancePosts: Number;
  exitPosts: Number;
  floors: Number;
  page: number = -1
  upage: Number
  lane: [{
    name: string,
    size: number,
    remSize: number
  }]

  dlfloor: Boolean[]

  constructor(
    private mapservice: MapServiceService,
    private toast: ToastrService,
    private modalService: NgbModal) {
    this.modalOptions = {
      size: 'lg',
      windowClass: 'modal-frame'
    }
  }

  ngOnInit() {
    this.getMap()
  }

  getMap() {
    this.mapservice.doGet().subscribe(
      data => { this.maps = data },
      err => console.error(err))
  }

  pageAct(act: String) {
    if (act == "inc")
      this.page = this.page + 1
    else if (act == "dec") {
      this.page = this.page - 1
    }
  }

  updAct(act: String) {
    if (act == 'add') {
      this.upage = -2
      this.lane = [{
        name: null,
        size: null,
        remSize: null
      }]
    }
    else if (act == 'del') {
      this.upage = -3
    }
    else if (act == 'ret') {
      this.upage = -1
    }
  }

  edtMap(modal) {
    this.upage = -1
    this.entrancePosts = this.maps.post.entrancePost.length
    this.exitPosts = this.maps.post.exitPost.length
    this.floors = this.maps.floor.length
    this.dlfloor = new Array(this.maps.floor.length)
    this.open(modal)
  }

  addLane() {
    this.lane.push({ name: null, size: null, remSize: null })
  }

  dltLane(index) {
    this.lane.splice(index, 1)
  }

  apdFlr() {
    this.toast.success("Floor entered successfully!")
    this.maps.floor.push({ name: this.maps.floor.length, lane: this.lane })
    this.upage = -1
  }

  updFlr(flr: number) {
    this.maps.floor[flr].lane = this.lane
    var ret
    this.mapservice.doUpdate(this.maps).subscribe(
      data => { ret = data },
      err => console.error(err),
      () => this.toast.success("Floor updated successfully!")
    )
    setTimeout(() => this.getMap(), 500)
  }

  dltFloor() {
    for (let i = 0; i < this.dlfloor.length; i++) {
      if (this.dlfloor[i] == true) {
        this.maps.floor.splice(i, 1)
        this.dlfloor.splice(i, 1)
        i--
      }
    }
    this.upage = -1
  }

  edtFlr(flr: number, modal) {
    this.upage = -2
    this.open(modal)
    this.lane = this.maps.floor[flr].lane
  }

  updMap() {
    var ret
    if (this.entrancePosts != this.maps.post.entrancePost.length) {
      this.maps.post.entrancePost = []
      for (let i = 0; i < this.entrancePosts; i++) {
        let obj = "en " + (i + 1)
        this.maps.post.entrancePost.push({ name: obj })
      }
    }
    if (this.exitPosts != this.maps.post.exitPost.length) {
      this.maps.post.exitPost = []
      for (let i = 0; i < this.exitPosts; i++) {
        let obj = "ex " + (i + 1)
        this.maps.post.exitPost.push({ name: obj })
      }
    }
    this.mapservice.doUpdate(this.maps).subscribe(
      data => { ret = data },
      err => console.error(err),
      () => this.toast.success("Map updated successfully!")
    )
    setTimeout(() => this.getMap(), 500)
  }

  closeResult
  open(content) {
    this.modalService.open(content, this.modalOptions).result.then((result) => { }, (reason) => {
      this.getMap()
    });
  }
}
