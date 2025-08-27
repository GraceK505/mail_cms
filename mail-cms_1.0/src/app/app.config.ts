import { ApplicationConfig } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideZoneChangeDetection } from '@angular/core';
import { getNewView, menuReducer, viewReducer } from './store/menu.reducer'; // Ensure your reducer is correctly imported
import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import {
  provideRouter,
  withComponentInputBinding,
  withViewTransitions,
} from '@angular/router';
import { themeReducer } from './store/theme.reducer';
import { appReducer, mjmlReducer } from './store/tags.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({ menu: menuReducer, view: viewReducer, theme: themeReducer, current: getNewView, appState: appReducer, mjmlState: mjmlReducer }),
    provideAnimations(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withFetch()),
    provideRouter(routes, withComponentInputBinding(), withViewTransitions())
  ]
};
