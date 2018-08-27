import { Action } from '@ngrx/store';

export enum NavBarActionTypes {
  Open = '[NavBar] Open Nav',
  Close = '[NavBar] Close Nav',
}

export class Open implements Action {
  readonly type = NavBarActionTypes.Open;
}

export class Close implements Action {
  readonly type = NavBarActionTypes.Close;
}

export type NavBarActionsUnion = Open | Close;
