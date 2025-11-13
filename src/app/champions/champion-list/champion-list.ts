import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChampionService, Champion } from '../../services/champion';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-champion-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule], // 👈 Importante para *ngFor y HttpClient
  templateUrl: './champion-list.html',
  styleUrls: ['./champion-list.css']
})
export class ChampionListComponent implements OnInit {
  champions: Champion[] = [];

  constructor(private championService: ChampionService) {}

  ngOnInit(): void {
    this.championService.getChampions().subscribe(data => {
      this.champions = data;
    });
  }
}
