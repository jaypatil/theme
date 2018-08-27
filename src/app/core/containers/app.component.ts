import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromRoot from '../../reducers';
import * as LayoutActions from '../actions/layout.actions';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-header>
    <app-nav-bar></app-nav-bar>
    </app-header>
    <app-main>
    <h1>main</h1>
    <router-outlet>
    </router-outlet></app-main>
    <app-footer>
    <h1>footer</h1>
    </app-footer>
  `,
})
export class AppComponent {
  showSidenav$: Observable<boolean>;
  loggedIn$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
  }

}