import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { CreatePublicacionComponent } from './create-publicacion/create-publicacion.component';
import { EditPublicacionComponent } from './edit-publicacion/edit-publicacion.component';
import { ListPublicacionComponent } from './list-publicacion/list-publicacion.component';
import { CreateFichaComponent } from './create-ficha/create-ficha.component';
import { EditFichaComponent } from './edit-ficha/edit-ficha.component';
import { ListFichaComponent } from './list-ficha/list-ficha.component';
import { CreateSolicitudComponent } from './create-solicitud/create-solicitud.component';
import { EditSolicitudComponent } from './edit-solicitud/edit-solicitud.component';
import { ListSolicitudComponent } from './list-solicitud/list-solicitud.component';
import { CreateDonarComponent } from './create-donar/create-donar.component';
import { EditDonarComponent } from './edit-donar/edit-donar.component';
import { ListDonarComponent } from './list-donar/list-donar.component';
import { RegistroComponent } from './registro-organizacion/registro.component';
import { LoginComponent } from './login-organizacion/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegistroPetComponent } from './registro-pet/registro-pet.component';
import { LoginPetComponent } from './login-pet/login-petlover.component';


@NgModule({
  declarations: [
    HeaderComponent,
    CreatePublicacionComponent,
    EditPublicacionComponent,
    ListPublicacionComponent,
    CreateFichaComponent,
    EditFichaComponent,
    ListFichaComponent,
    CreateSolicitudComponent,
    EditSolicitudComponent,
    ListSolicitudComponent,
    CreateDonarComponent,
    EditDonarComponent,
    ListDonarComponent,
    RegistroComponent,
    RegistroPetComponent,
    LoginComponent,
    LoginPetComponent,
    ProfileComponent
],

  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[
    HeaderComponent,
    CreatePublicacionComponent,
    EditPublicacionComponent,
    ListPublicacionComponent,
    CreateFichaComponent,
    EditFichaComponent,
    ListFichaComponent,
    CreateSolicitudComponent,
    EditPublicacionComponent,
    ListSolicitudComponent,
    CreateDonarComponent,
    EditDonarComponent,
    ListDonarComponent,
    RegistroComponent,
    RegistroPetComponent,
    LoginComponent,
    LoginPetComponent,
    ProfileComponent
]
})
export class AllcomponentsModule { }
