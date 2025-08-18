

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState, MjmlState } from './tags.reducer';

export const selectAppState = createFeatureSelector<AppState>('appState');
export const selectMjmlState = createFeatureSelector<MjmlState>('MjmlState');
export const selectData = createSelector(selectAppState, (state) => state.data || []);
export const selectConvertedHtml = createSelector(
  selectMjmlState,
  (state) => state.mjml
);
export const selectLoading = createSelector(selectAppState, (state) => state.loading);
