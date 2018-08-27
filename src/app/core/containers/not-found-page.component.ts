import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'not-found-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <div>404: Not Found</div>
      <div>
        <p>Hey! It looks like this page doesn't exist yet.</p>
      </div>
      <div>
        <button mat-raised-button color="primary" routerLink="/">Take Me Home</button>
      </div>
    </div>
  `,
  styles: [
    `
    :host {
      text-align: center;
    }
  `,
  ],
})
export class NotFoundPageComponent {}
