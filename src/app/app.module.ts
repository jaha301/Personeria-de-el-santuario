
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FullComponent } from './layouts/full/full.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './demo-material-module';
import { SpinnerComponent } from './shared/spinner.component';
import { AuthModule } from '@auth0/auth0-angular';
import { SharedModule } from './shared/shared.module';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestore}  from '@angular/fire/compat/firestore';


import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {DataDbService} from "./service/data-db.service";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideStorage,getStorage } from '@angular/fire/storage';

 
@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    AppHeaderComponent,
    SpinnerComponent,
    AppSidebarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    SharedModule,
    RouterModule.forRoot(AppRoutes),
    AngularFireModule.initializeApp(environment.firebaseConfig),

    AngularFirestoreModule,
    AngularFireStorageModule,




    // Import the module into the application, with configuration
    AuthModule.forRoot({
      domain: 'dev-vvq1wulkuguw7upu.us.auth0.com',
      clientId: 'vIHB1gl42HEqgdW9PnntZde3pC5aCul1',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
            provideFirebaseApp(() => initializeApp(environment.firebase)),
            provideStorage(() => getStorage()),
    
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    },
    AngularFirestore,
    [DataDbService]

  ],
  bootstrap: [AppComponent]
})

export class AppModule {}
