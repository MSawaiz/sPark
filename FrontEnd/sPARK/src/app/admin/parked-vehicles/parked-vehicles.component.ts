import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ParkedVehiclesServiceService } from 'src/app/services/parked-vehicles-service.service';
import { MapServiceService } from 'src/app/services/map-service.service'
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-parked-vehicles',
  templateUrl: './parked-vehicles.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./parked-vehicles.component.css']
})
export class ParkedVehiclesComponent implements OnInit {

  modalOptions: NgbModalOptions;
  vehicles
  floors

  LPN: String = null
  size: String = null
  floor: Number = null
  lane: String = null
  cidatef: String = null
  cidatet: String = null
  citimef: String = null
  citimet: String = null
  fine: boolean = false

  constructor(
    private pvService: ParkedVehiclesServiceService,
    private modalService: NgbModal,
    private mapservice: MapServiceService) {
    this.modalOptions = {
      size: 'lg',
      windowClass: 'modal-frame'
    }
  }

  ngOnInit() {
    this.getVeh()
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
      size: this.size,
      floor: this.floor,
      lane: this.lane
    })
    this.pvService.doGet(obj).subscribe(
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
      if (this.cidatet != null) {
        stg = this.cidatet.split("-")
        this.cidatet = stg[2] + "-" + stg[1] + "-" + stg[0]

      }
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