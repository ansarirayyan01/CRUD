import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  @Output() searchQuery = new EventEmitter<string>();

  onSearch(query: string | null) {
    if (query !== null) {
      this.searchQuery.emit(query);
    }
  }
}
