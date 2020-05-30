import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { VehicleArchiveServiceService } from 'src/app/services/vehicle-archive-service.service';
import { MapServiceService } from 'src/app/services/map-service.service'
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-vehicle-archive',
  templateUrl: './vehicle-archive.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./vehicle-archive.component.css']
})
export class VehicleArchiveComponent implements OnInit {

  @ViewChild('updbtn', { static: true }) udpbtn: ElementRef

  modalOptions: NgbModalOptions;
  vehicles
  floors

  LPN: String = null
  size: String = null
  floor: String = null
  lane: String = null
  cidatef: String = null
  cidatet: String = null
  citimef: String = null
  citimet: String = null
  codatef: String = null
  codatet: String = null
  cotimef: String = null
  cotimet: String = null
  fine: boolean = false
  feef: Number = null
  feet: Number = null

  constructor(private avService: VehicleArchiveServiceService,
    private modalService: NgbModal,
    private mapservice: MapServiceService) {
    this.modalOptions = {
      size: 'lg',
      windowClass: 'modal-frame'
    }
  }

  ngOnInit() {
    this.udpbtn.nativeElement.click()
  }

  refresh() {
    this.LPN = null
    this.size = null
    this.floor = null
    this.lane = null
    this.cidatef = null
    this.cidatet = null
    this.citimef = null
    this.citimet = null
    this.fine = false
    this.getVeh();
  }

  getVeh() {
    if (this.size == "All")
      this.size = null
    let obj = JSON.stringify({
      LPN: this.LPN,
      fine: this.fine,
      cidatef: this.cidatef,
      cindatet: this.cidatet,
      citimef: this.citimef,
      citimet: this.citimet,
      codatef: this.codatef,
      codatet: this.codatet,
      cotimef: this.cotimef,
      cotimet: this.cotimet,
      size: this.size,
      floor: this.floor,
      lane: this.lane,
      feef: this.feef,
      feet: this.feet
    })
    this.avService.doGet(obj).subscribe(
      data => { this.vehicles = data },
      err => console.error(err))
  }

  filter(modal) {
    this.open(modal)
  }

  search() {
    if (this.cidatef != null) {
      let stg = this.cidatef.split("-")
      this.cidatef = stg[2] + "-" + stg[1] + "-" + stg[0]
    }
    if (this.LPN != null) {
      this.LPN = this.LPN.toUpperCase()
    }
    this.getVeh()
  }

  open(content) {
    this.modalService.open(content, this.modalOptions).result.then((result) => {
    });
  }

  getMap() {
    this.mapservice.doGet().subscribe(
      data => { this.floors = data },
      err => console.error(err))
  }
}
