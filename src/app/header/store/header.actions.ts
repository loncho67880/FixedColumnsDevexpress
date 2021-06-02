
import {createAction, props} from '@ngrx/store';

import { Header } from '../models/header';
import { Options } from '../models/options';

export const requestLoadHeaderInfo = createAction('[Header] Request header information');
export const loadHeaderInfo = createAction('[Header] Load header information', props<{header: Header}>());

export const requestLoadHeaderOptionsInfo = createAction('[Header] Request options information');
export const loadOptionsInfo = createAction('[Header] Load options information', props<{options: Options[]}>());
