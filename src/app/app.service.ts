import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HttpErrorHandler, HandleError } from './http-error-handler.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token'
  })
};

class Application {
  id: number | string;
  name: string;
}

@Injectable()
@Injectable()
export class ApplicationsService {
  appUrl = 'api/apps'; // URL to web api
  private handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('ApplicationsService');
  }

  /** GET appes from the server */
  getApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(this.appUrl).pipe(catchError(this.handleError('getApplications', [])));
  }

  /* GET appes whose name contains search term */
  searchApplications(term: string): Observable<Application[]> {
    term = term.trim();

    // Add safe, URL encoded search parameter if there is a search term
    const options = term ? { params: new HttpParams().set('name', term) } : {};

    return this.http.get<Application[]>(this.appUrl, options).pipe(catchError(this.handleError<Application[]>('searchApplications', [])));
  }

  //////// Save methods //////////

  /** POST: add a new app to the database */
  addApplication(app: Application): Observable<Application> {
    return this.http.post<Application>(this.appUrl, app, httpOptions).pipe(catchError(this.handleError('addApplication', app)));
  }

  /** DELETE: delete the app from the server */
  deleteApplication(id: number): Observable<{}> {
    const url = `${this.appUrl}/${id}`; // DELETE api/appes/42
    return this.http.delete(url, httpOptions).pipe(catchError(this.handleError('deleteApplication')));
  }

  /** PUT: update the app on the server. Returns the updated app upon success. */
  updateApplication(app: Application): Observable<Application> {
    httpOptions.headers = httpOptions.headers.set('Authorization', 'my-new-auth-token');

    return this.http.put<Application>(this.appUrl, app, httpOptions).pipe(catchError(this.handleError('updateApplication', app)));
  }
}

/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
