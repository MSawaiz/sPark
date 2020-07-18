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
export class MapServiceService {

  private url = "http://192.168.1.100:3000/";

  constructor(private http: HttpClient) { }


  doGet() {
    return this.http.get(this.url + "map/viewMap")
  }

  doUpdate(map) {
    let body = JSON.stringify(map);
    let url = this.url + "map/updatemap";
    return this.http.put(url, body, httpOptions);
  }

  doPost(map) {
    let body = JSON.stringify(map);
    let url = this.url + "map/addmap"
    return this.http.post(url, body, httpOptions)
  }
}