import { Component, OnInit } from '@angular/core';
import { ApplicationsService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  apps: any[];
  constructor(private applicationsService: ApplicationsService) {}

  ngOnInit() {
    this.getApplications();
  }

  getApplications(): void {
    this.applicationsService.getApplications().subscribe(apps => (this.apps = apps));
  }
}
