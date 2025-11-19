import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChampionService, Champion } from '../../services/champion';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-champion-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './champion-list.html',
  styleUrls: ['./champion-list.css']
})
export class ChampionListComponent implements OnInit {
  champions: Champion[] = [];
  filteredChampions: Champion[] = [];
  searchTerm: string = '';

  constructor(
    private route: ActivatedRoute,
    private championService: ChampionService
  ) {}

  ngOnInit(): void {
    this.championService.getChampions().subscribe((data: Champion[]) => {
      this.champions = data;
      this.applyFilters();
    });

    this.route.queryParams.subscribe(() => {
      this.applyFilters();
    });
  }

  applyFilters(): void {
    const difficulty = this.route.snapshot.queryParamMap.get('difficulty');
    const role = this.route.snapshot.queryParamMap.get('role');

    this.filteredChampions = this.champions.filter(champ => {
      const matchesDifficulty = !difficulty || this.matchesDifficulty(champ.info?.difficulty, difficulty);
      const matchesRole = !role || champ.tags?.includes(role.charAt(0).toUpperCase() + role.slice(1));
      const matchesSearch = !this.searchTerm || champ.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchesDifficulty && matchesRole && matchesSearch;
    });
  }

  private matchesDifficulty(champDifficulty: number, filter: string): boolean {
    switch (filter) {
      case 'easy':
        return champDifficulty <= 3;
      case 'medium':
        return champDifficulty >= 4 && champDifficulty <= 6;
      case 'hard':
        return champDifficulty >= 7;
      default:
        return true;
    }
  }
}
