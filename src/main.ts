import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appRoutes } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(App, {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient()
  ]
});
