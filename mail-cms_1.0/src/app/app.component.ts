import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
})

export class AppComponent {

  constructor(@Inject(PLATFORM_ID) private platformId: Object,) {
    this.updatePageContent()
  }

  updatePageContent(): void {
    if (isPlatformBrowser(this.platformId) &&
      typeof window !== 'undefined' &&
      typeof document !== 'undefined') {
      if (!document.startViewTransition) {
        console.log('View transitions not supported.');
        return;
      }

      document.startViewTransition(() => {
        console.log('Transition applied!');
      });
    }

  }
}
