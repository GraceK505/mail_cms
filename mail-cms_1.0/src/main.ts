import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { enableProdMode } from '@angular/core';
import { environment } from './environment/environment.hmr';

declare const module: {
    hot: {
      accept: () => void;
      dispose: (callback: () => void) => void;
    };
  };

if (environment.production) {
  enableProdMode();
}

if (environment.hmr && module.hot) {  // Fix: Use import.meta.hot
  import('./hmr').then(({ hmrBootstrap }) => {
    hmrBootstrap(module, () => bootstrapApplication(AppComponent, appConfig));
  });
} else {
  bootstrapApplication(AppComponent, appConfig)
    .catch((err) => console.error("Bootstrap Error:", err));
}