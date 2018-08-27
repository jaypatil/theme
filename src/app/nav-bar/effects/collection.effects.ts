import { Injectable } from '@angular/core';
import { Database } from '../../database';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { defer, Observable, of } from 'rxjs';
import { catchError, map, flatMap, switchMap, toArray, tap } from 'rxjs/operators';

import { NavItem } from '../models/nav-item';
import {
  CollectionActionTypes,
  LoadFail,
  LoadSuccess,
  AddNavItem,
  AddNavItemSuccess,
  AddNavItemFail,
  RemoveNavItem,
  RemoveNavItemSuccess,

} from './../actions/collection.actions';

@Injectable()
export class CollectionEffects {
  /**
   * This effect does not yield any actions back to the store. Set
   * `dispatch` to false to hint to @ngrx/effects that it should
   * ignore any elements of this effect stream.
   *
   * The `defer` observable accepts an observable factory function
   * that is called when the observable is subscribed to.
   * Wrapping the database open call in `defer` makes
   * effect easier to test.
   */
  @Effect({ dispatch: false })
  openDB$: Observable<any> = defer(() => {
    return this.db.loadAll('navbar');
  });

  @Effect()
  loadCollection$: Observable<Action> = this.actions$.pipe(
    ofType(CollectionActionTypes.Load),
    switchMap(() =>
      this.db
        .loadAll('navbar')
        .pipe(
          tap(db => console.log(db)),
          map((navbar: NavItem[]) => new LoadSuccess(navbar)),
          catchError(error => of(new LoadFail(error)))
        )
    )
  );

  @Effect()
  addNavBarToCollection$: Observable<Action> = this.actions$.pipe(
    ofType<AddNavItem>(CollectionActionTypes.AddNavItem),
    map(action => action.payload),
    flatMap(navitem =>
      this.db
        .create('navbar', [navitem])
        .pipe(
          map(() => new AddNavItemSuccess(navitem)),
          catchError(() => of(new AddNavItemFail(navitem)))
        )
    )
  );

  @Effect()
  removeNavBarFromCollection$: Observable<Action> = this.actions$.pipe(
    ofType<RemoveNavItem>(CollectionActionTypes.RemoveNavItem),
    map(action => action.payload),
    flatMap(navitem =>
      this.db
        .remove('navbar', navitem.id)
        .pipe(
          map(() => new RemoveNavItemSuccess(navitem)),
          catchError(() => of(new RemoveNavItem(navitem)))
        )
    )
  );

  constructor(private actions$: Actions, private db: Database<NavItem>) { }
}
