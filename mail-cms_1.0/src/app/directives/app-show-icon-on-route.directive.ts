import { Directive, ElementRef, Renderer2, OnInit, ChangeDetectorRef, HostListener } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Directive({
  selector: '[appShowIconOnRoute]'
})
export class ShowIconOnRouteDirective implements OnInit {
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private router: Router,
    private cdRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    const currentUrl = this.router.url;
    this.toggleIconVisibility(currentUrl);

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.toggleIconVisibility(event.urlAfterRedirects);
      });
  }

  private toggleIconVisibility(url: string): void {
    const isTemplateEditor = url.includes('template-editor');

    this.renderer.setStyle(
      this.el.nativeElement,
      'display',
      isTemplateEditor ? 'flex' : 'none'
    );
  }
}