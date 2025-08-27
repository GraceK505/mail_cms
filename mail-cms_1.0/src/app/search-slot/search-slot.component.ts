import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ModalService } from '../services/modal.service';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ConvertService } from '../services/mjml-converter.service';
import { Store } from '@ngrx/store';
import { selectData } from '../store/tags.selectors';
import { map, Observable } from 'rxjs';
import { SearchTagsType } from '../models/template';
import { SuspenseComponentCustom } from '../components/suspense/suspense.component';

@Component({
  selector: 'app-search-slot',
  imports: [NgIf, NgFor, MatIconModule, FormsModule, AsyncPipe, SuspenseComponentCustom],
  templateUrl: './search-slot.component.html',
  styleUrl: './search-slot.component.css',
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
export class SearchSlotComponent implements OnInit {
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLDivElement>;
  @ViewChild('filter') filter!: ElementRef<HTMLInputElement>;
  @ViewChildren('tagButton') tagButton!: QueryList<ElementRef>;

  @Input() showLightbox!: boolean;
  @Output() closeLightboxEvent = new EventEmitter<void>();
  @Output() flushFilter = new EventEmitter();

  lightboxData: any;
  currentView = '';
  searchInputValue: string = '';
  tags$!: Observable<SearchTagsType[]>;
  inputTags: any[] = [];
  toggleTagsView: any | string = 'hide';
  toggleVisibility: boolean = true;
  dbData!: Observable<any>;
  private readonly route = inject(ActivatedRoute);

  onInputFocus() {
    setTimeout(
      () => this.searchInput && this.searchInput.nativeElement.focus()
    );
  }

  constructor(
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private searchModal: ModalService,
    private store: Store,
    private converter: ConvertService
  ) {
    this.searchModal.openModal$.subscribe((data) => {
      this.lightboxData = data;
      this.showLightbox = true;
      this.cdRef.detectChanges();
    });

    this.route.queryParams.subscribe((params) => {
      this.currentView = params['id'] || '';
    });
  }
  
  ngOnInit(): void {
    this.tags$ = this.store.select(selectData)
  }

  onInputChange(value: string): void {
    this.tags$.subscribe((tags) => {
      const matchingTags = tags.filter((tag: any) =>
        tag.name.toLowerCase().includes(value.toLowerCase())
      );
      
      const hasMatch = matchingTags.length > 0;

      this.toggleTagsView = this.tagButton.map((_, index) => 
          hasMatch && matchingTags.some((tag) => tag.name === tags[index].name) && value.length ? 'show' : 'hide'
      );
      this.toggleVisibility = value.length ? false : true;
    });
  }

  // filterInputValue(
  //   searchTags: Observable<any[]>,
  //   enteredValue: string
  // ): any {
  //   const val = enteredValue.toLowerCase().trim();
  //   if (!val) return [];

  //   searchTags.subscribe(
  //     tags => (tags.filter(tag => tag.id.toLowerCase().startsWith(val)))
  //   );
  // }

  navigateTo(viewId: string): void {
    if (!viewId) return;

    this.toggleVisibility = false;
    this.router
      .navigate(['/search'], { queryParams: { id: viewId } })
      .then(() => {
        this.closeLightbox();
      });
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent) {
    this.closeLightbox();
  }

  closeLightbox() {
    this.closeLightboxEvent.emit();
    this.lightboxData = null;
    this.cdRef.detectChanges();
  }
}
