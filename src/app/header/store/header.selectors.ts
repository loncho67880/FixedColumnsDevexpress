import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromStore from './header.reducer';

const headerSelector = createFeatureSelector<fromStore.HeaderState>(fromStore.headerFeatureKey);

export const isLoading = createSelector(headerSelector, fromStore.selectIsLoading);
export const error = createSelector(headerSelector, fromStore.selectError);
export const headerInfo = createSelector(headerSelector, fromStore.headerInfoGet);
export const optionsInfo = createSelector(headerSelector, fromStore.headerOptionsGet);
