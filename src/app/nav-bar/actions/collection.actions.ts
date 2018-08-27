
import { Action } from '@ngrx/store';
import { NavItem } from '../models/nav-item';

export enum CollectionActionTypes {
  AddNavItem = '[Collection] Add NavItem',
  AddNavItemSuccess = '[Collection] Add NavItem Success',
  AddNavItemFail = '[Collection] Add NavItem Fail',
  RemoveNavItem = '[Collection] Remove NavItem',
  RemoveNavItemSuccess = '[Collection] Remove NavItem Success',
  RemoveNavItemFail = '[Collection] Remove NavItem Fail',
  Load = '[Collection] Load',
  LoadSuccess = '[Collection] Load Success',
  LoadFail = '[Collection] Load Fail',
}

/**
 * Add NavItem to Collection Actions
 */
export class AddNavItem implements Action {
  readonly type = CollectionActionTypes.AddNavItem;

  constructor(public payload: NavItem) {}
}

export class AddNavItemSuccess implements Action {
  readonly type = CollectionActionTypes.AddNavItemSuccess;

  constructor(public payload: NavItem) {}
}

export class AddNavItemFail implements Action {
  readonly type = CollectionActionTypes.AddNavItemFail;

  constructor(public payload: NavItem) {}
}

/**
 * Remove NavItem from Collection Actions
 */
export class RemoveNavItem implements Action {
  readonly type = CollectionActionTypes.RemoveNavItem;

  constructor(public payload: NavItem) {}
}

export class RemoveNavItemSuccess implements Action {
  readonly type = CollectionActionTypes.RemoveNavItemSuccess;

  constructor(public payload: NavItem) {}
}

export class RemoveNavItemFail implements Action {
  readonly type = CollectionActionTypes.RemoveNavItemFail;

  constructor(public payload: NavItem) {}
}

/**
 * Load Collection Actions
 */
export class Load implements Action {
  readonly type = CollectionActionTypes.Load;
}

export class LoadSuccess implements Action {
  readonly type = CollectionActionTypes.LoadSuccess;

  constructor(public payload: NavItem[]) {}
}

export class LoadFail implements Action {
  readonly type = CollectionActionTypes.LoadFail;

  constructor(public payload: any) {}
}

export type CollectionActionsUnion =
  | AddNavItem
  | AddNavItemSuccess
  | AddNavItemFail
  | RemoveNavItem
  | RemoveNavItemSuccess
  | RemoveNavItemFail
  | Load
  | LoadSuccess
  | LoadFail;
