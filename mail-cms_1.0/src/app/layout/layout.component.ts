import {
  Component,
  Output,
  EventEmitter,
  signal,
  PLATFORM_ID,
  Inject,
  Input,
  OnInit,
  ElementRef,
  QueryList,
  ViewChildren,
} from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import {
  NgFor,
  NgIf,
  AsyncPipe,
  isPlatformBrowser,
} from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { NavigationEnd, RouterOutlet } from '@angular/router';
import { filter, Observable } from 'rxjs';
import { MenuService } from '../store/menu.services';
import { Router } from '@angular/router';
import { ModalService } from '../services/modal.service';
import { LogoComponent } from '../components/UI/logo/logo.component';
import { SearchSlotComponent } from '../search-slot/search-slot.component';
import { SocialComponent } from '../components/social/social.component';
import { FooterComponent } from '../footer/footer.component';
import { ConvertService } from '../services/mjml-converter.service';
import { ViewsTypes } from '../store/menu.reducer';
import { ShowIconOnRouteDirective } from '../directives/app-show-icon-on-route.directive';
import { TemplateEditorService } from '../services/template-editor.service';
import gsap from 'gsap/all';
import { ScrollToPlugin } from 'gsap/all';
import { ShowIconOnRouteDirective1 } from '../directives/app-show-icon-on-route1.directive';
import { EditorService } from '../services/editor.service';
import { ErrorSlotComponent } from '../components/error-slot/error-slot.component';

@Component({
  selector: 'app-layout',
  imports: [
    MatIconModule,
    RouterOutlet,
    NgFor,
    NgIf,
    AsyncPipe,
    SearchSlotComponent,
    SocialComponent,
    LogoComponent,
    FooterComponent,
    ShowIconOnRouteDirective,
    ShowIconOnRouteDirective1,
    ErrorSlotComponent
  ],
  styleUrls: ['./layout.component.css'],
  templateUrl: './layout.component.html',
  animations: [
    trigger('toggleBox', [
      state('closed', style({ width: '0%', overflow: 'hidden' })),
      state('open', style({ width: '250px' })),
      state('fade', style({ opacity: 0, display: 'none' })),
      transition('closed <=> open', animate('300ms ease-in-out')),
      transition('open <=> fade', animate('300ms ease-in-out')),
    ]),
    trigger('sub_menu_fade', [
      state('closed', style({ opacity: 0 })),
      state('open', style({ opacity: 1 })),
      transition('closed <=> open', animate('300ms ease-in-out')),
    ]),
  ],
})

export class LayoutComponent implements OnInit {
  @ViewChildren("menuList") menuList!: QueryList<ElementRef>
  @Input() data_theme!: string;
  boxState: 'open' | 'closed' | 'fade' = 'closed';
  subMenuState: 'open' | 'closed' = 'closed';
  stateValue = false;
  selectedItem: any = null;
  menuItems$: Observable<any>;
  currentView!: any;
  animeState = signal<boolean>(false);
  showLightbox!: boolean;
  showSocial!: any;
  theme$: any = 'light';
  iconVisible: boolean = false;
  panelItem: any = null
  currentUrl!: string
  isActive: boolean = false;
  isBrowser: boolean = false;

  @Output() navigateEvent = new EventEmitter<string>();
  constructor(
    private searchModal: ModalService,
    private store: MenuService,
    private router: Router,
    private converter: ConvertService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private editorService: TemplateEditorService,
    private editor: EditorService
  ) {
    this.converter.loadMjmlFromdb()
    this.menuItems$ = this.store.getMenuItems();

    this.store.getViewState().subscribe(view => {
      this.currentView = view
    })
    const currentUrl = this.router.url;
    this.currentUrl = this.router.url
    // ✅ Check if current URL contains 'template_editor'
    const isTemplateEditor = currentUrl.indexOf('template-editor') !== -1;

    this.iconVisible = isTemplateEditor
  }

  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId)

    this.scrollToSection();

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentUrl = event.urlAfterRedirects;
        this.checkActive()
      });

  }

  checkActive(): void {
    this.menuList.forEach((ml: ElementRef) => {
      const el = ml.nativeElement;
      const route = el.getAttribute('data-active');

      if (route === this.currentUrl) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });
  }

  scrollToSection(): void {
    if (this.isBrowser) {
      gsap.registerPlugin(ScrollToPlugin);
      gsap.to(window, { duration: 1, scrollTo: 0 });
    }
  }

  transitionState() {
    this.store.getViewState().subscribe((view) => {
      this.animeState.set(view !== 'home' as ViewsTypes);
    });
  }


  flushEditor() {
    this.editor.editor$.subscribe((ed) => {
      ed?.runCommand("core:canvas-clear")
    })
  }

  navigationContext() {
    this.editorService.navigateContext()
    this.boxState = 'fade';
    return;
  }

  themeChanging() {
    this.store.toggleTheme();
    this.store.getCurrentTheme().subscribe((newTheme) => {
      this.theme$ = newTheme;
    });
  }

  navigateToView() {
    this.store.getViewState().subscribe((view) => {
      this.showLightbox = view === 'search-slot';
      this.boxState = 'fade';
    });
  }

  openSocial() {
    this.store.changeView(!this.showSocial ? 'social' : null);
    this.store.getViewState().subscribe((view) => {
      this.showSocial = view === 'social';
      this.boxState = 'fade';
    });
  }

  toggle(event: MouseEvent, item: any) {
    this.selectedItem = item;
    const navUrl = item.subMenu[0]?.name || '';
    this.store.changeView(navUrl);

    if (navUrl.startsWith('search-slot')) {
      this.searchModal.open(navUrl);
      this.navigateToView();
      this.boxState = 'fade';
    } else {
      this.router.navigate([`/${navUrl}`]);
      this.boxState = 'fade'
    }
  }

  handleBoxState(item: any) {
    this.panelItem = item
    this.boxState = this.boxState === 'closed' ? 'open' : 'closed'
  }

  onToggleBoxAnimationDone() {
    this.subMenuState = this.boxState === 'open' ? 'open' : 'closed';
  }

  close() {
    this.boxState = 'closed';
  }
}
