import { ApplicationRef } from '@angular/core';
import { createNewHosts } from '@angularclass/hmr';

export const hmrBootstrap = (module: any, bootstrap: () => Promise<ApplicationRef>) => {
  module.hot.accept();

  bootstrap().then(appRef => {
    module.hot.dispose(() => {
      const elements = appRef.components.map(c => c.location.nativeElement);
      const makeVisible = createNewHosts(elements);
      appRef.components.forEach(component => appRef.detachView(component.hostView));

      makeVisible();
    });
  });
};