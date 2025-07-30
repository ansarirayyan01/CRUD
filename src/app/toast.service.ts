import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  message: string = '';
  show: boolean = false;

  showToast(msg: string, duration: number = 2500) {
    this.message = msg;
    this.show = true;

    setTimeout(() => {
      this.clear();
    }, duration);
  }

  clear() {
    this.message = '';
    this.show = false;
  }
}
