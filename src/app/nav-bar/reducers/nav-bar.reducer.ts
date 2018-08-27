import {
  NavBarActionTypes,
  NavBarActionsUnion,
} from '../actions/nav-bar.actions';

export interface State {
  show: boolean;
}

const initialState: State = {
  show: false,
};

export function reducer(
  state: State = initialState,
  action: NavBarActionsUnion
): State {
  switch (action.type) {
    case NavBarActionTypes.Close:
      return {
        show: false,
      };

    case NavBarActionTypes.Open:
      return {
        show: true,
      };

    default:
      return state;
  }
}

export const getShowSidenav = (state: State) => state.show;
