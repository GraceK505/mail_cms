import { Component, ElementRef, Inject, OnInit, PLATFORM_ID, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { isPlatformBrowser, NgFor } from '@angular/common';
import { gsap } from 'gsap';
import { SplitText, ScrollToPlugin, ScrollTrigger, ScrollSmoother } from 'gsap/all';
import { ArrowComponent } from '../UI/arrows/arrow/arrow.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  imports: [ArrowComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  @ViewChild('logoText', { static: false }) logoText!: ElementRef;
  @ViewChild('section1', { static: true }) section1!: ElementRef;
  @ViewChild('section2', { static: true }) section2!: ElementRef;
  @ViewChild('section3', { static: true }) section3!: ElementRef;

  currentURL: string = "";
  isBrowser: boolean = false;


  constructor(@Inject(PLATFORM_ID) private platformId: Object, private router: Router) {
    gsap.registerPlugin(SplitText, ScrollToPlugin, ScrollTrigger)

    this.isBrowser = isPlatformBrowser(this.platformId)
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      let split = SplitText.create('.logo_text span', { type: 'words, chars' });

      gsap.fromTo(
        split.chars,
        { autoAlpha: 0, x: 40 },
        { autoAlpha: 1, x: 0, duration: 1, stagger: 0.2 }
      );

      let splitTitle = SplitText.create("#text_title, #text_title1, #text_title2", { type: "words, chars" })

      gsap.fromTo(
        splitTitle.chars,
        { autoAlpha: 0, x: 40 },
        { autoAlpha: 1, x: 0, duration: 1, stagger: 0.2 }
      );

      gsap.timeline({
        scrollTrigger: {
          trigger: "#content",
          start: "top top",
          end: "+=3000",
          markers: false,
          scrub: 2,
          pin: true,
          pinSpacing: true
        }
      }).fromTo(".paperplane", {
        width: 300,
        height: 300,
        overflow: "hidden",
        ease: "back.in"
      }, {
        width: 0,
        height: 0,
        overflow: "visible",
        duration: 2
      }).fromTo(".logo_text", {
        scale: 1.1
      }, {
        scale: 0,
        duration: 2
      })

      const section = document.querySelectorAll(".st")

      gsap.timeline({
        scrollTrigger: {
          trigger: this.section1.nativeElement,
          start: "top center",
          end: "bottom center",
          scrub: 2,
        }
      }).fromTo(this.section1.nativeElement.querySelector(".wrapper"), {
        scale: 0
      }, { scale: 1.1 })  

      gsap.timeline({
        scrollTrigger: {
          trigger: this.section1.nativeElement,
          start: "top top",
          end: "bottom bottom+=300",
          markers: false,
          scrub: false,
        }
      }).fromTo(".t1", {
        opacity: 0, y: 20
      }, {
        opacity: 1, y: 0
      })


      gsap.timeline({
        scrollTrigger: {
          trigger: this.section2.nativeElement,
          start: "top center",
          end: "bottom-=40% bottom",
          scrub: 2
        }
      }).fromTo(this.section2.nativeElement.querySelector(".draw"), {
        opacity: 0, yPercent: 100
      }, { opacity: 1, yPercent: 0 })    

      gsap.timeline({
        scrollTrigger: {
          trigger: this.section2.nativeElement,
          start: "top top",
          end: "bottom bottom",
          scrub: false
        }
      }).fromTo(".t2", {
        opacity: 0, y: 20
      }, {
        opacity: 1, y: 0
      })
    }
  }

  scrollToSection(): void {
    if (isPlatformBrowser(this.platformId)) {
      gsap.to(window, { duration: 2, scrollTo: window.innerHeight * 5.5 });
    }
  }

}
