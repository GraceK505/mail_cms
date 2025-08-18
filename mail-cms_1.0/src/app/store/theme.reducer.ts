import { createReducer, on } from '@ngrx/store';
import { toggleTheme } from './theme.actions';

type ThemeStateType = 'light' | 'dark' | string;

export interface ThemeState {
  theme: ThemeStateType;
}

const initialState: ThemeState = {
  theme: 'light',
};

export const themeReducer = createReducer(
  initialState,
  on(toggleTheme, state => ({
    ...state,
    theme: state.theme === 'light' ? 'dark' : 'light'
  }))
);