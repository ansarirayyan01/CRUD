import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private spinnerSubject = new BehaviorSubject<boolean>(false);
  spinner$ = this.spinnerSubject.asObservable();

  show() {
    this.spinnerSubject.next(true);
    console.log("showing")
  }
  
  hide() {
    this.spinnerSubject.next(false);
    console.log("hiding")
  }
}
