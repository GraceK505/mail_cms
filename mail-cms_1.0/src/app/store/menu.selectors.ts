import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MenuItem } from './menu.reducer'; // Adjust the import path
// import { EditorState } from './editor.reducer';

export const selectMenuState = createFeatureSelector<MenuItem[]>('menu');
export const selectViewState = (state: any) => state.view;

export const selectMenuItems = createSelector(
  selectMenuState,
  (state) => state
);

export const selectCurrentView = createSelector(
  selectViewState,
  (state) => {
    switch (state.currentView) {
      case 'search-slot':
      case 'editor':
      case 'social':
      case 'template-editor':
      case 'about':
      case 'docs':
        return state.currentView;
      default:
        return 'home';
    }
  }
);
