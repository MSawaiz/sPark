import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class VehicleArchiveServiceService {
  private url = "http://192.168.1.100:3000/";
  constructor(private http: HttpClient) { }

  doGet(obj) {
    return this.http.get(this.url + "vehicleArch/viewvehicle/" + obj)
  }

  doPost(veh) {
    let body = JSON.stringify(veh)
    let url = this.url + "vehicleArch/addvehicle"
    return this.http.post(url, body, httpOptions)
  }
}
