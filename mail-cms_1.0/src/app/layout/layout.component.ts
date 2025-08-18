import {
  Component,
  Output,
  EventEmitter,
  signal,
  ChangeDetectorRef,
  PLATFORM_ID,
  Inject,
  Input,
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
} from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Params, RouterOutlet, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MenuService } from '../store/menu.services';
import { Router } from '@angular/router';
import { SearchModalService } from '../services/search-modal.service';
import { LogoComponent } from '../components/UI/logo/logo.component';
import { SearchSlotComponent } from '../search-slot/search-slot.component';
import { SocialComponent } from '../components/social/social.component';
import { FooterComponent } from '../footer/footer.component';
import { ConvertService } from '../services/mjml-converter.service';
import { ViewsTypes } from '../store/menu.reducer';
import { ShowIconOnRouteDirective } from '../directives/app-show-icon-on-route.directive';
import { TemplateEditorService } from '../services/template-editor.service';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/all';

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
    ShowIconOnRouteDirective
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

export class LayoutComponent {
  @Input() data_theme!: string;
  boxState: 'open' | 'closed' | 'fade' = 'closed';
  subMenuState: 'open' | 'closed' = 'closed';
  stateValue = false;
  imageVisible = false;
  selectedItem: any = null;
  menuItems$: Observable<any>;
  currentView!: any;
  routeChanged: any = null;
  animeState = signal<boolean>(false);
  showLightbox!: boolean;
  showSocial!: any;
  theme$: any = 'light';
  iconVisible: boolean = false;
  handleToggleState: boolean = false;
  panelItem: any = null

  @Output() navigateEvent = new EventEmitter<string>();
  constructor(
    private searchModal: SearchModalService,
    private store: MenuService,
    private router: Router,
    private converter: ConvertService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private editorService: TemplateEditorService
  ) {

    gsap.registerPlugin(ScrollToPlugin)
    this.converter.loadMjmlFromdb()
    this.menuItems$ = this.store.getMenuItems();

    this.store.getViewState().subscribe(view => {
      this.currentView = view
    })
    const currentUrl = this.router.url;

    // ✅ Check if current URL contains 'template_editor'
    const isTemplateEditor = currentUrl.indexOf('template-editor') !== -1;

    this.iconVisible = isTemplateEditor
    console.log(this.iconVisible)
    gsap.to("#anchor", {
      scrollTo: { y: 0 },
      duration: 1,
      ease: 'power2.out'
    });
  }

  transitionState() {
    this.store.getViewState().subscribe((view) => {
      this.animeState.set(view !== 'home' as ViewsTypes);
    });
  }

  navigationContext() {
    this.boxState = 'fade';
    return this.editorService.navigateContext()
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
