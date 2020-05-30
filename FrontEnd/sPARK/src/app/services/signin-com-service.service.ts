import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';

@Injectable()
export class SigninComServiceService {

  private oprId = new Subject<object>()// source

  constructor() { }

  oprId$ = this.oprId.asObservable()

  getOprId(obj: object) {
    this.oprId.next(obj);
  }
}
