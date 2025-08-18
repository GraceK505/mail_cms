import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCurrentView, selectMenuItems } from './menu.selectors';
import { toggleTheme } from './theme.actions';
import { selectCurrentTheme } from './theme.selectors';
import { ViewsTypes } from './menu.reducer';
import { getView, setView } from './menu.actions';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  public currentView: ViewsTypes = 'campaign';

  constructor(private store: Store) {}

  getMenuItems(): Observable<any> {
    return this.store.select(selectMenuItems);
  }

  toggleTheme() {
    this.store.dispatch(toggleTheme());
  }

  getCurrentTheme(): Observable<'light' | 'dark'> {
    return this.store.select(selectCurrentTheme);
  }
  
  getViewState(): Observable<ViewsTypes> {
    return this.store.select(selectCurrentView);
  }

  changeView(view: ViewsTypes) {
    this.store.dispatch(setView({ view }));
  }
}
