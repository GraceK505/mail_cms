import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { SearchTagsType } from '../models/template';
import { ActivatedRoute } from '@angular/router';
import { SearchTemplatesComponent } from '../search-templates/search-templates.component';
import { selectData } from '../store/tags.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search',
  imports: [NgIf, NgFor, MatIconModule, FormsModule, SearchTemplatesComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
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
      state('hide', style({ opacity: 0 })),
      state('show', style({ opacity: 1 })),
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
export class SearchComponent implements OnInit {
  tagId: string = '';
  tags$: Observable<SearchTagsType[]>;
  fullTags: any[] = [];
  hideBtn: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
  ) {
    this.tags$ = this.store.select(selectData)
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['id']) {
        this.tagId = params['id'].toLocaleLowerCase();

        this.tags$.subscribe((data) => {
          const tags = data
          this.fullTags = tags.filter((tag) => (tag.id.toLowerCase().startsWith(this.tagId)))
        })
      }
    });
  }

  resetTags(): void {
    this.tags$.subscribe(data => {
      this.fullTags = data
      this.hideBtn = true;
      console.log('hideBtn updated:', this.hideBtn);
    })
  }
}
