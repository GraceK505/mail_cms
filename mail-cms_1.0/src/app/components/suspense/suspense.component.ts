import { NgIf } from '@angular/common';
import { Component, Input, ChangeDetectorRef, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { delay, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-suspense-component-custom',
  templateUrl: "./suspense.component.html",
  imports: [NgIf] 
})
export class SuspenseComponentCustom<T> implements OnDestroy {
  private subscription!: Subscription;
  observeState: any[] = []

  constructor(private cdRef: ChangeDetectorRef){}

  @Input() 
  set observable(obs$: Observable<T>) {
    this.unsubscribe(); // Clean up previous subscription
    this.subscription = obs$.pipe(
      delay(1000),
      distinctUntilChanged() // Avoid duplicate emissions
    ).subscribe({
      next: (data) => {
        this.observeState = Array.isArray(data) ? [...data] : [];

        console.log(data)
        this.cdRef.detectChanges();
      },
      error: (err) => console.error(err),
      complete: () => {
        console.log("suspense loaded")
      }
    });
  }

  private unsubscribe() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}