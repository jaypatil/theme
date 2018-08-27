import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
} from '@ngrx/store';
import * as fromNavBar from './nav-bar.reducer';
import * as fromNavItem from './nav-item.reducer';
import * as fromCollection from './collection.reducer';
import * as fromRoot from '../../reducers';

export interface NavState {
  navbar: fromNavBar.State;
  navitems: fromNavItem.State;
  collection: fromCollection.State;
}

export interface State extends fromRoot.State {
  nav: NavState;
}

export const reducers: ActionReducerMap<NavState, any> = {
  navbar: fromNavBar.reducer,
  navitems: fromNavItem.reducer,
  collection: fromCollection.reducer,
};

/**
 * A selector function is a map function factory. We pass it parameters and it
 * returns a function that maps from the larger state tree into a smaller
 * piece of state. This selector simply selects the `navitems` state.
 *
 * Selectors are used with the `select` operator.
 *
 * ```ts
 * class MyComponent {
 *   constructor(state$: Observable<State>) {
 *     this.navitemsState$ = state$.pipe(select(getNavState));
 *   }
 * }
 * ```
 */

/**
 * The createFeatureSelector function selects a piece of state from the root of the state object.
 * This is used for selecting feature states that are loaded eagerly or lazily.
 */
export const getNavState = createFeatureSelector<State, NavState>('nav');

/**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them usable, we
 * need to make new selectors that wrap them.
 *
 * The createSelector function creates very efficient selectors that are memoized and
 * only recompute when arguments change. The created selectors can also be composed
 * together to select different pieces of state.
 */
export const getNavItemEntitiesState = createSelector(
  getNavState,
  state => state.navitems
);

export const getSelectedNavItemId = createSelector(
  getNavItemEntitiesState,
  fromNavItem.getSelectedId
);

/**
 * Adapters created with @ngrx/entity generate
 * commonly used selector functions including
 * getting all ids in the record set, a dictionary
 * of the records by id, an array of records and
 * the total number of records. This reduces boilerplate
 * in selecting records from the entity state.
 */
export const {
  selectIds: getNavItemIds,
  selectEntities: getNavItemEntities,
  selectAll: getAllNavItem,
  selectTotal: getTotalNavItem,
} = fromNavItem.adapter.getSelectors(getNavItemEntitiesState);

export const getSelectedNavItem = createSelector(
  getNavItemEntities,
  getSelectedNavItemId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId];
  }
);

/**
 * Just like with the navitems selectors, we also have to compose the search
 * reducer's and collection reducer's selectors.
 */
export const getNavBarState = createSelector(
  getNavState,
  (state: NavState) => state.navbar
);

export const getShowSidenav = createSelector(
  getNavBarState,
  fromNavBar.getShowSidenav
);


/**
 * Some selector functions create joins across parts of state. This selector
 * composes the search result IDs to return an array of navitems in the store.
 */

export const getCollectionState = createSelector(
  getNavState,
  (state: NavState) => state.collection
);

export const getCollectionLoaded = createSelector(
  getCollectionState,
  fromCollection.getLoaded
);
export const getCollectionLoading = createSelector(
  getCollectionState,
  fromCollection.getLoading
);
export const getCollectionNavItemIds = createSelector(
  getCollectionState,
  fromCollection.getIds
);

export const getNavItemCollection = createSelector(
  getNavItemEntities,
  getCollectionNavItemIds,
  (entities, ids) => {
    return ids.map(id => entities[id]);
  }
);

export const isSelectedNavItemInCollection = createSelector(
  getCollectionNavItemIds,
  getSelectedNavItemId,
  (ids, selected) => {
    return selected && ids.indexOf(selected) > -1;
  }
);
