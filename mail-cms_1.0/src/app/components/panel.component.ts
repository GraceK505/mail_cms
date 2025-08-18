import 'zone.js';
import {
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  Renderer2,
} from '@angular/core';
import createStudioEditor from '@grapesjs/studio-sdk';
import '@grapesjs/studio-sdk/dist/style.css';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { MenuService } from '../store/menu.services';

@Component({
  selector: 'app-grapes-toolpanel',
  imports: [MatIconModule, NgFor],
  templateUrl: './panel.component.html',
  animations: [
    trigger('toggleBox', [
      state(
        'closed',
        style({
          width: '0%',
          overflow: 'hidden',
        })
      ),
      state(
        'open',
        style({
          width: '100%',
        })
      ),
      transition('closed <=> open', animate('300ms ease-in-out')),
    ]),
  ],
  styles: [
    `
      .btns_runCommmands{
        cursor: pointer;
      }
    `,
  ],
})
export class GrapesEditorComponent implements OnInit {
  @ViewChild('tools_Panel', { static: true }) tools_Panel!: ElementRef;
  editorPanel: any;
  private tool_panel_element!: HTMLElement;
  boxState: 'open' | 'closed' = 'closed';
  editorInstance$: Observable<any> | undefined;
  filteredProps: any;
  editor: any;
  menuPanelIcon: any;
  currentView: string | boolean | undefined;
  // menuItems$: Observable<any[]>;

  constructor(private store: Store, private renderer: Renderer2, private menu: MenuService) {}

  ngOnInit() {
    this.tool_panel_element = document.createElement('div');
    this.tool_panel_element.classList.add('editor');

    this.renderer.appendChild(
      this.tools_Panel.nativeElement,
      this.tool_panel_element
    );

    this.menu.getMenuItems().subscribe((data) => {
      data.forEach((element: any) => {
        this.filteredProps = element.subMenu[0];
        if (this.filteredProps?.editorPanel) {
          this.menuPanelIcon = this.filteredProps.panelIcons;
        }
      });
    });
  }

  navigate(view: 'search' | 'editor' | 'about') {
    this.currentView = view;
  }
}
