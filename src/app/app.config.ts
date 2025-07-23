import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes'; // Ajusta la ruta si es necesario

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes)
  ]
};
