import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; // 👈 Importa esto
import { App } from './app/app';
import { appRoutes } from './app/app.routes';

bootstrapApplication(App, {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient() // 👈 Añade esto
  ]
});
