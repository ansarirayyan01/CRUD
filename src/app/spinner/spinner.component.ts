import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SpinnerService } from '../services/spinner.service';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css'
})
export class SpinnerComponent {
  constructor(public spinnerService: SpinnerService) {}

}
