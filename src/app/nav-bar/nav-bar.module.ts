import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavBarComponent } from './containers/nav-bar.component';
import { NavItemComponent } from './components/nav-item.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { CollectionEffects } from './effects/collection.effects';



export const COMPONENTS = [
  NavBarComponent,
  NavItemComponent
];

@NgModule({
  imports: [
    CommonModule, 
    RouterModule,
    /**
     * StoreModule.forFeature is used for composing state
     * from feature modules. These modules can be loaded
     * eagerly or lazily and will be dynamically added to
     * the existing state.
     */
    StoreModule.forFeature('nav', reducers),
      /**
     * Effects.forFeature is used to register effects
     * from feature modules. Effects can be loaded
     * eagerly or lazily and will be started immediately.
     *
     * All Effects will only be instantiated once regardless of
     * whether they are registered once or multiple times.
     */
    EffectsModule.forFeature([CollectionEffects]),
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class NavBarModule {
  static forRoot() {
    return {
      ngModule: NavBarModule,
    };
  }
}
