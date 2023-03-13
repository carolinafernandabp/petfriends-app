import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { SetPublicacionesComponent } from './set-publicaciones/set-publicaciones.component';
import { ListPublicacionesComponent } from './list-publicaciones/list-publicaciones.component';
import { VerPublicacionesComponent } from './ver-publicaciones/ver-publicaciones.component';
import { EditPublicacionesComponent } from './edit-publicaciones/edit-publicaciones.component';
import { SetFichasComponent } from './set-fichas/set-fichas.component';
import { VerFichasComponent } from './ver-fichas/ver-fichas.component';
import { EditFichasComponent } from './edit-fichas/edit-fichas.component';
import { SetDatosComponent } from './set-datos/set-datos.component';
import { ListDatosComponent } from './list-datos/list-datos.component';
import { VerDatosComponent } from './ver-datos/ver-datos.component';
import { EditDatosComponent } from './edit-datos/edit-datos.component';
import { ListFichasComponent } from './list-fichas/list-fichas.component';
import { AdoptarComponent } from './adoptar/adoptar.component';
import { VoluntarioComponent } from './voluntario/voluntario.component';
import { ListAdoptarComponent } from './list-adoptar/list-adoptar.component';
import { EditAdoptarComponent } from './edit-adoptar/edit-adoptar.component';
import { ListVoluntarioComponent } from './list-voluntario/list-voluntario.component';
import { EditVoluntarioComponent } from './edit-voluntario/edit-voluntario.component';
import { AllPipesModule } from '../pipes/all-pipes.module';



@NgModule({


  declarations: [
    HeaderComponent,
    LoginComponent,
    RegistroComponent,
    SetPublicacionesComponent,
    ListPublicacionesComponent,
    VerPublicacionesComponent,
    EditPublicacionesComponent,
    SetFichasComponent,
    EditFichasComponent,
    VerFichasComponent,
    SetDatosComponent,
    ListDatosComponent,
    VerDatosComponent,
    EditDatosComponent,
    ListFichasComponent,
    AdoptarComponent,
    VoluntarioComponent,
    ListAdoptarComponent,
    EditAdoptarComponent,
    ListVoluntarioComponent,
    EditVoluntarioComponent,


],

  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    AllPipesModule

  ],
  exports:[
    HeaderComponent,
    LoginComponent,
    RegistroComponent,
    SetPublicacionesComponent,
    ListPublicacionesComponent,
    VerPublicacionesComponent,
    EditPublicacionesComponent,
    SetFichasComponent,
    EditFichasComponent,
    VerFichasComponent,
    SetDatosComponent,
    ListDatosComponent,
    VerDatosComponent,
    EditDatosComponent,
    ListFichasComponent,
    AdoptarComponent,
    VoluntarioComponent,
    ListAdoptarComponent,
    EditAdoptarComponent,
    ListVoluntarioComponent,
    EditVoluntarioComponent,




]
})
export class AllcomponentsModule { }
