import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    "X-Access-Token": "zXYf0FY31h1bEb3Iy7ZeSMHaKM08PJs6qHWM"
  })
};

@Injectable({
  providedIn: 'root'
})
export class VehicleProcessingServiceService {

  private url = "http://192.168.1.100:3000/";

  constructor(private http: HttpClient) { }

  doVehIdn(img) {
    let image = JSON.stringify(img)
    let url = "https://dev.sighthoundapi.com/v1/recognition?objectType=vehicle,licenseplate"
    return this.http.post(url, image, httpOptions)
  }

  doLPNIdn(img) {
    let image = JSON.stringify(img)
    let url = "https://dev.sighthoundapi.com/v1/recognition?objectType=licenseplate"
    return this.http.post(url, image, httpOptions)
  }

  doPost() {
    return this.http.get(this.url + "vehLis/addLis")
  }

  doGetCat(veh) {
    veh = JSON.stringify(veh)
    let url = this.url + "vehLis/getCat/" + veh;
    return this.http.get(url);
  }
}