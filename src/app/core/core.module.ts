import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AppComponent } from './containers/app.component';
import { NotFoundPageComponent } from './containers/not-found-page.component';
import { MainComponent } from './components/main.component';
import { HeaderComponent } from './components/header.component';
import { FooterComponent } from './components/footer.component';
import { NavBarModule } from '../nav-bar/nav-bar.module';

export const COMPONENTS = [
  AppComponent,
  HeaderComponent,
  MainComponent,
  FooterComponent,
  NotFoundPageComponent,
];

@NgModule({
  imports: [
    CommonModule, 
    RouterModule,
    NavBarModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class CoreModule {
  static forRoot() {
    return {
      ngModule: CoreModule,
    };
  }
}
