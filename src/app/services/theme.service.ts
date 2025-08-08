import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private DarkModeSubject = new BehaviorSubject<boolean>(false);
  darkMode$ = this.DarkModeSubject.asObservable()

  constructor() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    this.DarkModeSubject.next(isDarkMode);
  }

  toggleDarkMode(): void {
    // Toggle the current dark mode state
    const currentMode = this.DarkModeSubject.value;
    this.DarkModeSubject.next(!currentMode);
    localStorage.setItem('darkMode', (!currentMode).toString());
  }
}
