import { createReducer, on } from "@ngrx/store";
import {
  fetchData,
  fetchDataSuccess,
  fetchDataFailure,
  convertMjml,
} from "./tags.actions";
import { Template } from "../models/template";

export interface AppState {
  data: any[];
  loading: boolean;
  error: any;
}

export interface MjmlState {
  mjml: Template[];
  loading: boolean;
}

export const initialMjmlState: MjmlState = {
  mjml: [],
  loading: true,
};

const initialState: AppState = {
  data: [],
  loading: false,
  error: null,
};

export const appReducer = createReducer(
  initialState,
  on(fetchData, (state) => ({ ...state, loading: true })),
  on(fetchDataSuccess, (state, { data }) => ({
    ...state,
    loading: false,
    data,
  })),
  on(fetchDataFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

export const mjmlReducer = createReducer(
  initialMjmlState,
  on(convertMjml, (state, { mjml }) => ({
    ...state,
    mjml: [...state.mjml, ...mjml],
    loading: false,
  }))
);
