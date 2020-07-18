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

    var chinStart = null
    var chinEnd = null

    if (this.size == "All") this.size = null
    if (this.cidatef == '') this.cidatef = null
    if (this.citimef == '') this.citimef = null
    if (this.cidatet == '') this.cidatet = null
    if (this.citimet == '') this.citimet = null

    let obj = JSON.stringify({
      LPN: this.LPN,
      fine: this.fine,
      cidatef: this.cidatef,
      cidatet: this.cidatet,
      citimef: this.citimef,
      citimet: this.citimet,
      size: this.size,
      floor: this.floor,
      lane: this.lane
    })
    this.pvService.doGet(obj).subscribe(
      data => {
        if (this.cidatef != null || this.cidatet != null) {
          if (this.cidatef != null && this.citimef != null)
            chinStart = new Date(this.cidatef + "T" + this.citimef)
          else if (this.cidatef != null && this.citimef == null)
            chinStart = new Date(this.cidatef + "T00:00:00")
          else
            chinStart = new Date("2018-01-01T00:00:00")

          if (this.cidatet != null && this.citimet != null)
            chinEnd = new Date(this.cidatet + "T" + this.citimet)
          else if (this.cidatet != null && this.citimet == null)
            chinEnd = new Date(this.cidatet + "T23:59:59")
          else
            chinEnd = new Date()

          var veh = []
          for (var i in data) {

            var log = data[i].checkinTime.split(" ")
            var logDate = log[0].split("-")
            var sint = new Date(logDate[2] + "-" + logDate[1] + "-" + logDate[0] + "T" + log[1])

            if (this.cidatef != null && this.cidatet != null) {
              if (sint.getTime() >= chinStart.getTime() && sint.getTime() <= chinEnd.getTime()) {
                veh.push(data[i])
              }
            }
            else if (this.cidatef != null && this.cidatet == null) {
              if (sint.getTime() >= chinStart.getTime()) {
                veh.push(data[i])
              }
            }
            else if (this.cidatef == null && this.cidatet != null) {
              if (sint.getTime() <= chinEnd.getTime()) {
                veh.push(data[i])
              }
            }
          }
          this.vehicles = veh
        }
        else
          this.vehicles = data
        this.LPN = null
        this.fine = null
        this.cidatef = null
        this.cidatet = null
        this.citimef = null
        this.citimet = null
        this.size = null
        this.floor = null
        this.lane = null
      },
      err => console.error(err))
  }

  filter(modal) {
    this.open(modal)
  }

  search() {
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