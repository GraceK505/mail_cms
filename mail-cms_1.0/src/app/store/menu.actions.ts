// store/menu.actions.ts
import { createAction, props } from '@ngrx/store';
import { ViewsTypes } from './menu.reducer';

export const toggleMenuItem = createAction(
  '[Menu] Toggle Item',
  props<{ id: number }>()
);

export const setView = createAction(
  '[View] Set View',
   props<{ view: ViewsTypes }>()
);

export const getView = createAction(
  '[Current] Get View',
  props<{ currentView: ViewsTypes }>()
)



