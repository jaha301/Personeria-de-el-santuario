//import { Component, AfterViewInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html'

  })
export class DashboardComponent {//implements AfterViewInit 
	constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService) {}

}
