import { createSelector } from '@ngrx/store';

export const selectThemeState = (state: any) => state.theme;

export const selectCurrentTheme = createSelector(
  selectThemeState,
  (state) => state.theme
);