import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AmbientBackgroundComponent } from './ambient-background/ambient-background';
import { FooterComponent } from './shared/components/footer/footer';
import { HeaderComponent } from './shared/components/header/header';
import { Sidebar } from "./shared/components/sidebar/sidebar";
import { Body } from './shared/components/body/body';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AmbientBackgroundComponent, Body, HeaderComponent, FooterComponent, Sidebar],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('lol-champ-select');
}
