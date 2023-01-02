import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

import { AngularFireAuthModule, USE_EMULATOR } from '@angular/fire/compat/auth';
import { AngularFireFunctionsModule} from '@angular/fire/compat/functions';
import { AngularFirestoreModule} from '@angular/fire/compat/firestore';
import { AngularFireStorageModule} from '@angular/fire/compat/storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { CreatePublicacionComponent } from './create-publicacion/create-publicacion.component';
import { EditPublicacionComponent } from './edit-publicacion/edit-publicacion.component';
import { ListPublicacionComponent } from './list-publicacion/list-publicacion.component';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { CrearUserComponent } from './crear-user/crear-user.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { CreateFichaComponent } from './create-ficha/create-ficha.component';
import { EditFichaComponent } from './edit-ficha/edit-ficha.component';



@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeaderComponent,
    HomeComponent,
    CreatePublicacionComponent,
    EditPublicacionComponent,
    ListPublicacionComponent,
    LoginComponent,
    CrearUserComponent,
    CreateFichaComponent,
    EditFichaComponent,
    ListPublicacionComponent

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
    FormsModule,
    CommonModule,
    ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    { provide: USE_EMULATOR, useValue: environment.useEmulator ? ['http://localhost', 9099] : undefined },
    { provide: USE_EMULATOR, useValue: environment.useEmulator ? ['http://localhost', 8080] : undefined },
    { provide: USE_EMULATOR, useValue: environment.useEmulator ? ['http://localhost', 5001] : undefined },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
    }


  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
