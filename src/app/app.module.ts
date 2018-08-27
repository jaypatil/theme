import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { CoreModule } from 'src/app/core/core.module';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { metaReducers, reducers } from './reducers';
import { AppComponent } from './core/containers/app.component';
import { AppRoutingModule } from './app-routing.module';


import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { EffectsModule } from '@ngrx/effects';
import { Database } from './database';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    /**
     * StoreModule.forRoot is imported once in the root module, accepting a reducer
     * function or object map of reducer functions. If passed an object of
     * reducers, combineReducers will be run creating your application
     * meta-reducer. This returns all providers for an @ngrx/store
     * based application.
     */
    StoreModule.forRoot(reducers, { metaReducers }),

    /**
     * @ngrx/router-store keeps router state up-to-date in the store.
     */
    StoreRouterConnectingModule.forRoot({
      /*
        They stateKey defines the name of the state used by the router-store reducer.
        This matches the key defined in the map of reducers
      */
      stateKey: 'router'
    }),
    /**
    * EffectsModule.forRoot() is imported once in the root module and
    * sets up the effects class to be initialized immediately when the
    * application starts.
    *
    * See: https://github.com/ngrx/platform/blob/master/docs/effects/api.md#forroot
    */
    EffectsModule.forRoot([]),
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    CoreModule.forRoot()
  ],
  providers: [Database],
  bootstrap: [AppComponent]
})
export class AppModule { }
