import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interfaz para un campeón
export interface Champion {
  id: string;
  name: string;
  image: {
    full: string;
  };
}

// Servicio para obtener campeones
@Injectable({ providedIn: 'root' })
export class ChampionService {
  private url = 'https://ddragon.leagueoflegends.com/cdn/14.10.1/data/es_ES/champion.json';

  constructor(private http: HttpClient) {}

  getChampions(): Observable<Champion[]> {
    return new Observable(observer => {
      this.http.get<any>(this.url).subscribe(data => {
        const champions: Champion[] = Object.values(data.data);
        observer.next(champions);
        observer.complete();
      });
    });
  }
}
