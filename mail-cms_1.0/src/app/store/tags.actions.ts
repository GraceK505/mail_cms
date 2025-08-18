import { createAction, props } from '@ngrx/store';
import { Template } from '../models/template';

export const fetchData = createAction('[API] Fetch Data');
export const fetchDataSuccess = createAction('[API] Fetch Success', props<{ data: any }>());
export const convertMjml = createAction('[API] Convert Data', props<{mjml: Template[]}>())
export const fetchDataFailure = createAction('[API] Fetch Failure', props<{ error: any }>());