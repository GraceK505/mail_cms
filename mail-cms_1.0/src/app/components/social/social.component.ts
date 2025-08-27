import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-social',
  imports: [],
  templateUrl: './social.component.html',
  styleUrl: './social.component.css',
  animations: [
    trigger('social_fade', [
      state('closed', style({ opacity: 0 })),
      state('open', style({ opacity: 1 })),
      transition('closed <=> open', animate('300ms ease-in-out')),
    ]),
  ],
})

export class SocialComponent {
  lightboxData: any;
  currentView: any;
  @Input() showSocial!: boolean;
  @Output() closeLightboxEvent = new EventEmitter<void>();
  private readonly route = inject(ActivatedRoute);

  constructor(
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private searchModal: ModalService
  ) {
  }

  // closeLightbox() {
  //   this.closeLightboxEvent.emit();
  //   this.lightboxData = null;
  //   this.cdRef.detectChanges();
  // }
}
