import { Component, Input } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { NgIf } from '@angular/common';
import { trigger, animate, state, transition, style } from '@angular/animations';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-error-slot',
  imports: [NgIf, MatIconModule],
  templateUrl: './error-slot.component.html',
  styleUrl: './error-slot.component.css',
  animations: [
    trigger('lightboxAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('250ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        animate(
          '200ms ease-in',
          style({ opacity: 0, transform: 'scale(0.1)' })
        ),
      ]),
    ]),
    trigger('animeTags', [
      state('hide', style({ display: "none" })),
      state('show', style({ display: "inline-flex" })),
      transition('hide <=> show', animate('300ms ease-in-out')),
    ]),
    trigger('closeSearch', [
      transition(':leave', [
        animate('300ms ease-in-out', style({ opacity: 0 })),
        style({ visibility: 'hidden' }),
      ]),
    ]),
  ],
})
export class ErrorSlotComponent {
  message!: string;
  error: any;
  isVisible: boolean = false;

  constructor(private errorModal: ModalService) {
    this.errorModal.errorModal$.subscribe({
      next: (data) => {
        this.message = data?.message
        this.error = data?.error
        this.isVisible = true
      }
    })
  }

  closeModal() {
    this.isVisible = false
  }
}
