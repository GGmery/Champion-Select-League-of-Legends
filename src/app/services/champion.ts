import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Champion {
  key: string;
  id: string;
  name: string;
  title: string;
  image: { full: string };
  info: { difficulty: number; attack: number; defense: number; magic: number };
  tags: string[];
}

@Injectable({ providedIn: 'root' })
export class ChampionService {
  constructor(private http: HttpClient) {}

  getChampions(): Observable<Champion[]> {
    return this.http
      .get<any>('https://ddragon.leagueoflegends.com/cdn/15.23.1/data/es_ES/champion.json')
      .pipe(
        map(res =>
          Object.keys(res.data).map(key => {
            const champ = res.data[key];
            return {
              key: champ.key,
              id: champ.id,
              name: champ.name,
              title: champ.title,
              image: champ.image,
              info: champ.info,
              tags: champ.tags
            } as Champion;
          })
        )
      );
  }
}
