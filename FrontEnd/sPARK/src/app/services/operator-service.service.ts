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
export class OperatorService {
    private url = "http://localhost:3000/";
    constructor(private http: HttpClient) { }

    doGet() {
        return this.http.get(this.url + "operator/viewoperators")
    }

    doGetOpr(id) {
        return this.http.get(this.url + "operator/viewopr/" + id)
    }

    doPost(opr) {
        let body = JSON.stringify(opr)
        let url = this.url + "operator/addoperator"
        return this.http.post(url, body, httpOptions)
    }

    doDelete(id) {
        let url = this.url + "operator/deleteoperator/" + id
        return this.http.delete(url, httpOptions)
    }

    doUpdate(opr) {
        let body = JSON.stringify(opr);
        let url = this.url + "operator/updateoperator";
        return this.http.put(url, body, httpOptions);
    }

    doUpdateAct(opr) {
        let body = JSON.stringify(opr);
        let url = this.url + "operator/updateopract";
        return this.http.put(url, body, httpOptions);
    }
}