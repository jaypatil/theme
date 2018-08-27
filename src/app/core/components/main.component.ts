import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  template: `<main><ng-content></ng-content></main>` 
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
