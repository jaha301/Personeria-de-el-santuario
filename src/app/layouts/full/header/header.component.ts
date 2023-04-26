import { Component, Inject  } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

import { Injectable } from "@angular/core";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',

  })

export class AppHeaderComponent {

  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService) {}
  Login(){
  
    this.auth.loginWithPopup();
   
  }
  Logout(){
    this.auth.logout()
    }


}
