import { Action } from '@ngrx/store';
import { NavItem } from '../models/nav-item';


export enum NavItemActionTypes {
  Load = '[NavItem] Load',
  Select = '[NavItem] Select',
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */

export class Load implements Action {
  readonly type = NavItemActionTypes.Load;

  constructor(public payload: NavItem) {}
}

export class Select implements Action {
  readonly type = NavItemActionTypes.Select;

  constructor(public payload: string) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type NavItemActionsUnion =
  | Load
  | Select;
