import {
  Component,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import { SearchTagsType } from '../models/template';
import { MatIconModule } from '@angular/material/icon';
import { NgFor } from '@angular/common';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-templates',
  imports: [MatIconModule, NgFor],
  templateUrl: './search-templates.component.html',
  styleUrl: './search-templates.component.css',
  animations: [
    trigger('hide', [
      state(
        'true',
        style({ opacity: 0, transform: 'scale(0.9)', visibility: 'hidden' })
      ),
      state(
        'false',
        style({ opacity: 1, transform: 'scale(1)', visibility: 'visible' })
      ),
      transition('true <=> false', animate('300ms ease-in-out')),
    ]),
  ],
})

export class SearchTemplatesComponent {
  @Input() tag!: any;
  @Input() hide!: boolean;
  @Output() flushFilter = new EventEmitter<void>();
  shouldHide = false;

  constructor(private router: Router, private route: ActivatedRoute){}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['hide']) {
      console.log(
        'Updated hide inside SearchTemplatesComponent:',
        changes['hide'].currentValue
      );
    }
  }

  navigateTo(viewId: string): void {
    if (!viewId) return;
    this.router.navigate(['/template-editor'], { queryParams: { id: viewId } })
  }

  handleAnimationEnd() {
    if (this.hide) {
      this.shouldHide = true;
    }
  }

  reset(): void {
    this.flushFilter.emit();
  }
}
