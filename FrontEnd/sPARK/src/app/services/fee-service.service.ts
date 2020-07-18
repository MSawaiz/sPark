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
export class FeeServiceService {
  private url = "http://192.168.1.100:3000/";

  constructor(private http: HttpClient) { }

  doPost() {
    return this.http.get(this.url + "fee/addFee")
  }

  doGet() {
    return this.http.get(this.url + "fee/viewFee")
  }

  doUpdate(fee) {
    let body = JSON.stringify(fee);
    let url = this.url + "fee/updateFee";
    return this.http.put(url, body, httpOptions);
  }


}