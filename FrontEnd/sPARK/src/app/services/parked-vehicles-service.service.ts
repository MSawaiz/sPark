import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ParkedVehiclesServiceService {
  private url = "http://192.168.1.100:3000/";
  constructor(private http: HttpClient) { }

  doGet(obj) {
    return this.http.get(this.url + "parVeh/viewVehicle/" + obj)
  }

  doGetAllLPN() {
    return this.http.get(this.url + "parVeh/getAllLPN")
  }

  doPost(veh) {
    let body = JSON.stringify(veh)
    let url = this.url + "parVeh/addVehicle"
    return this.http.post(url, body, httpOptions)
    
  }

  doUpdate(veh) {
    let body = JSON.stringify(veh);
    let url = this.url + "parVeh/updateVehicle";
    return this.http.put(url, body, httpOptions);
  }
}