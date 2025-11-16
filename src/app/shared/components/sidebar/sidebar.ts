import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class Sidebar {
  constructor(private router: Router) {}

  applyFilter(event: Event, type: string) {
    const value = (event.target as HTMLSelectElement).value;
    this.router.navigate(['/champions'], {
      queryParams: { [type]: value },
      queryParamsHandling: 'merge'
    });
  }
}
