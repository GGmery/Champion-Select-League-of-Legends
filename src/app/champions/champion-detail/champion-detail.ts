import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';


@Component({
  selector: 'app-champion-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './champion-detail.html',
  styleUrls: ['./champion-detail.css'],
})
export class ChampionDetail implements OnInit {
  championId: string = '';
  championData: any = null;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute, 
    private http: HttpClient,
    private location: Location
  ) {}


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.championId = id;
        this.fetchChampionData();
      }
    });
  }

  fetchChampionData(): void {
    const url = `https://ddragon.leagueoflegends.com/cdn/14.10.1/data/es_ES/champion/${this.championId}.json`;

    this.http.get<any>(url).subscribe({
      next: (data) => {
        this.championData = data.data[this.championId];
        this.error = null;
      },
      error: () => {
        this.error = 'No se pudo cargar el campeón.';
        this.championData = null;
      },
    });
  }

  goBack(): void {
    this.location.back();
  }
}
