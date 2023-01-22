import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule} from '@angular/common/http';

import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

import { AngularFireAuthModule} from '@angular/fire/compat/auth';
import { AngularFireFunctionsModule} from '@angular/fire/compat/functions';
import { AngularFirestoreModule} from '@angular/fire/compat/firestore';
import { AngularFireStorageModule} from '@angular/fire/compat/storage';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { AllcomponentsModule } from './component/allcomponents.module';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule,
    HttpClientModule,
    AngularFireAuthModule,
    AngularFireFunctionsModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    FormsModule,
    CommonModule,
    AllcomponentsModule,




    ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy},

    /*
    { provide: USE_EMULATOR, useValue: environment.useEmulator ? ['http://localhost', 9099] : undefined },
    { provide: USE_EMULATOR, useValue: environment.useEmulator ? ['http://localhost', 8080] : undefined },
    { provide: USE_EMULATOR, useValue: environment.useEmulator ? ['http://localhost', 5001] : undefined },


    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
    }
 */

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
