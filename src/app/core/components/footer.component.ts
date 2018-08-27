import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `<footer><ng-content></ng-content></footer>` 
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
