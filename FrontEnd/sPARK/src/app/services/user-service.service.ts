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
export class UserServiceService {

  private url = "http://localhost:3000/";

  constructor(private http: HttpClient) { }

  doPost(obj) {
    let body = JSON.stringify(obj)
    let url = this.url + "user/viewUser"
    return this.http.post(url, body, httpOptions)
  }

  doUpdate(usr) {
    let body = JSON.stringify(usr);
    let url = this.url + "user/updatePass";
    return this.http.put(url, body, httpOptions);
  }

  doUpdateFT(usr) {
    let body = JSON.stringify(usr);
    let url = this.url + "user/updateft";
    return this.http.put(url, body, httpOptions);
  }
}