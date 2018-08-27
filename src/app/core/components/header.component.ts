import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `<header><ng-content></ng-content></header>` 
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
