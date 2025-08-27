import {
  Component,
  ElementRef,
  inject,
  OnInit,
  QueryList,
  signal,
  ViewChild,
  ViewChildren,
  WritableSignal,
} from '@angular/core';
import { SearchTagsType } from '../models/template';
import { AsyncPipe, NgFor } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  trigger,
  state,
  animate,
  style,
  transition,
} from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SuspenseComponentCustom } from '../components/suspense/suspense.component';
import { selectData, selectLoading } from '../store/tags.selectors';
import { Store } from '@ngrx/store';
import { ConvertService } from '../services/mjml-converter.service';

type HideAndShow = 'show' | 'hide';

@Component({
  selector: 'app-template-list',
  imports: [AsyncPipe, NgFor, MatIconModule, SuspenseComponentCustom],
  templateUrl: './template-list.component.html',
  styleUrl: './template-list.component.css',
  animations: [
    trigger('animeTags', [
      state('hide', style({ opacity: 0 })),
      state('show', style({ opacity: 1 })),
      transition('hide <=> show', animate('300ms ease-in-out')),
    ]),
    trigger('hoverBox', [
      state('show', style({ bottom: 0 })),
      state('hide', style({ bottom: '-100%' })),
      transition('show <=> hide', animate('300ms ease-in-out')),
    ]),
    trigger('defilingText', [
      state('start', style({ transform: 'translateX(0)' })),
      state('end', style({ transform: 'translateX(-50%)' })),
      transition('start <=> end', animate('300ms ease-in-out')),
    ]),
  ],
})
export class TemplateListComponent implements OnInit {
  @ViewChildren('email_cards') email_cards!: QueryList<
    ElementRef<HTMLDivElement>
  >;
  @ViewChild('inputText', { static: false })
  inputText!: ElementRef<HTMLDivElement>;

  tags$!: Observable<SearchTagsType[]>;
  toggleSearch!: any;
  toggleVisibility!: boolean;
  hoverState: { [key: string]: string } = {};
  textDefileState: { [key: string]: string } = {};
  checkTheLength: WritableSignal<boolean> = signal(false);
  fakeLength: any[] = Array.from({ length: 9 });
  loading$!: Observable<any>;
  search$ = new BehaviorSubject<string>('');
  public store: Store = inject(Store)

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.tags$ = this.store.select(selectData),
    this.loading$ = this.store.select(selectLoading)
  }

  onInputSearch(value: string): void {
    const searchValue = value.toLowerCase().trim();

    this.tags$.subscribe((tags: Array<{ name: string }>) => {
      const matchingTags = tags.filter(tag =>
        tag.name.toLowerCase().includes(searchValue)
      );

      const hasMatch = matchingTags.length > 0;

      if (!this.email_cards || this.email_cards.length === 0) {
        console.warn("Email card elements not found.");
        return;
      }

      const cardsArray = this.email_cards.toArray();

      cardsArray.forEach((card, index) => {
        const tag = tags[index];

        const shouldShow =
          value.length === 0 || // Show all if input is cleared
          (hasMatch &&
            matchingTags.some(matchingTag => matchingTag.name === tag.name));

        card.nativeElement.style.display = shouldShow ? "inline" : "none";
      });

      // Optional: update toggleVisibility based on whether anything is shown
      this.toggleVisibility = value.length === 0 || hasMatch;
    });
  }

  navigateTo(viewId: string): void {
    if (!viewId) return;
    sessionStorage.clear()
    this.router.navigate(['/template-editor'], { queryParams: { id: viewId } });
  }

  setHoverState(boxId: string, state: string): void {
    this.hoverState[boxId] = state;
    this.textDefileState[boxId] = state;
  }
}
