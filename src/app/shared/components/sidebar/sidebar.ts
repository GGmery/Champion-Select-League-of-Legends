import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
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
