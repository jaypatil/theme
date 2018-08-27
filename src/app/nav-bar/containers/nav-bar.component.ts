import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromNavBar from '../reducers';
import * as NavBarActions from '../actions/nav-bar.actions';
import * as fromNavBarCollection from '../reducers';
import * as CollectionActions from '../actions/collection.actions';
import { NavItem } from '../models/nav-item';
@Component({
  selector: 'app-nav-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <button (click)="open()">open</button>
  <button (click)="close()">Close</button>
  <nav *ngIf="!(loading$ | async) && showSidenav$ | async">
    <a *ngFor="let link of navItems$ | async" href="#">{{link.name}}</a>
  </nav>
  `,
})
export class NavBarComponent {
  showSidenav$: Observable<boolean>;
  navItems$: Observable<any>;
  loading$: Observable<boolean>;

  constructor(private store: Store<fromNavBar.State>) {
    /**
     * Selectors can be applied with the `select` operator which passes the state
     * tree to the provided selector
     */
    this.showSidenav$ = this.store.pipe(select(fromNavBar.getShowSidenav));
    this.navItems$ = store.pipe(select(fromNavBarCollection.getNavItemCollection));
    this.loading$ = store.pipe(select(fromNavBarCollection.getCollectionLoading));
  }

  ngOnInit() {
    this.store.dispatch(new CollectionActions.Load());
  }

  close() {
    /**
     * All state updates are handled through dispatched actions in 'container'
     * components. This provides a clear, reproducible history of state
     * updates and user interaction through the life of our
     * application.
     */
    this.store.dispatch(new NavBarActions.Close());
  }

  open() {
    this.store.dispatch(new NavBarActions.Open());
  }

  logout() {
    this.close();
  }
}
