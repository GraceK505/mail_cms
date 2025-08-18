import {
  Component,
  ElementRef,
  inject,
  NgZone,
  OnInit,
  QueryList,
  signal,
  ViewChildren,
  WritableSignal,
} from '@angular/core';
import { gsap } from 'gsap';
import { CSSPlugin } from 'gsap/all';

gsap.registerPlugin(CSSPlugin);

@Component({
  selector: 'app-docs',
  imports: [],
  templateUrl: './docs.component.html',
  styleUrl: './docs.component.css',
})
export class DocsComponent implements OnInit {
  private ngZone = inject(NgZone);
  private animations: gsap.core.Tween[] = [];
  index: WritableSignal<number> = signal(0);
  pauseValue: WritableSignal<boolean> = signal(false);
  @ViewChildren('imgBlock_1') imgBlock_1!: QueryList<ElementRef>;

  @ViewChildren('textBlock_1') textBlock_1!: QueryList<ElementRef>;

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => this.toggleVisibilityByIndex());
  }

  toggleVisibilityByIndex() {
    setInterval(() => {
      if (this.pauseValue()) return;

      this.index.update((current) => (current + 1) % 3);

      this.animations.forEach((tween) => tween.kill());
      this.animations = [];

      this.imgBlock_1.forEach((el, i) => {
        const tween = gsap.to(el.nativeElement, {
          ease: 'back.inOut',
          duration: 1,
          autoAlpha: i === this.index() ? 1 : 0,
        });
        this.animations.push(tween);
      });

      this.textBlock_1.forEach((el, i) => {
        const tween = gsap.to(el.nativeElement, {
          ease: 'back.inOut',
          duration: 1,
          autoAlpha: i === this.index() ? 1 : 0,
        });
        this.animations.push(tween);
      });
    }, 3000);
  }
}
