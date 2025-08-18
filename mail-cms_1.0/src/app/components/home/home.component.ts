import { Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { SvgAnimationComponent } from '../UI/svg-animation/svg-animation.component';
import { isPlatformBrowser, NgFor } from '@angular/common';
import { gsap } from 'gsap';
import { SplitText, ScrollToPlugin } from 'gsap/all';
import { ArrowComponent } from '../UI/arrows/arrow/arrow.component';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [SvgAnimationComponent, ArrowComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  @ViewChild('logoText', { static: false }) logoText!: ElementRef;
  currentURL: string = ""
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private router: Router) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      gsap.registerPlugin(SplitText);
      let split = SplitText.create('.logo_text span', { type: 'words, chars' });
      
      gsap.fromTo(
        split.chars,
        { autoAlpha: 0, x: 40 },
        { autoAlpha: 1, x: 0, duration: 1, stagger: 0.2 }
      );
    }

    this.currentURL = this.router.url
  }

  scrollToSection(): void {
    if (isPlatformBrowser(this.platformId)) {
      gsap.registerPlugin(ScrollToPlugin);
      gsap.to(window, { duration: 1, scrollTo: window.innerHeight });  
    }
  }  

}
