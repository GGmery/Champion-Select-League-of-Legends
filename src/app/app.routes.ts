import { Routes } from '@angular/router';
import { ChampionListComponent } from './champions/champion-list/champion-list';
import { ChampionDetail } from './champions/champion-detail/champion-detail';
import { ItemList } from './items/item-list/item-list';
import { RunesList } from './runes/runes-list/runes-list';
import { SpellList } from './spells/spell-list/spell-list';
import { ItemDetail } from './items/item-detail/item-detail';

export const appRoutes: Routes = [
  { path: 'champions', component: ChampionListComponent },
  { path: '', redirectTo: '/champions', pathMatch: 'full'},
  { path: 'champions/:id', component: ChampionDetail },
  { path: 'items', component: ItemList },
  { path: 'items/:id', component: ItemDetail },
  { path: 'runes', component: RunesList },
  { path: 'spells', component: SpellList },
  { path: '', redirectTo: '/champions', pathMatch: 'full' }
];
