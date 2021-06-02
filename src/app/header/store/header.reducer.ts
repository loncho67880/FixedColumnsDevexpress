import { createReducer, on } from '@ngrx/store';
import { Header } from '../models/header';
import { Options } from '../models/options';
import * as headerActions from './header.actions';

export const headerFeatureKey = 'header';

export interface HeaderState extends Header {
  isLoading: boolean;
  error: string | null;
  options: Options[] | null;
}

export const initialState: HeaderState = {
  id: null,
  name: '',
  lastName: '',
  isLoading: false,
  error: null,
  options: [],
};


export const reducer = createReducer(
  initialState,
  on(headerActions.requestLoadHeaderInfo, (state) => ({ ...state, isLoading: true })),
  on(headerActions.loadOptionsInfo, (state, action ) => ({ ...state, options: [...action.options], isLoading: false })),
  on(headerActions.loadHeaderInfo, (state, action) => ({ ...state, ...action.header, isLoading: false })),
);

export const selectIsLoading = (state: HeaderState) => state.isLoading;
export const selectError = (state: HeaderState) => state.error;
export const headerInfoGet = (state: HeaderState) => state;
export const headerOptionsGet = (state: HeaderState) => state?.options;
